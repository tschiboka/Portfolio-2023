let characterMaps
let resultDisplay

async function fetchCharacterMaps() {
    const url = './data/charmap_en.json'
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            characterMaps = data
        })
        .catch((error) => {
            console.error('Error fetching JSON:', error)
        })
}
fetchCharacterMaps()

async function useTransliterate() {
    resultDisplay = document.getElementById('transliterator__result')
    resultDisplay.innerHTML = ''

    const text = document.getElementById('transliterator__input-text').value
    const words = text.split(/[ ]/)
    const mappedWords = mapWords(words, globalCombinations)
    mappedWords.forEach((word) => {
        if (word && word.matches) word.matches.forEach(displayCharacter)
        displayCharacter('')
    })
}

function displayCharacter(char) {
    const svg = $('svg', '', resultDisplay, true)
    if (char.combinationName === '\n') {
        svg.classList.add('enter')
    }
    const WIDTH = 14
    const HEIGHT = 30
    svg.setAttribute('width', WIDTH)
    svg.setAttribute('height', HEIGHT)
    svg.setAttribute('viewBox', `-4 -4 ${WIDTH + 4} ${HEIGHT + 4}`)
    svg.setAttribute('vectorEffect', 'non-scaling-stroke')
    if (!char) return drawCharacter(svg, null)
    const characterMap = characterMaps.find(
        (characterMap) => characterMap.characterName === char.combinationName.toLowerCase(),
    )
    if (characterMap) drawCharacter(svg, characterMap, char)
}

function drawCharacter(svg, map, characterProps) {
    if (!map) return
    const characterMap = {
        characterName: map.characterName,
        characterLines: [...map.characterLines],
    }
    if (!characterMap.characterName || !characterMap.characterLines) return

    if (characterProps.emphasisConsonant) characterMap.characterLines.push([0, -1, 1.5, -1])
    if (characterProps.emphasisVowel) characterMap.characterLines.push([5, -1, 3.5, -1])
    if (characterProps.reverseCombination) characterMap.characterLines.push([1.5, -1, 3.5, -1])

    characterMap.characterLines.forEach((characterLine) => {
        var rect = svg.getBoundingClientRect()
        var width = rect.width - 4
        var height = rect.height - 4
        const [X1, X2] = [characterLine[0], characterLine[2]].map((coord) => coord * (width / 5))
        const [Y1, Y2] = [characterLine[1], characterLine[3]].map(
            (coord) => (coord + 1) * (height / 6),
        )
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('x1', Math.floor(X1))
        line.setAttribute('y1', Math.floor(Y1))
        line.setAttribute('x2', Math.floor(X2))
        line.setAttribute('y2', Math.floor(Y2))
        line.setAttribute('stroke', '#999')
        svg.appendChild(line)
    })
}

function mapWords(words, combinations) {
    let length_1 = []
    let length_2 = []
    let length_3 = []
    let length_4 = []
    let length_5 = []

    combinations.forEach((combo) => {
        const variations = [
            ...combo.variations.length_4,
            ...combo.variations.length_3,
            ...combo.variations.length_2,
            ...combo.variations.length_1,
        ]

        length_5.push({
            variation: variations.filter((v) => v.length === 5),
            name: combo.name,
            length: 5,
        })
        length_4.push({
            variation: variations.filter((v) => v.length === 4),
            name: combo.name,
            length: 4,
        })
        length_3.push({
            variation: variations.filter((v) => v.length === 3),
            name: combo.name,
            length: 3,
        })
        length_2.push({
            variation: variations.filter((v) => v.length === 2),
            name: combo.name,
            length: 2,
        })
        length_1.push({
            variation: variations.filter((v) => v.length === 1),
            name: combo.name,
            length: 1,
        })
    })

    const analysisResults = []
    const variationsByLength = [length_5, length_4, length_3, length_2, length_1]

    words.forEach((word) => {
        const wordAnalysis = analyzeWordForDisplay(word, variationsByLength)
        analysisResults.push(wordAnalysis)
    })

    return analysisResults
}

/* Function returns the result of word and character combination matches in an object
 **   WordAnalysisResults
 **     word: string,
 **     matches: [ WordMatchResult ],
 **     unMatchedCharacters: [ string ]
 */
