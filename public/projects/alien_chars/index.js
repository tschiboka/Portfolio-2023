function init() {
    const transliterateBtn = document.getElementById("transliterate-btn");
    transliterateBtn.addEventListener('click', useTransliterate)

    const textarea = document.getElementById("transliterator__input-text");
    textarea.addEventListener('keyup', useTransliterate)

    console.log("App initialized")
    useFetch()
}

let globalCombinations;
let characterSet;
async function start(charset, text) {
    const words = text.toLowerCase().split(' ');
    const filteredWords = words.filter(w => w.length)
    const combinations = createCombinations(charset);
    characterSet = charset
    globalCombinations = combinations
    // filteredWords.length = 4
    console.log("TARGET TEXT LENGTH IN CHARACTERS: " + text.length);
    console.log("TARGET TEXT LENGTH IN WORDS: ", filteredWords.join("").length);

    const textAnalysis = useAnalyzeText(filteredWords, combinations);
    useHeatMap(textAnalysis, combinations)
}