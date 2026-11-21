/* Use this Test export to access testing utilities for common/ux components. This allows us to keep test-specific code separate from the main component exports. */

import { Box } from './Box'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { Code } from './Code'
import { ContentNavigator } from './ContentNavigator'
import { CounterBadge } from './CounterBadge'
import { DateInput } from './DateInput'
import { Figure } from './Figure'
import { Form } from './Form'
import { Heading } from './Heading'
import { Icon } from './Icon'
import { Input } from './Input'
import { Link } from './Link'
import { LoadingIndicator } from './LoadingIndicator'
import { Overlay } from './Overlay'
import { Pill } from './Pill'
import { Radio } from './Radio'
import { Region } from './Region'
import { SearchInput } from './SearchInput'
import { Section } from './Section'
import { SideMenu } from './SideMenu'
import { Table } from './Table'
import { Toggle } from './Toggle'
import { Typography } from './Typography'
import { Server, MockBuilder, RequestBuilder, HttpMethods } from './Server'

export { Accessor, TestError } from './Accessor'
export { Harness } from './Harness'
export { Server, MockBuilder, RequestBuilder, HttpMethods } from './Server'
export const Test = {
    Box,
    Button,
    Checkbox,
    Code,
    ContentNavigator,
    CounterBadge,
    DateInput,
    Figure,
    Form,
    Heading,
    Icon,
    Input,
    Link,
    LoadingIndicator,
    Overlay,
    Pill,
    Radio,
    Region,
    SearchInput,
    Section,
    SideMenu,
    Table,
    Toggle,
    Typography,
    Server,
    MockBuilder,
    RequestBuilder,
    HttpMethods,
}
export type {
    AccessorRecipe,
    ElementEntry,
    ElementMap,
    ElementRecipe,
    HarnessFlow,
} from './Harness'
