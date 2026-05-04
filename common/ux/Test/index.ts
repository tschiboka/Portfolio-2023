/* Use this Test export to access testing utilities for common/ux components. This allows us to keep test-specific code separate from the main component exports. */

import { Code } from './Code/Code'
import { Form } from './Form/Form'
import { Nav } from './Nav/Nav'
import { Overlay } from './Overlay/Overlay'
import { Page } from './Page/Page'
import { SideMenu } from './SideMenu/SideMenu'
import { Table } from './Table/Table'
export { server, MockBuilder, RequestBuilder } from './Server'

export const Test = {
    Code,
    Form,
    Nav,
    Overlay,
    Page,
    SideMenu,
    Table,
}
