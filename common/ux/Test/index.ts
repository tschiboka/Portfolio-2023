/* Use this Test export to access testing utilities for common/ux components. This allows us to keep test-specific code separate from the main component exports. */

import { Button } from './Button/Button'
import { Checkbox } from './Checkbox/Checkbox'
import { Code } from './Code/Code'
import { DateInput } from './DateInput/DateInput'
import { Form } from './Form/Form'
import { Input } from './Input/Input'
import { LoadingIndicator } from './Loading/Loading'
import { Nav } from './Nav/Nav'
import { Overlay } from './Overlay/Overlay'
import { Page } from './Page/Page'
import { Radio } from './Radio/Radio'
import { SearchInput } from './SearchInput/SearchInput'
import { SideMenu } from './SideMenu/SideMenu'
import { Table } from './Table/Table'
export { Accessor, TestError } from './Accessor/Accessor'
export { server, MockBuilder, RequestBuilder } from './Server'

export const Test = {
    Button,
    Checkbox,
    Code,
    DateInput,
    Form,
    Input,
    LoadingIndicator,
    Nav,
    Overlay,
    Page,
    Radio,
    SearchInput,
    SideMenu,
    Table,
}
