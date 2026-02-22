import { useAppContext } from '../../../../context/AppContext/App.context'
import Footer from '../../../sharedComponents/Footer/Footer'
import Page from '../../../sharedComponents/Page/Page'
import Nav from '../../../sharedComponents/Nav/Nav'
import { PageContainerProps } from '../../../sharedComponents/Page/Page.types'
import Menu from '../../../sharedComponents/Menu/Menu'
import { Editor } from './Editor/Editor'
import { TypistContextProvider } from './Typist.context'
import { HeadsUpDisplay } from './HeadsUpDisplay/HeadsUpDisplay'

export const Typist = ({ pageName, path }: PageContainerProps) => {
    const { mobileMenuVisible } = useAppContext()

    return (
        <TypistContextProvider>
            <Page
                title="Tivadar Debnar | Typist"
                path="/projects/typist"
                recordVisit={true}
                className="Typist"
            >
                <Nav pageName={pageName} />
                {mobileMenuVisible && <Menu pageName={pageName} />}
                <main>
                    <HeadsUpDisplay />
                    <Editor />
                </main>
                <Footer pageName={pageName} path={path} />
            </Page>
        </TypistContextProvider>
    )
}
