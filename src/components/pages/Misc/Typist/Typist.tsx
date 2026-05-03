import Footer from '../../../sharedComponents/Footer/Footer'
import Page from '../../../../../common/ux/Page/Page'
import { PageContainerProps } from '../../../../../common/ux/Page/Page.types'
import { Editor } from './Editor/Editor'
import { TypistContextProvider } from './Typist.context'
import { HeadsUpDisplay } from './HeadsUpDisplay/HeadsUpDisplay'

export const Typist = ({ pageName, path }: PageContainerProps) => {
    return (
        <TypistContextProvider>
            <Page
                title="Tivadar Debnar | Typist"
                path="/projects/typist"
                recordVisit={true}
                className="Typist"
                variant="portfolio"
                pageName={pageName}
            >
                <main>
                    <HeadsUpDisplay />
                    <Editor />
                </main>
                <Footer pageName={pageName} path={path} />
            </Page>
        </TypistContextProvider>
    )
}
