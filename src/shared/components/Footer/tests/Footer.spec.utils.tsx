import { Test } from '@shared-components/Screen/tests'
import { Version } from '@shared-context'
import { Breadcrumb } from '../components'
import { Footer } from '..'
import type { ReactNode } from 'react'

const pagePath = '/projects/typist'

const renderFooter = (info?: ReactNode) =>
    Test.Screen.Do.render({
        path: pagePath,
        children: (
            <Version.Provider>
                <Footer path={pagePath} info={info} />
            </Version.Provider>
        ),
    })

const renderBreadcrumb = (visitsPreLoaded?: boolean, visitCount?: number) =>
    Test.Screen.Do.render({
        path: pagePath,
        children: (
            <Breadcrumb
                path={pagePath}
                visitsPreLoaded={visitsPreLoaded}
                visitCount={visitCount}
            />
        ),
    })

export const FooterTestUtils = { pagePath, renderFooter, renderBreadcrumb }
