export type CharStatus = 'correct' | 'incorrect' | 'pending'

export type EditorChar = {
    char: string
    index: number
    status?: CharStatus
}

export type EditorWord = {
    chars: EditorChar[]
    index: number
}
