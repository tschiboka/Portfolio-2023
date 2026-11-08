import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ValidationMessage } from '@common-utils'
import { WordConstants } from '../common/utils'

const WORDS_PER_COLUMN = WordConstants.maxWordsPerLevel / 2

const schema = yup.object({
    selectedWords: yup
        .array(yup.object({ word: yup.string().required() }).required())
        .min(
            WordConstants.minWordsPerLevel,
            ValidationMessage.Selection(
                'word list',
                WordConstants.minWordsPerLevel,
                'words',
                'at least',
            ),
        )
        .max(
            WordConstants.maxWordsPerLevel,
            ValidationMessage.Selection(
                'word list',
                WordConstants.maxWordsPerLevel,
                'words',
                'at most',
            ),
        )
        .test(
            'row-width',
            ValidationMessage.Bound(
                'combined length of words in a row',
                WordConstants.maxWordsInRowLength,
                'characters',
                'at most',
            ),
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
        .required(ValidationMessage.Required('word list')),
})

export const LevelCreatorSchema = { schema, resolver: yupResolver(schema) }
