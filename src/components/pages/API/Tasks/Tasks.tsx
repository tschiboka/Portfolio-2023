import { useAppContext } from '../../../../context/AppContext'
import Page from '../../../sharedComponents/Page/Page'
import MobileMenu from '../MobileMenu/MobileMenu'
import Nav from '../Nav/Nav'

interface TaskProps {
    path: string
}

const Tasks = ({ path }: TaskProps) => {
    const { mobileMenuVisible } = useAppContext()

    return (
        <Page title={'Tivadar Debnar | Tasks'} path={path} recordVisit={false}>
            <Nav pageName="Tasks" />
            {mobileMenuVisible && <MobileMenu pageName="Tasks" />}
            <h1>Tasks</h1>
        </Page>
    )
}

export default Tasks
