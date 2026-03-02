---
trigger: always_on
glob:
description: Safe commands that can auto-run without user approval
---

# Auto-Approved Commands

## Safe Read-Only Operations

These commands are always safe to auto-run:

- `git status` - View repository status
- `git branch` - List or show branches
- `git log` - View commit history
- `git diff` - Show changes
- `git show` - Display commit details
- `git remote -v` - Show remotes
- `git stash list` - List stashes

## Safe Development Operations

- `npm run dev` - Start development server
- `npm run build` - Build the application
- `npm install` - Install dependencies
- `npm ci` - Clean install dependencies

## Safe Git Write Operations (within project)

- `git add` - Stage files for commit
- `git commit` - Commit staged changes
- `git push origin HEAD` - Push current branch to origin
- `git push origin main` - Push main branch
- `git checkout <branch>` - Switch branches (safe - no data loss)
- `git merge` - Merge branches
- `git pull` - Pull from remote
- `git stash` - Stash changes
- `git stash pop` - Apply stashed changes

## ⛔ Dangerous Git Operations (NEVER auto-run)

> These commands permanently destroy uncommitted work. Always set `SafeToAutoRun: false` and require explicit user confirmation.

- `git restore <file>` - ❌ Permanently discards uncommitted changes
- `git restore .` - ❌ Discards ALL uncommitted changes
- `git checkout -- <file>` - ❌ Legacy equivalent of `git restore` - destroys changes
- `git reset --hard` - ❌ Resets index AND working tree
- `git clean -fd` - ❌ Deletes untracked files permanently
- `git stash drop` - ❌ Permanently deletes a stash entry

## Safe File Operations

- `cat` - View file contents
- `type` - View file contents (Windows)
- `dir` - List directory (Windows)
- `ls` - List directory
- `head` - View first lines
- `tail` - View last lines
- `find` - Find files
- `grep` - Search in files
- `Get-ChildItem` - List/search files (PowerShell)
- `Select-String` - Search text in files (PowerShell grep)
- `Get-Content` - Read file contents (PowerShell)
- `Measure-Object` - Count lines/words/chars (PowerShell)
- `Sort-Object` - Sort output (PowerShell)
- `ForEach-Object` - Transform output (PowerShell pipeline)
- `Where-Object` - Filter output (PowerShell pipeline)
- `Write-Host` - Print output (PowerShell)

## Safe Process Management

- `taskkill /IM node.exe /F` - Kill Node processes (for dev server restart)
- `tasklist` - List running processes

## Environment

- `echo` - Print output
- `$env:` - View environment variables

---

## MCP Tool Operations

MCP tools that are safe to use without explicit user approval:

### GitKraken

- `git_status` - View repository status
- `git_log_or_diff` - View commit history and diffs
- `git_branch` - List or create branches
- `git_checkout` - Switch branches
- `git_add_or_commit` - Stage and commit changes
- `git_push` - Push to remote

### GitHub (Read-Only & Write Operations)

- `get_file_contents` - Read files from GitHub repository
- `create_pull_request` - Create PRs programmatically
- `get_pull_request` - Get full PR details
- `list_pull_requests` - List and check PR status
- `create_issue` - Create issues for bug tracking
- `get_issue` - Read issue details
- `list_issues` - View open issues
- `search_code` - Search code across repositories
- `create_or_update_file` - Modify repository files
- `push_files` - Push multiple files in a single commit
- `list_commits` - Browse commit history on remote

### Azure DevOps (Read-Only)

- `find_related_items` - Find wikis, test plans, work items by topic
- `search_work_items` - Search work items by text or WIQL
- `list_wiki_pages` - List wiki page names
- `get_wiki_page` - Read wiki page content

---

## GitHub CLI Operations

Safe `gh` commands for CI/CD monitoring:

- `gh run list` - List workflow runs
- `gh run view` - View specific run details
- `gh run watch` - Watch run progress (interactive)
- `gh workflow list` - List available workflows
- `gh pr list` - List pull requests
- `gh pr view` - View pull request details
