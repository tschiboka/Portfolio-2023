import {
    Box,
    Code,
    CodeText,
    Card,
    Heading,
    Paragraph,
    Section,
    Modal,
    Sidebar,
    Header,
    Main,
    Stack,
} from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Regions.code'
import { FaChartBar, FaCog } from 'react-icons/fa'

type RegionsProps = { path: string }

export const Regions = ({ path }: RegionsProps) => (
    <Screen
        title={'Tivadar Debnar | Regions'}
        path={path}
        recordVisit={false}
        loginRequired
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main ariaLabel="Regions story">
            <StoryNav />
            <Heading as="h1">Region</Heading>
            <Paragraph>
                <CodeText>Region</CodeText> is a unified structural primitive for all major UI
                containers. It provides a single consistent API with named wrappers for each use
                case: <CodeText>Card</CodeText>, <CodeText>Section</CodeText>,{' '}
                <CodeText>Modal</CodeText>, <CodeText>Sidebar</CodeText>,{' '}
                <CodeText>Header</CodeText>, and <CodeText>Main</CodeText>.
            </Paragraph>
            <Box as="section">
                <Heading as="h2" id="card">
                    Card
                </Heading>
                <Paragraph>
                    A static container for grouping content. Renders as a{' '}
                    <CodeText>&lt;div&gt;</CodeText> with card-like styling.
                </Paragraph>
                <Stack.Vertical gap="16">
                    <Card ariaLabel="Basic card">
                        <p>Card content goes here.</p>
                    </Card>
                    <Card ariaLabel="Summary" title="Summary" icon={<FaChartBar />}>
                        <p>Monthly usage overview.</p>
                    </Card>
                </Stack.Vertical>
                <Code language="tsx" content={Snippets.Card.basic} />
                <Code language="tsx" content={Snippets.Card.withTitle} />
            </Box>

            <Box as="section">
                <Heading as="h2" id="section">
                    Section
                </Heading>
                <Paragraph>
                    Renders a semantic <CodeText>&lt;section&gt;</CodeText> element. When{' '}
                    <CodeText>expandable</CodeText> is set, the header becomes a toggle button.
                </Paragraph>
                <Stack.Vertical gap="16">
                    <Section title="Details" ariaLabel="Details">
                        <p>Section content is always visible.</p>
                    </Section>
                    <Section title="Advanced" expandable ariaLabel="Advanced" icon={<FaCog />}>
                        <p>This section can be toggled open and closed.</p>
                    </Section>
                    <Section title="Collapsed" expandable defaultOpen={false} ariaLabel="Collapsed">
                        <p>Starts collapsed — click the header to expand.</p>
                    </Section>
                </Stack.Vertical>
                <Code language="tsx" content={Snippets.Section.static} />
                <Code language="tsx" content={Snippets.Section.expandable} />
                <Code language="tsx" content={Snippets.Section.collapsed} />
            </Box>

            <Box as="section">
                <Heading as="h2" id="modal">
                    Modal
                </Heading>
                <Paragraph>
                    A <CodeText>role=&quot;dialog&quot;</CodeText> container styled for overlay use
                    cases. Pair with <CodeText>Overlay</CodeText> for backdrop and focus trapping.
                </Paragraph>
                <Modal ariaLabel="Confirm action">
                    <p>Are you sure you want to proceed?</p>
                </Modal>
                <Code language="tsx" content={Snippets.Modal.basic} />
            </Box>

            <Box as="section">
                <Heading as="h2" id="sidebar">
                    Sidebar
                </Heading>
                <Paragraph>
                    Renders as an <CodeText>&lt;aside&gt;</CodeText> element for persistent
                    navigational regions.
                </Paragraph>
                <Box
                    style={{
                        height: 120,
                        position: 'relative',
                        border: '1px solid var(--black-3)',
                        borderRadius: 6,
                    }}
                >
                    <Sidebar ariaLabel="App navigation">
                        <nav>
                            <p>Home</p>
                            <p>About</p>
                            <p>Contact</p>
                        </nav>
                    </Sidebar>
                </Box>
                <Code language="tsx" content={Snippets.Sidebar.basic} />
            </Box>

            <Box as="section">
                <Heading as="h2" id="header">
                    Header
                </Heading>
                <Paragraph>
                    Renders as a <CodeText>&lt;header&gt;</CodeText> element. Styled with fixed
                    positioning for top-level page headers.
                </Paragraph>
                <Box
                    style={{
                        position: 'relative',
                        height: 64,
                        border: '1px solid var(--black-3)',
                        borderRadius: 6,
                        overflow: 'hidden',
                    }}
                >
                    <Header ariaLabel="Site header" style={{ position: 'relative' }}>
                        <span>Logo</span>
                        <nav>Navigation links</nav>
                    </Header>
                </Box>
                <Code language="tsx" content={Snippets.Header.basic} />
            </Box>

            <Box as="section">
                <Heading as="h2" id="main">
                    Main
                </Heading>
                <Paragraph>
                    Renders as a <CodeText>&lt;main&gt;</CodeText> element for the primary content
                    region.
                </Paragraph>
                <Box
                    style={{
                        border: '1px solid var(--black-3)',
                        borderRadius: 6,
                        overflow: 'hidden',
                    }}
                >
                    <Main ariaLabel="Page content" style={{ padding: '1rem' }}>
                        <h3>Welcome</h3>
                        <p>Primary content area.</p>
                    </Main>
                </Box>
                <Code language="tsx" content={Snippets.Main.basic} />
            </Box>

            <Box as="section">
                <Heading as="h2" id="using-region-directly">
                    Using Region Directly
                </Heading>
                <Paragraph>
                    All named wrappers delegate to the base <CodeText>Region</CodeText> component.
                    You can also use <CodeText>Region</CodeText> directly with a{' '}
                    <CodeText>variant</CodeText> prop.
                </Paragraph>
                <Code language="tsx" content={Snippets.Region.direct} />
            </Box>
        </Main>
    </Screen>
)
