import * as yup from 'yup'
import { WordConstants } from '../common/utils'

const WORDS_PER_COLUMN = WordConstants.maxWordsPerLevel / 2

export const LevelCreatorSchema = yup.object({
    selectedWords: yup
        .array(yup.object({ word: yup.string().required() }).required())
        .min(
            WordConstants.minWordsPerLevel,
            `Please select at least ${WordConstants.minWordsPerLevel} words. Currently selected: \${value.length}`,
        )
        .max(
            WordConstants.maxWordsPerLevel,
            `Please select no more than ${WordConstants.maxWordsPerLevel} words. Currently selected: \${value.length}`,
        )
        .test(
            'row-width',
            `Combined length of words in a row must not exceed ${WordConstants.maxWordsInRowLength} characters`,
            (value) => {
                if (!value?.length) return true

                return value.every((word, i) => {
                    if (i >= WORDS_PER_COLUMN) return true

                    const rightWord = value[i + WORDS_PER_COLUMN]?.word ?? ''
                    const combinedLength = (word?.word ?? '').length + rightWord.length

                    return combinedLength <= WordConstants.maxWordsInRowLength
                })
            },
        )
        .required('Please select words'),
})
