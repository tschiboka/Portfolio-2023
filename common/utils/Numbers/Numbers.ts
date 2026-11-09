import { Counter } from './Counter'
import { truncateTo } from './truncateTo'
import { toNumber } from './optional/ToNumber'
import { toString } from './optional/ToString'

export const Numbers = {
    Counter,
    truncateTo,
    Optional: {
        toNumber,
        toString,
    },
}
