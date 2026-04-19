import Page from '../../../../../sharedComponents/Page/Page'
import {
    Fundamentals,
    Filtering,
    CellRenderingDefaults,
    Responsive,
    Variants,
    Actions,
    Selection,
    Pagination,
    Sorting,
    Download,
    Accessibility,
    AllFeaturesCombined,
} from './Sections'

type TablesProps = {
    path: string
}

export const Tables = ({ path }: TablesProps) => {
    const scrollTo = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Page title={'Tivadar Debnar | Tables'} path={path} recordVisit={false} loginRequired>
            <main>
                {' '}
                <h2>Tables</h2>
                <p>
                    The <code>Table</code> component renders data in a structured grid with support
                    for custom cell renderers, breakpoints, default values, context passing, and
                    accessibility props.
                </p>
                <nav>
                    <ul>
                        <li>
                            <a href="#fundamentals" onClick={scrollTo('fundamentals')}>
                                Fundamentals
                            </a>
                        </li>
                        <li>
                            <a href="#filtering" onClick={scrollTo('filtering')}>
                                Filtering
                            </a>
                        </li>
                        <li>
                            <a
                                href="#cell-rendering-defaults"
                                onClick={scrollTo('cell-rendering-defaults')}
                            >
                                Cell Rendering & Defaults
                            </a>
                        </li>
                        <li>
                            <a href="#responsive" onClick={scrollTo('responsive')}>
                                Responsive
                            </a>
                        </li>
                        <li>
                            <a href="#variants" onClick={scrollTo('variants')}>
                                Variants
                            </a>
                        </li>
                        <li>
                            <a href="#actions" onClick={scrollTo('actions')}>
                                Actions
                            </a>
                        </li>
                        <li>
                            <a href="#selection" onClick={scrollTo('selection')}>
                                Selection
                            </a>
                        </li>
                        <li>
                            <a href="#pagination" onClick={scrollTo('pagination')}>
                                Pagination
                            </a>
                        </li>
                        <li>
                            <a href="#sorting" onClick={scrollTo('sorting')}>
                                Sorting
                            </a>
                        </li>
                        <li>
                            <a href="#download" onClick={scrollTo('download')}>
                                Download
                            </a>
                        </li>
                        <li>
                            <a href="#accessibility" onClick={scrollTo('accessibility')}>
                                Accessibility
                            </a>
                        </li>
                        <li>
                            <a
                                href="#all-features-combined"
                                onClick={scrollTo('all-features-combined')}
                            >
                                All Features Combined
                            </a>
                        </li>
                    </ul>
                </nav>
                <Fundamentals />
                <Filtering />
                <CellRenderingDefaults />
                <Responsive />
                <Variants />
                <Actions />
                <Selection />
                <Pagination />
                <Sorting />
                <Download />
                <Accessibility />
                <AllFeaturesCombined />
            </main>
        </Page>
    )
}
