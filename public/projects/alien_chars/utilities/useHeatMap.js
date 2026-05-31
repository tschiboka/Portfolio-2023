function useHeatMap(textAnalysis) {
    const { vowels, consonants } = individualChars
    const table = $('table', 'heatmap', document.getElementById('heatmap'))
    const thead = $('thead', 'table-head', table)
    const tbody = $('tbody', '', table)
    const theadRow = $('tr', 'thead-row', thead)

    // HEAD
    for (let colIndex = 0; colIndex <= vowels.length + 1; colIndex++) {
        const tdHead = $('td', 'thead-cell', theadRow)
        if (colIndex >= 2) {
            const vowel = vowels[colIndex - 2]
            tdHead.innerHTML = vowel.short_version + '/' + vowel.long_version
        }
    }

    // BODY
    for (let rowIndex = 0; rowIndex <= consonants.length; rowIndex++) {
        const tableRow = $('tr', '', tbody)
        for (let colIndex = 0; colIndex <= vowels.length + 1; colIndex++) {
            const td = $('td', 'cell', tableRow)
            // VOWEL INDIVIDUAL COUNT (SHORT / LONG)
            if (rowIndex === 0) {
                if (colIndex >= 2) {
                    const vowel = vowels[colIndex - 2]
                    const vowelMatchesShort = textAnalysis.filter(
                        (match) => match.name.toLowerCase() === vowel.short_version,
                    )
                    const vowelMatchesLong = textAnalysis.filter(
                        (match) => match.name.toLowerCase() === vowel.long_version,
                    )
                    const vowelMatchesShortCount = vowelMatchesShort?.length
                        ? vowelMatchesShort[0].count
                        : 0
                    const vowelMatchesLongCount = vowelMatchesLong?.length
                        ? vowelMatchesLong[0].count
                        : 0
                    td.innerHTML = vowelMatchesShortCount + vowelMatchesLongCount
                }
            } else {
                if (colIndex === 0) {
                    const consonant = consonants[rowIndex - 1]
                    td.innerHTML = consonant.short_version + '/' + consonant.long_version
                } else if (colIndex === 1) {
                    const consonant = consonants[rowIndex - 1]
                    const consonantMatchesShort = textAnalysis.filter(
                        (match) => match.name.toLowerCase() === consonant.short_version,
                    )
                    const consonantMatchesLong = textAnalysis.filter(
                        (match) => match.name.toLowerCase() === consonant.long_version,
                    )
                    const consonantMatchesShortCount = consonantMatchesShort?.length
                        ? consonantMatchesShort[0].count
                        : 0
                    const consonantMatchesLongCount = consonantMatchesLong?.length
                        ? consonantMatchesLong[0].count
                        : 0
                    td.innerHTML = consonantMatchesShortCount + consonantMatchesLongCount
                } else {
                    const consonant = consonants[rowIndex - 1]
                    const vowel = vowels[colIndex - 2]
                    const combination = consonant.short_version + vowel.short_version
                    const combinationMatches = textAnalysis.filter(
                        (match) => match.name.toLowerCase() === combination,
                    )
                    td.innerHTML = combinationMatches[0] ? combinationMatches[0].count : 0
                }
            }
        }
    }
    colourTable()
}

function colourTable() {
    const tableCells = [...document.getElementsByClassName('cell')]
    const tableCellValues = []
    tableCells.forEach((cell) => {
        const value = parseInt(cell.innerHTML)
        if (Number.isInteger(value)) tableCellValues.push(Number(cell.innerHTML))
    })
    const average = tableCellValues.reduce((a, b) => a + b, 0) / tableCellValues.length
    const colours = ['deeppink', 'orange', 'yellow', 'green', 'blue']
    tableCells.forEach((cell) => {
        const value = parseInt(cell.innerHTML)
        const num = Number(value)
        if (num || num === 0) {
            if (num < average / 5) cell.classList.add(colours[0])
            else if (num < (average / 5) * 2) cell.classList.add(colours[1])
            else if (num < (average / 5) * 3) cell.classList.add(colours[2])
            else if (num < (average / 5) * 4) cell.classList.add(colours[3])
            else cell.classList.add(colours[4])
        }
    })
}
