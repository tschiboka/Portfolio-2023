import * as yup from 'yup'
import { MIN_WORDS_PER_LEVEL, MAX_WORDS_PER_LEVEL, MAX_WORDS_IN_ROW_LENGTH } from '../../common/utils'

const WORDS_PER_COLUMN = MAX_WORDS_PER_LEVEL / 2

export const levelSchema = yup.object({
    selectedWords: yup
        .array()
        .min(
            MIN_WORDS_PER_LEVEL,
            `Please select at least ${MIN_WORDS_PER_LEVEL} words. Currently selected: \${value.length}`
        )
        .max(
            MAX_WORDS_PER_LEVEL,
            `Please select no more than ${MAX_WORDS_PER_LEVEL} words. Currently selected: \${value.length}`
        )
        .test(
            'row-width',
            `Combined length of words in a row must not exceed ${MAX_WORDS_IN_ROW_LENGTH} characters`,
            (value) => {
                if (!value || value.length === 0) return true
                
                for (let i = 0; i < WORDS_PER_COLUMN; i++) {
                    const leftWord = value[i]?.word || ''
                    const rightWord = value[i + WORDS_PER_COLUMN]?.word || ''
                    const combinedLength = leftWord.length + rightWord.length
                    
                    if (combinedLength > MAX_WORDS_IN_ROW_LENGTH) {
                        return false
                    }
                }
                
                return true
            }
        )
        .required('Please select words'),
})
