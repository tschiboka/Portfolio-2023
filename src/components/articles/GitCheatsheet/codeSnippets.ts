const codeSnippets = {
    checkVersion: `git --version`,
    configUserName: `git config --global user.name "Tivadar Debnar"\ngit config --global user.email your.email@gmail.com\ngit config --global core.editor "code --wait"`,
    openConfig: `git config --global -e`,
    lineFeedWin: `git config --global core.autocrlf true`,
    lineFeedUnix: `git config --global core.autocrlf input`,
    initialiseRepo: `mkdir MyProject\ncd MyProject\ngit init`,
    listAll: `# For Linux\nls\nls -a\nopen .git\n\n# For Windows\ndir\ndir /a\nstart .git`,
    staging: `echo hello > file1.txt\necho hello > file2.txt\ngit status\n# On branch master\n# No commits yet\n# Untracked files:\n#   (use "git add <file>..." to include in what will be committed)\n#     file1.txt\n#     file2.txt\n# nothing added to commit but untracked files present (use "git add" to track)`,
    add: `git add file1.txt           # Add Single File\ngit add file1.txt file2.txt # Multiple Files\ngit add *.txt               # Patterns\ngit add .                   # Entire Diractory\ngit add -A                  # Entire Repository`,
    modify: `echo world >> file2.txt # Use Two >> for Modifying Existing Files\ngit status`,
    commit: `git commit -m "Initial Commit"`,
    commitWithVerboseMessage: `git commit\n\n# ********** Editor **********\n# Commit Message Title\n\n# Commit Message Body`
};

export default codeSnippets;