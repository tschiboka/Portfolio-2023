const calculatePoints = (word, isTargetWord) => {
    return isTargetWord ? word.length * 3 : word.length;
}

module.exports = { calculatePoints };