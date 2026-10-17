import { Main } from '@common-ux/Region/Main'
import { Screen } from '@shared-components/Screen/Screen'
import { Editor } from './Editor/Editor'
import { TypistProvider } from './Typist.provider'
import { HeadsUpDisplay } from './HeadsUpDisplay/HeadsUpDisplay'
import type { ScreenProps } from '@shared-components/Screen/Screen'

export const Typist = ({ pageName }: Pick<ScreenProps, 'pageName' | 'path'>) => {
    return (
        <TypistProvider>
            <Screen
                title="tschiboka | Typist"
                path="/projects/typist"
                className="Typist"
                variant="portfolio"
                pageName={pageName}
            >
                <Main>
                    <HeadsUpDisplay />
                    <Editor />
                </Main>
            </Screen>
        </TypistProvider>
    )
}
