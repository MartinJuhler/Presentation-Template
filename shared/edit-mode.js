/* ═══════════════════════════════════════════════
   Edit Mode — In-browser content editing
   Save to GitHub via Contents API or download locally
   ═══════════════════════════════════════════════ */

(function () {
    'use strict';

    // Config — reads from <meta> tags in the HTML, with auto-detect fallback
    function getMeta(name) {
        const el = document.querySelector(`meta[name="${name}"]`);
        return el ? el.getAttribute('content') : null;
    }

    const OWNER = getMeta('gh-owner') || (() => {
        // Auto-detect from GitHub Pages hostname: USERNAME.github.io
        const m = window.location.hostname.match(/^(.+)\.github\.io$/);
        return m ? m[1] : '';
    })();

    const REPO = getMeta('gh-repo') || (() => {
        // Auto-detect from GitHub Pages path: /REPO-NAME/...
        if (window.location.hostname.includes('github.io')) {
            const parts = window.location.pathname.split('/').filter(Boolean);
            return parts[0] || '';
        }
        return '';
    })();

    const BRANCH = getMeta('gh-branch') || 'main';

    // Selectors for editable content elements
    const EDITABLE_SELECTORS = [
        '.slide-title', '.slide-subtitle', '.slide-label',
        '.card-title', '.card-text', '.card-icon',
        '.stat-value', '.stat-label',
        '.quote', '.quote-src',
        '.bullet-list li',
        '.cmp-table td', '.cmp-table th',
        '.timeline-label', '.timeline-text',
        '.section-label',
        'h1', 'h2', 'h3',
        '.nav-brand'
    ].join(', ');

    // ── Build toolbar ──
    const toolbar = document.createElement('div');
    toolbar.className = 'edit-toolbar';
    toolbar.innerHTML = `
        <button class="edit-btn save-btn" id="editSave">💾 Save</button>
        <button class="edit-btn edit-toggle" id="editToggle">⚡ Edit</button>
    `;
    document.body.appendChild(toolbar);

    // ── Toast notification ──
    const toast = document.createElement('div');
    toast.className = 'edit-toast';
    document.body.appendChild(toast);

    function showToast(message, type = 'info', duration = 3000) {
        toast.textContent = message;
        toast.className = `edit-toast ${type}`;
        requestAnimationFrame(() => toast.classList.add('visible'));
        setTimeout(() => toast.classList.remove('visible'), duration);
    }

    // ── Token management ──
    function getToken() {
        // Prefer shared config file (works across all browsers)
        if (window.__GH_PAT) return window.__GH_PAT;
        return localStorage.getItem('gh-pat');
    }

    function promptForToken() {
        const token = prompt(
            '🔑  GITHUB SAVE — One-Time Setup\n\n' +
            'Enter your GitHub Personal Access Token (PAT)\n' +
            'with "contents:write" scope.\n\n' +
            'Don\'t have one? Ask your AI assistant:\n' +
            '"Create a GitHub fine-grained PAT with\n' +
            ' contents:write scope for my repo"\n\n' +
            'Your token is stored locally and never shared.'
        );
        if (token && token.trim()) {
            localStorage.setItem('gh-pat', token.trim());
            return token.trim();
        }
        return null;
    }

    // ── Determine file path from meta tag or URL ──
    function getFilePath() {
        const meta = document.querySelector('meta[name="gh-path"]');
        if (meta) return meta.getAttribute('content');

        // Fallback: derive from URL path
        const path = window.location.pathname;
        const parts = path.split('/').filter(Boolean);
        if (window.location.hostname.includes('github.io')) {
            return parts.slice(1).join('/') || 'index.html';
        }
        return parts.join('/') || 'index.html';
    }

    // ── Build clean HTML from current DOM state ──
    function getCleanHTML() {
        const clone = document.documentElement.cloneNode(true);

        // Remove edit-mode injected elements
        clone.querySelectorAll('.edit-toolbar, .edit-toast').forEach(el => el.remove());

        // Remove contenteditable attributes
        clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));

        // Remove edit-active class from body
        const cloneBody = clone.querySelector('body');
        if (cloneBody) cloneBody.classList.remove('edit-active');

        // Remove browser-injected data attributes
        clone.getAttributeNames()
            .filter(attr => attr.startsWith('data-'))
            .forEach(attr => clone.removeAttribute(attr));

        return '<!DOCTYPE html>\n' + clone.outerHTML;
    }

    // ── Toggle edit mode ──
    const toggleBtn = document.getElementById('editToggle');
    const saveBtn = document.getElementById('editSave');
    let isEditing = false;

    // Cache SHA per file path so subsequent saves don't race with sync
    const shaCache = {};

    toggleBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        document.body.classList.toggle('edit-active', isEditing);
        toggleBtn.classList.toggle('active', isEditing);
        toggleBtn.textContent = isEditing ? '⚡ Editing' : '⚡ Edit';

        const editableElements = document.querySelectorAll(EDITABLE_SELECTORS);
        editableElements.forEach(el => {
            if (el.closest('.edit-toolbar') || el.closest('.edit-toast')) return;
            if (isEditing) {
                el.setAttribute('contenteditable', 'true');
            } else {
                el.removeAttribute('contenteditable');
            }
        });

        if (isEditing) {
            showToast('Edit mode ON — click any text to edit', 'info');
        } else {
            showToast('Edit mode OFF', 'info', 1500);
        }
    });

    // ── Save button ──
    saveBtn.addEventListener('click', async () => {
        saveBtn.disabled = true;
        saveBtn.textContent = '⏳ Saving...';

        try {
            // Get or request PAT
            let token = getToken();
            if (!token) {
                token = promptForToken();
                if (!token) {
                    showToast(
                        '💡 A GitHub PAT is needed to save. Ask your AI assistant to help you create one!',
                        'info', 6000
                    );
                    return;
                }
            }

            const filePath = getFilePath();
            if (!filePath) {
                showToast('Cannot determine file path', 'error');
                return;
            }

            showToast('Saving to GitHub...', 'info', 10000);

            const htmlContent = getCleanHTML();

            const apiBase = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`;
            const headers = {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            };

            // Use cached SHA if available, otherwise fetch from GitHub
            let sha = shaCache[filePath] || null;
            if (!sha) {
                const getResponse = await fetch(`${apiBase}?ref=${BRANCH}`, { headers });
                if (getResponse.status === 401 || getResponse.status === 403) {
                    localStorage.removeItem('gh-pat');
                    throw new Error('Invalid or expired token. Please try again.');
                }
                if (getResponse.ok) {
                    const data = await getResponse.json();
                    sha = data.sha;
                }
            }

            // GitHub API: Create/update file
            const now = new Date().toLocaleString('en-GB', {
                day: 'numeric', month: 'short', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
            const commitMessage = `Edit ${filePath.split('/').pop()} via edit mode (${now})`;

            const putBody = {
                message: commitMessage,
                content: btoa(unescape(encodeURIComponent(htmlContent))),
                branch: BRANCH
            };
            if (sha) putBody.sha = sha;

            const putResponse = await fetch(apiBase, {
                method: 'PUT',
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify(putBody)
            });

            if (!putResponse.ok) {
                const err = await putResponse.json();
                throw new Error(`${filePath} ${err.message || `HTTP ${putResponse.status}`}`);
            }

            // Cache the new SHA from the response for next save
            const putData = await putResponse.json();
            if (putData.content && putData.content.sha) {
                shaCache[filePath] = putData.content.sha;
            }

            // Auto-sync: pull changes to local files via sync server
            try {
                const syncRes = await fetch('http://localhost:3939/pull', { method: 'POST' });
                const syncData = await syncRes.json();
                if (syncData.ok) {
                    showToast('✅ Saved & synced!', 'success', 3000);
                } else {
                    showToast('✅ Saved to GitHub! Sync failed — run: git pull', 'info', 5000);
                }
            } catch {
                showToast('✅ Saved to GitHub! To auto-sync local files, run: node sync-server.js', 'info', 6000);
            }
        } catch (error) {
            console.error('Save failed:', error);
            showToast(`❌ ${error.message}`, 'error', 5000);
        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = '💾 Save';
        }
    });
})();
