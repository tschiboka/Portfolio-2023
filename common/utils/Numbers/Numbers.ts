import { Counter } from './Counter'
import { truncateTo } from './truncateTo'
import { toNumber } from './optional/toNumber'
import { toString } from './optional/toString'

export const Numbers = {
    Counter,
    truncateTo,
    Optional: {
        toNumber,
        toString,
    },
}
