import type { Codec } from './Codecs.types'
import { Booleans } from '../../Booleans'
import { Numbers } from '../../Numbers'
import { Strings } from '../../Strings'

const stringCodec: Codec<string> = {
    encode: Strings.Optional.trim,
    decode: Strings.Optional.toUndefined,
}

const numberCodec: Codec<number> = {
    encode: Numbers.Optional.toString,
    decode: Numbers.Optional.toNumber,
}

const booleanCodec: Codec<boolean> = {
    encode: Booleans.Optional.toString,
    decode: Booleans.Optional.toBoolean,
}

/** Built-in URL codecs for the common filter value types (string, number, boolean). */
export const Codecs = {
    text: stringCodec,
    search: stringCodec,
    date: stringCodec,
    option: stringCodec,
    number: numberCodec,
    checkbox: booleanCodec,
}
