/* eslint-disable standards/matching-spec -- TODO [0011] check the convention */
import { OptionButton } from './components'
import type { OptionsComponent } from './Options.types'
import './Options.css'

export const Options: OptionsComponent = ({ children }) => (
    <div className="option-panel">{children}</div>
)

Options.Button = OptionButton
