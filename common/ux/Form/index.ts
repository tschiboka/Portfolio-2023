import { FormElement } from './Form'
import { Input } from './Input'
import { Label } from './Label'
import { TextArea } from './TextArea'
import { SearchInput } from './SearchInput'
import { RadioButton } from './RadioButton'
import { RadioGroup } from './RadioGroup'
import { Checkbox } from './Checkbox'
import { Button } from './Button'
import { ButtonGroup } from './ButtonGroup'
import { Fieldset } from './Fieldset'
import { DateInput } from './DateInput'
import { SubmitErrorMessage } from './SubmitErrorMessage'

export type { SearchInputOption } from './SearchInput'
export type { FieldValues } from './Form.types'

export const Form = Object.assign(FormElement, {
    Button,
    ButtonGroup,
    Checkbox,
    DateInput,
    Fieldset,
    Input,
    Label,
    RadioButton,
    RadioGroup,
    SearchInput,
    SubmitErrorMessage,
    TextArea,
})
