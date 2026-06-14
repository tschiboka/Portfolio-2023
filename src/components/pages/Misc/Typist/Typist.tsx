import { Screen } from '../../../sharedComponents/Screen/Screen'
import { PageContainerProps } from '../../../../../common/ux/Page/Page.types'
import { Editor } from './Editor/Editor'
import { TypistContextProvider } from './Typist.context'
import { HeadsUpDisplay } from './HeadsUpDisplay/HeadsUpDisplay'

export const Typist = ({ pageName }: PageContainerProps) => {
    return (
        <TypistContextProvider>
            <Screen
                title="Tivadar Debnar | Typist"
                path="/projects/typist"
                className="Typist"
                variant="portfolio"
                pageName={pageName}
            >
                <main>
                    <HeadsUpDisplay />
                    <Editor />
                </main>
            </Screen>
        </TypistContextProvider>
    )
}
