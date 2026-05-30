const useAnalyzeText = (words, combinations) => analyzeText(words, combinations)

/* Function returns with an array of analysis result objects
**   AnalysisResult
**     name: string
**     count: number
**     variations: [{
**       match: string
**       count: number
**     },...]
*/

function analyzeText(words, combinations) {
    let length_1 = []
    let length_2 = []
    let length_3 = []
    let length_4 = []
    let length_5 = []

    combinations.forEach(combo => {
        const variations = [
            ...combo.variations.length_1,
            ...combo.variations.length_2,
            ...combo.variations.length_3,
            ...combo.variations.length_4,
        ]

        length_1.push({ variation: variations.filter(v => v.length === 1), name: combo.name, length: 1})
        length_2.push({ variation: variations.filter(v => v.length === 2), name: combo.name, length: 2})
        length_3.push({ variation: variations.filter(v => v.length === 3), name: combo.name, length: 3})
        length_4.push({ variation: variations.filter(v => v.length === 4), name: combo.name, length: 4})
        length_5.push({ variation: variations.filter(v => v.length === 5), name: combo.name, length: 5})
    })

    const analysisResults = [];
    const variationsByLength = [ length_5, length_4, length_3, length_2, length_1 ]


    words.forEach(word => {
        const wordAnalysis = analyzeWord(word, variationsByLength);
        wordAnalysis.matches.forEach(match => {
            const index = analysisResults.findIndex(res => res.name === match.combinationName)
            if (index !== -1) {
                analysisResults[index].count++;
                const variationIndex = analysisResults[index].variations
                    .findIndex(variation => variation.match === match.combinationMatched)

                if (variationIndex !== -1) analysisResults[index].variations[variationIndex].count++;
                else analysisResults[index].variations.push({
                    match: match.combinationMatched,
                    count: 1,
                })
            }
            else {
                const matchInstance = {
                    name: match.combinationName,
                    count: 1,
                    variations: [{
                        match: match.combinationMatched,
                        count: 1,
                    }]
                }
                analysisResults.push(matchInstance)
            }
        })
    });

    const sortedAnalysisResults = analysisResults.sort((a, b) => b.count - a.count)
    return sortedAnalysisResults;
}



/* Function returns the result of word and character combination matches in an object
**   WordAnalysisResults
**     word: string,
**     matches: [ WordMatchResult ], 
**     unMatchedCharacters: [ string ] 
*/
function analyzeWord(word, combinations, matches = []) {
    if (word.length === 0) return null;

    for (combination of combinations) {
        for(variations of combination) {
            const matchCombinationResult =  matchWord(word, variations);
            if (matchCombinationResult.isMatch) {
                matches.push(matchCombinationResult);

                if (matchCombinationResult.isCompleteMatch) return { word, matches }
                
                const partialMatchResult = analyzeWord(matchCombinationResult.wordCharactersLeft, combinations, matches);
                if (partialMatchResult.matches.length && partialMatchResult.matches.length) return { word, matches }
            }
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
function matchWord(word, variations) {
    for(let variation of variations.variation) {
        let [ isMatch, isCompleteMatch ] = [ false, false ];
        let matchingText = word.slice(0, variations.length).toLowerCase();
        let wordCharactersLeft = word.slice(variations.length);
        
        if (matchingText === variation) {
            const individualVowel = individualChars.vowels.find(ch => ch.short_version === matchingText || ch.long_version === matchingText)
            const individualConsonant = individualChars.consonants.find(ch => ch.short_version === matchingText || ch.long_version === matchingText)
            const combinationName = individualVowel || individualConsonant ? matchingText : variations.name;

            isMatch = true;
            if (wordCharactersLeft.length === 0) { isCompleteMatch = true; }
            return ({
                combinationName,
                isMatch,
                isCompleteMatch,
                wordCharactersLeft,
                combinationMatched: variation,
            })
        }        
    }
    return ({
        isMatch: false,
        isCompleteMatch: false,
        wordCharactersLeft: word,
        combinationMatched: "",
    })
}