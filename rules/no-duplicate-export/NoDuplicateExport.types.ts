import type { Nullable } from '../../common/utils/Generics/Generics.types.js'

/** A re-export, narrowed to the things the counting reads. */
export type ReExportStatement = {
    type: string
    source?: Nullable<{ value?: unknown }>
    exportKind?: unknown
}
