/** A re-export, narrowed to the things the counting reads. */
export type ReExportStatement = {
    type: string
    source?: { value?: unknown } | null
    exportKind?: unknown
}
