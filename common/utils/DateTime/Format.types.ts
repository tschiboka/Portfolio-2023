import type { Formats } from './Formats'
import type { Nullish } from '../Generics'

export type FormatKey = keyof typeof Formats

export type InputValue = Nullish<string | number | Date>
