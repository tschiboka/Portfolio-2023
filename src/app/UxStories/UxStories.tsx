import { Link, Main, Heading, Paragraph } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'
import { Table } from '@common-ux'
import { PageSideMenu } from '@shared-components/PageSideMenu/PageSideMenu'
import { stories } from './stories'
import { Stack } from '@common-ux'
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
            title={'tschiboka | Ux Stories'}
            path={path}
            variant="app"
            pageName="UX Stories"
            sideMenu={<PageSideMenu />}
        >
            <Main>
                <Stack.Vertical gap="12">
                    <Heading as="h1">UX Stories</Heading>
                    <Paragraph>
                        This section showcases various UX components and patterns through
                        interactive stories. Each story demonstrates a specific component or design
                        pattern in action, allowing you to explore their features and behaviors in a
                        real-world context.
                    </Paragraph>
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
            </Main>
        </Screen>
    )
}
