import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AiFillSave } from "react-icons/ai";
import SyntaxHighlighter from "react-syntax-highlighter";
import "./Code.scss";
import { useState } from "react";

interface Props {
    fileName?: string;
    language: string;
    content: string;
    highlightRow?: [number];
}

export async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
        return await navigator.clipboard.writeText(text);
    } else {
        return document.execCommand("copy", true, text); // For Internet Explorer
    }
}

const Code = ({ fileName, language, content }: Props) => {
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    return (
        <div className="Code">
            <div className="Code__header">
                <span className="Code__file-name">{fileName}</span>
                <span className="Code__language">[{language}]</span>
                {showCopyMessage && (
                    <span className="Code__copy-message">Copied</span>
                )}
                <AiFillSave
                    className="Code__copy-icon"
                    onClick={() => {
                        setShowCopyMessage(true);
                        const messageDelay = setTimeout(() => {
                            setShowCopyMessage(false);
                            clearTimeout(messageDelay);
                        }, 2000);
                        copyTextToClipboard(content);
                    }}
                />
            </div>
            <SyntaxHighlighter language={language} style={atomOneDark}>
                {content}
            </SyntaxHighlighter>
        </div>
    );
};

export default Code;
