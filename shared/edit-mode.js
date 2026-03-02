/* ═══════════════════════════════════════════════
   Edit Mode — In-browser content editing
   with direct save-to-GitHub via Contents API
   ═══════════════════════════════════════════════ */

(function () {
    'use strict';

    // Config — reads from <meta> tags in the HTML
    const OWNER = 'MartinJuhler';
    const REPO = 'Presentations';
    const BRANCH = 'main';

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
        return localStorage.getItem('gh-pat');
    }

    function promptForToken() {
        const token = prompt(
            'Enter your GitHub Personal Access Token (PAT).\n' +
            'It needs "repo" or "contents:write" scope.\n' +
            'This will be stored in localStorage for future saves.'
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
        // Remove leading slash and any GitHub Pages prefix
        const parts = path.split('/').filter(Boolean);
        // For github.io, first segment is repo name
        if (window.location.hostname.includes('github.io')) {
            return parts.slice(1).join('/') || 'index.html';
        }
        return parts.join('/') || 'index.html';
    }

    // ── Toggle edit mode ──
    const toggleBtn = document.getElementById('editToggle');
    const saveBtn = document.getElementById('editSave');
    let isEditing = false;

    toggleBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        document.body.classList.toggle('edit-active', isEditing);
        toggleBtn.classList.toggle('active', isEditing);
        toggleBtn.textContent = isEditing ? '⚡ Editing' : '⚡ Edit';

        const editableElements = document.querySelectorAll(EDITABLE_SELECTORS);
        editableElements.forEach(el => {
            // Don't make toolbar elements editable
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

    // ── Save to GitHub ──
    saveBtn.addEventListener('click', async () => {
        let token = getToken();
        if (!token) {
            token = promptForToken();
            if (!token) {
                showToast('Save cancelled — no token provided', 'error');
                return;
            }
        }

        const filePath = getFilePath();
        if (!filePath) {
            showToast('Cannot determine file path', 'error');
            return;
        }

        showToast('Saving...', 'info', 10000);
        saveBtn.disabled = true;
        saveBtn.textContent = '⏳ Saving...';

        try {
            // Clone the entire document to avoid mutating the live DOM
            const clone = document.documentElement.cloneNode(true);

            // Remove edit-mode injected elements from the clone
            clone.querySelectorAll('.edit-toolbar, .edit-toast').forEach(el => el.remove());

            // Remove contenteditable attributes
            clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));

            // Remove edit-active class from body
            const cloneBody = clone.querySelector('body');
            if (cloneBody) cloneBody.classList.remove('edit-active');

            // Remove browser-injected attributes (e.g. data-jetski-tab-id, data-grammarly-*, etc.)
            clone.getAttributeNames()
                .filter(attr => attr.startsWith('data-'))
                .forEach(attr => clone.removeAttribute(attr));

            // Get the clean HTML content from the clone
            const htmlContent = '<!DOCTYPE html>\n' + clone.outerHTML;

            // GitHub API: Get current file SHA
            const apiBase = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`;
            const headers = {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            };

            const getResponse = await fetch(`${apiBase}?ref=${BRANCH}`, { headers });
            if (getResponse.status === 401 || getResponse.status === 403) {
                localStorage.removeItem('gh-pat');
                throw new Error('Invalid or expired token. Please try again.');
            }

            let sha = null;
            if (getResponse.ok) {
                const data = await getResponse.json();
                sha = data.sha;
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
                throw new Error(err.message || `HTTP ${putResponse.status}`);
            }

            showToast('✅ Saved to GitHub!', 'success');
        } catch (error) {
            console.error('Save failed:', error);
            showToast(`❌ ${error.message}`, 'error', 5000);
        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = '💾 Save';
        }
    });
})();
