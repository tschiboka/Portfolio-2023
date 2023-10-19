const codeSnippets = {
    checkVersion: `git --version`,
    configUserName: `git config --global user.name "Tivadar Debnar"\ngit config --global user.email your.email@gmail.com/\ngit config --global core.editor "code --wait"`,
    openConfig: `git config --global -e`,
    lineFeedWin: `git config --global core.autocrlf true`,
    lineFeedUnix: `git config --global core.autocrlf input`
};

export default codeSnippets;