import fs from 'fs/promises'
import path from 'path'
import type { Nullable } from '@common/utils'
import type { Dictionary } from '@common/utils'

type WordResources = {
    wordList: string[]
    anagramMap: Dictionary<string[]>
    frequency: Dictionary<number>
}

let resources: Nullable<WordResources> = null

const loadWordResources = async () => {
    if (resources) return resources

    const basePath = path.join(__dirname, '../../resources')
    const fileNames = ['wordList.json', 'anagramMap.json', 'frequency.json']
    const filePaths = fileNames.map((fileName) => path.join(basePath, fileName))
    const promiseFns = filePaths.map((filePath) => fs.readFile(filePath, 'utf-8'))
    const [wordListRaw, anagramMapRaw, frequenciesRaw] = await Promise.all(promiseFns)

    resources = {
        wordList: JSON.parse(wordListRaw),
        anagramMap: JSON.parse(anagramMapRaw),
        frequency: JSON.parse(frequenciesRaw),
    }

    return resources
}

const getWordResources = () => resources

export { loadWordResources, getWordResources }
