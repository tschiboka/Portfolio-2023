import { OptionButton } from './components/OptionButton'
import type { OptionsComponent } from './Options.types'
import './Options.css'

export const Options: OptionsComponent = ({ children }) => (
    <div className="option-panel">{children}</div>
)

Options.Button = OptionButton
