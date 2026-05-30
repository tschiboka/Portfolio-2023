const useFetch = () => getCharset();

function getDataSet(charset) {
    const url = './data/dataset_en_sm.txt'; 
    fetch(url)
      .then(response => response.text())
      .then(data => { 
          start(
            charset, 
            data.replace(/[^a-z ]/gi, " "));
        })
      .catch(error => console.error('Error fetching text file:', error))
}

function getCharset() {
    const url = './data/charset_en.json';
    fetch(url)
      .then(response => response.json())
      .then(data => { getDataSet(data) })
      .catch(error => { console.error('Error fetching JSON:', error); });
}

var individualChars;
function createCombinations(charset) {
    const { vowels, consonants } = charset;
    individualChars = { vowels, consonants };
    const combinations = [];

    vowels.forEach(vowel => {
        consonants.forEach(consonant => {
            const charCombination = {
                name: "",
                vowel,
                consonant,
                variations: {
                    length_1: [],
                    length_2: [],
                    length_3: [],
                    length_4: [],
                },
            };
            // Consonant first
            // Alone (B)
            charCombination.variations.length_1.push(consonant.short_version);
            // Double (BB)
            charCombination.variations.length_2.push(consonant.long_version);
            // In Pair (BA)
            charCombination.variations.length_2.push(consonant.short_version + vowel.short_version);
            // Consonant Long (BBA)
            charCombination.variations.length_3.push(consonant.long_version + vowel.short_version);
            // Vowel Long (BAA)
            charCombination.variations.length_3.push(consonant.short_version + vowel.long_version);
            // Both Long (BBAA)
            charCombination.variations.length_4.push(consonant.long_version + vowel.long_version);

            // Vowel first
            // Alone (A)
            charCombination.variations.length_1.push(vowel.short_version);
            // Double (AA)
            charCombination.variations.length_2.push(vowel.long_version);
            // In Pair (AB)
            charCombination.variations.length_2.push(vowel.short_version + consonant.short_version);
            // Vowel Long (AAB)
            charCombination.variations.length_3.push(vowel.long_version + consonant.short_version);
            // Consonant Long (ABB)
            charCombination.variations.length_3.push(vowel.short_version + consonant.long_version);
            // Both Long (AABB)
            charCombination.variations.length_4.push(vowel.long_version + consonant.long_version);

            charCombination.name = consonant.short_version + vowel.short_version;
            combinations.push(charCombination);
        })
    })
    return combinations;
}