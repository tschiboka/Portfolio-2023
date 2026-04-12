import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { AiFillSave } from 'react-icons/ai'
import SyntaxHighlighter from 'react-syntax-highlighter'
import './Code.scss'
import { useState } from 'react'
import { Browser } from '@common/utils/Browser'

interface Props {
    fileName?: string
    language: string
    content: string
    highlightRow?: [number]
}

const Code = ({ fileName, language, content }: Props) => {
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
                        }, 2000)
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

export default Code
