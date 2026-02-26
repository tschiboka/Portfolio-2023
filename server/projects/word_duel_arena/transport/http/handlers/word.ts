import { Request, Response } from 'express'

import { getWordResources } from '../../../infrastructure/resources/word'

async function handleGetWordList(_req: Request, res: Response) {
    const resources = getWordResources()
    if (!resources) return res.status(503).json({ message: 'Could not load resource: wordList' })
    const { wordList } = resources

    res.json(wordList)
}

async function handleGetAnagramMap(_req: Request, res: Response) {
    const resources = getWordResources()
    if (!resources) return res.status(503).json({ message: 'Could not load resource: anagramMap' })
    const { anagramMap } = resources

    res.json(anagramMap)
}

async function handleGetFrequencies(_req: Request, res: Response) {
    const resources = getWordResources()
    if (!resources) return res.status(503).json({ message: 'Could not load resource: frequency' })
    const { frequency } = resources

    res.json(frequency)
}

export { handleGetWordList, handleGetAnagramMap, handleGetFrequencies }
