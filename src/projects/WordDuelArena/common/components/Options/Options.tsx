import { ReactNode, FC } from 'react'
import { OptionButton } from './components/OptionButton'
import './Options.css'

type OptionsProps = {
    children?: ReactNode
}

type OptionsComponent = FC<OptionsProps> & {
    Button: typeof OptionButton
}

export const Options: OptionsComponent = ({ children }) => {
    return <div className="option-panel">{children}</div>
}

Options.Button = OptionButton