function analyzeWordForDisplay(word, combinations, matches = []) {
    let matched = false
    if (word.length === 0) return null

    for (combination of combinations) {
        for (variations of combination) {
            const matchCombinationResult = matchWordForDisplay(word, variations)
            if (matchCombinationResult.isMatch) {
                matches.push(matchCombinationResult)
                matched = true

                if (matchCombinationResult.isCompleteMatch) return { word, matches }

                const partialMatchResult = analyzeWordForDisplay(
                    matchCombinationResult.wordCharactersLeft,
                    combinations,
                    matches,
                )
                if (partialMatchResult.matches.length && partialMatchResult.matches.length)
                    return { word, matches }
            }
        }
    }
    if (!matched) {
        const specialCharacterMatchResult = matchSpecialCharacters(word)
        if (specialCharacterMatchResult?.isMatch) {
            matches.push(specialCharacterMatchResult)
            if (specialCharacterMatchResult.isCompleteMatch) return { word, matches }
            else
                analyzeWordForDisplay(
                    specialCharacterMatchResult.wordCharactersLeft,
                    combinations,
                    matches,
                )
        }
    }
    return { word, matches }
}

/* Returns a combination match of the word
 **   MatchCombinationResult = {
 **     isMatch: boolean,
 **     isCompleteMatch: boolean,
 **     wordCharactersLeft: string,
 **     combinationMatched: string,
 */
function matchWordForDisplay(word, variations) {
    for (let variation of variations.variation) {
        let [isMatch, isCompleteMatch] = [false, false]
        let matchingText = word.slice(0, variations.length).toLowerCase()
        let wordCharactersLeft = word.slice(variations.length)
        let emphasisVowel = false
        let emphasisConsonant = false
        let reverseCombination = false
        let combinationName = ''
        let vowelName = ''
        let consonantName = ''

        if (matchingText === variation) {
            const individualVowel = individualChars.vowels.find((ch) => {
                if (new RegExp(ch.short_version, 'gi').test(matchingText))
                    vowelName = ch.short_version
                if (new RegExp(ch.long_version, 'gi').test(matchingText)) {
                    emphasisVowel = true
                    vowelName = ch.short_version
                }
                if (new RegExp('^' + ch.short_version, 'gi').test(matchingText))
                    reverseCombination = true
                if (new RegExp('^' + ch.long_version, 'gi').test(matchingText))
                    reverseCombination = true
                const match = ch.short_version === matchingText || ch.long_version === matchingText

                return match
            })

            const individualConsonant = individualChars.consonants.find((ch) => {
                if (new RegExp(ch.short_version, 'gi').test(matchingText)) {
                    consonantName = ch.short_version
                }
                if (new RegExp(ch.long_version, 'gi').test(matchingText)) {
                    emphasisConsonant = true
                    consonantName = ch.short_version
                }
                const match = ch.short_version === matchingText || ch.long_version === matchingText
                return match
            })

            if (individualVowel) combinationName = vowelName
            else if (individualConsonant) combinationName = consonantName
            else {
                combinationName = variations.name
            }

            if (individualVowel) reverseCombination = false

            isMatch = true
            if (wordCharactersLeft.length === 0) {
                isCompleteMatch = true
            }
            return {
                emphasisConsonant,
                emphasisVowel,
                reverseCombination,
                combinationName,
                isMatch,
                isCompleteMatch,
                wordCharactersLeft,
                combinationMatched: variation,
            }
        }
    }
    return {
        isMatch: false,
        isCompleteMatch: false,
        wordCharactersLeft: word,
        combinationMatched: '',
    }
}

function matchSpecialCharacters(word) {
    const specialCharacters = characterSet.special_characters
    for (const specialCharacter of specialCharacters) {
        if (word[0] === specialCharacter.character)
            return {
                emphasisConsonant: false,
                emphasisVowel: false,
                reverseCombination: false,
                combinationName: specialCharacter.name,
                isMatch: true,
                isCompleteMatch: word.length === 1,
                wordCharactersLeft: word.slice(1),
                combinationMatched: undefined,
            }
    }
}
