---
name: MCP Server Usage
description: Best practices for using MCP servers and CLI fallbacks in Presentations development
---

# MCP Server & CLI Usage Skill

Guidelines for the active MCP servers and CLI fallbacks.

> [!IMPORTANT]
> **CLI Fallback Mode**: When MCP servers are unavailable in Antigravity, use the CLI equivalents listed below. All CLI commands are auto-approved in `auto-commands.md`.

---

## Active MCP Servers

### 1. Git Operations - GitKraken

**MCP tools (all enabled):**

| Tool | Use Case |
|------|----------|
| `git_status` | Check uncommitted changes |
| `git_log_or_diff` | View recent commits, compare branches |
| `git_add_or_commit` | Stage and commit changes |
| `git_push` | Push to remote |
| `git_branch` | List or create branches |
| `git_checkout` | Switch branches |

**CLI fallback** (`git`) - always available:

```bash
git status
git log --oneline -n 10
git diff
git add -A && git commit -m "message"
git push origin HEAD
git merge <branch>
git pull
```

> [!NOTE]
> `git merge` and `git pull` are CLI-only - GitKraken MCP does not expose these.

---

### 2. GitHub - GitHub MCP

**MCP tools (enabled):**

| Tool | Use Case |
|------|----------|
| `get_file_contents` | Read files from GitHub repo |
| `create_pull_request` | Create PRs |
| `get_pull_request` | Get full PR details including reviews |
| `list_pull_requests` | Check PR status |
| `search_code` | Search across repos |
| `create_issue` | Create issues programmatically |
| `get_issue` | Read issue details |
| `list_issues` | View open issues |
| `create_or_update_file` | Push file changes directly to GitHub |
| `push_files` | Push multiple files in a single commit |
| `list_commits` | Browse commit history on remote |

**CLI fallback** (`gh`) - always available:

```bash
gh run list --limit 5                     # CI/CD run history
gh run view <ID>                          # Specific run details
gh run watch <ID>                         # Watch run progress
gh pr list                                # List pull requests
gh pr view <ID>                           # View PR details
gh pr create --title "..." --body "..."   # Create PR
gh issue list                             # List issues
```

> [!NOTE]
> GitHub MCP does **not** support GitHub Actions monitoring. Use `gh` CLI for CI/CD.

---

### 3. Azure DevOps - AzureDevOps MCP

**MCP tools (all enabled):**

| Tool | Use Case |
|------|----------|
| `find_related_items` | Find wikis, test plans, work items for a topic |
| `search_work_items` | Search work items by text or WIQL |
| `list_wiki_pages` | List all wiki page names (fast) |
| `get_wiki_page` | Read specific wiki page content |

---

## Decision Matrix

| Task | MCP Tool | CLI Fallback |
|------|----------|-------------|
| Check git status | GitKraken `git_status` | `git status` |
| Commit & push | GitKraken `git_add_or_commit` | `git commit` + `git push` |
| Merge branches | - | `git merge` |
| Monitor CI/CD | - | `gh run list` |
| Read GitHub files | GitHub `get_file_contents` | `gh api` |
| Create PR | GitHub `create_pull_request` | `gh pr create` |
| Track issues | GitHub `create_issue` / `list_issues` | `gh issue list` |

---

## Troubleshooting

### MCP Servers

1. **Server not responding:** Window reload (`Ctrl+Shift+P` -> `Developer: Reload Window`)
2. **Tool not found:** Check `mcp.json` for server configuration
3. **Server not appearing:** Must be added via Antigravity UI (Command Palette -> "Add MCP Server")

### CLI Tools

1. **`gh` auth error:** Run `gh auth login`
