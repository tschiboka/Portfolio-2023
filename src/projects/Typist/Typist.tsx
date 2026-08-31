import { Screen } from '@shared-components/Screen/Screen'
import type { ScreenProps } from '@shared-components/Screen/Screen'
import { Editor } from './Editor/Editor'
import { TypistContextProvider } from './Typist.context'
import { HeadsUpDisplay } from './HeadsUpDisplay/HeadsUpDisplay'

export const Typist = ({ pageName }: Pick<ScreenProps, 'pageName' | 'path'>) => {
    return (
        <TypistContextProvider>
            <Screen
                title="tschiboka | Typist"
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
