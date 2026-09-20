# 📚 What We Learned (Concise List)

## **Core Commands:**

### 🔧 **History Manipulation:**

- `git rebase` - Move commits to new base (clean history)
- `git rebase -i` - Interactive: squash, reword, reorder commits
- `git reset --soft/mixed/hard` - Undo commits (careful with --hard!)
- `git revert` - Undo safely (creates new commit, keeps history)

### 🍒 **Moving Commits:**

- `git cherry-pick <commit>` - Copy specific commit to current branch
- `git stash` / `git stash pop` - Temporarily save uncommitted work

### 🆘 **Safety & Recovery:**

- `git reflog` - See ALL history, recover "deleted" commits
- `git <command> --abort` - Cancel merge/rebase/cherry-pick
- `git reset --hard HEAD@{n}` - Time travel using reflog

### 👥 **Collaboration:**

- `git pull --rebase` - Get updates + rebase your work on top
- `git push --force-with-lease` - Safer force push
- Never force push shared branches!

### 🔍 **Debugging:**

- `git bisect` - Binary search to find bug-causing commit

---

## **Golden Rules:**

✅ **SAFE for shared branches:**

- `pull`, `merge`, `revert`, `commit`

⚠️ **DANGEROUS for shared branches:**

- `reset`, `rebase`, `force push`, `commit --amend`

🔑 **Key Principle:**

> "If it's pushed and others have it, DON'T rewrite history!"

---

## **Emergency Procedures:**

| Problem                           | Solution                                    |
| --------------------------------- | ------------------------------------------- |
| Wrong commit message (not pushed) | `git commit --amend`                        |
| Wrong branch                      | Create branch, reset main                   |
| Lost commits                      | `git reflog` → `git reset --hard HEAD@{n}`  |
| Bad merge in progress             | `git merge --abort`                         |
| Production broken                 | `git revert <bad-commit>`                   |
| Secrets pushed                    | Change passwords FIRST! Then filter history |
| Can't push (remote ahead)         | `git pull` then `git push`                  |

---

## **Best Practices:**

1. 🔒 **Never commit secrets** - use `.gitignore` and `.env` files
2. 📝 **Write clear commit messages** - future you will thank you
3. 🔄 **Pull before push** - stay in sync with team
4. 🧪 **Test before merging** - broken main = angry team
5. 💬 **Communicate** - before force pushing or rebasing shared branches