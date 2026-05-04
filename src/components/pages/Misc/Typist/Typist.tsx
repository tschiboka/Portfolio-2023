import Footer from '../../../sharedComponents/Footer/Footer'
import { Screen } from '../../../sharedComponents/Screen/Screen'
import { PageContainerProps } from '../../../../../common/ux/Page/Page.types'
import { Editor } from './Editor/Editor'
import { TypistContextProvider } from './Typist.context'
import { HeadsUpDisplay } from './HeadsUpDisplay/HeadsUpDisplay'

export const Typist = ({ pageName, path }: PageContainerProps) => {
    return (
        <TypistContextProvider>
            <Screen
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
            </Screen>
        </TypistContextProvider>
    )
}
