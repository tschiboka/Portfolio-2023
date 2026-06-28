import { Link } from '@common/ux'
import { Screen } from '../../../sharedComponents/Screen/Screen'
import { Table } from '@common/ux/Table'
import { PageSideMenu } from '../../../sharedComponents/PageSideMenu/PageSideMenu'
import { stories } from './stories'
import { Stack } from '@common/ux'
import './UxStories.styles.css'

type StoryRow = { name: string; description: string; path: string }

const data: StoryRow[] = stories.map((s) => ({
    name: s.label,
    description: s.description ?? '',
    path: s.path,
}))

interface UxStoriesProps {
    path: string
}

export const UxStories = ({ path }: UxStoriesProps) => {
    return (
        <Screen
            title={'Tivadar Debnar | Ux Stories'}
            path={path}
            variant="api"
            pageName="UX Stories"
            sideMenu={<PageSideMenu />}
        >
            <main>
                <Stack.Vertical gap="12">
                    <h1>UX Stories</h1>
                    <p>
                        This section showcases various UX components and patterns through
                        interactive stories. Each story demonstrates a specific component or design
                        pattern in action, allowing you to explore their features and behaviors in a
                        real-world context.
                    </p>
                    <div className="UxStories__table">
                        <Table<StoryRow>
                            ariaLabel="UX Stories"
                            data={data}
                            columns={[
                                {
                                    header: 'Component',
                                    accessor: 'name',
                                    width: '200px',
                                    cell: (_val, { row }) => <Link to={row.path}>{row.name}</Link>,
                                },
                                { header: 'Description', accessor: 'description' },
                            ]}
                        />
                    </div>
                </Stack.Vertical>
            </main>
        </Screen>
    )
}
