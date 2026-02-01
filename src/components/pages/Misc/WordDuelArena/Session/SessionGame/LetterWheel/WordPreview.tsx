type WordPreviewProps = {
    letters: string
}

export const WordPreview = ({ letters }: WordPreviewProps) =>
    letters && <div className="word-preview">{letters}</div>
