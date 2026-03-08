
# Removing Files and Folders

- rm -> remove; deletes files from the current directory
- Example:
  rm file.txt

- rm cannot delete directories by default

- rm -r -> recursive remove; deletes directories and their contents
- Example:
  rm -r folder_name

- rm -f -> force remove; deletes without asking for confirmation

- rm -rf -> force + recursive; deletes folders and contents without prompts
  rm -rf folder_name

Notes:
- Deletions with rm usually cannot be undone
- Always check with ls before removing important files