import { ReactNode, FC } from 'react'
import { OptionButton } from './components/OptionButton'
import './Options.css'

type OptionPanelProps = {
    children?: ReactNode
}

type OptionPanelComponent = FC<OptionPanelProps> & {
    Button: typeof OptionButton
}

export const OptionPanel: OptionPanelComponent = ({ children }) => {
    return <div className="option-panel">{children}</div>
}

OptionPanel.Button = OptionButton
