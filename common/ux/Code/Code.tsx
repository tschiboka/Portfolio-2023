import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { AiFillSave } from 'react-icons/ai'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { useState } from 'react'
import { Browser } from '@common/utils/Browser'
import { DateTime } from '@common/utils'
import './Code.styles.css'

interface Props {
    fileName?: string
    language: string
    content: string
    highlightRow?: [number]
}

export const Code = ({ fileName, language, content }: Props) => {
    const [showCopyMessage, setShowCopyMessage] = useState(false)
    return (
        <div className="Code">
            <div className="Code__header">
                <span className="Code__file-name">{fileName}</span>
                <span className="Code__language">[{language}]</span>
                {showCopyMessage && <span className="Code__copy-message">Copied</span>}
                <AiFillSave
                    className="Code__copy-icon"
                    onClick={() => {
                        setShowCopyMessage(true)
                        const messageDelay = setTimeout(() => {
                            setShowCopyMessage(false)
                            clearTimeout(messageDelay)
                        }, DateTime.Units.Ms.fromSec(2))
                        void Browser.copyToClipboard(content)
                    }}
                />
            </div>
            <SyntaxHighlighter language={language} style={atomOneDark}>
                {content}
            </SyntaxHighlighter>
        </div>
    )
}
