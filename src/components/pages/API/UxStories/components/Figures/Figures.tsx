import { Code, CodeText, Heading, Main, Paragraph, Section, Stack } from '@common/ux'
import Figure from '../../../../../sharedComponents/Figure/Figure'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Figures.code'
import placeholder_image from '../../../../../../assets/images/projects/GradientGenerator.png'

type FiguresProps = { path: string }

export const Figures = ({ path }: FiguresProps) => (
    <Screen
        title={'Tivadar Debnar | Figures'}
        path={path}
        recordVisit={false}
        loginRequired
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Figure</Heading>
            <Paragraph>
                The <CodeText>Figure</CodeText> component renders a semantic{' '}
                <CodeText>{'<figure>'}</CodeText> element with an image and optional caption. It
                supports responsive sources via <CodeText>{'<picture>'}</CodeText>, multiple size
                presets, and a zoomable click interaction.
            </Paragraph>
            <Paragraph>
                The examples below use the app-level <CodeText>Figure</CodeText> wrapper (from{' '}
                <CodeText>sharedComponents/Figure</CodeText>) rather than the plain{' '}
                <CodeText>@common/ux</CodeText> primitive. The wrapper integrates with{' '}
                <CodeText>AppContext</CodeText> to provide fullscreen zoom with an overlay, keyboard
                dismiss, and menu visibility management out of the box.
            </Paragraph>
            <Section>
                <Heading as="h2" id="basic-usage">
                    Basic Usage
                </Heading>
                <Paragraph>
                    Pass <CodeText>src</CodeText> and <CodeText>alt</CodeText> for a simple image.
                    Add <CodeText>caption</CodeText> to render a{' '}
                    <CodeText>{'<figcaption>'}</CodeText>.
                </Paragraph>
                <Figure
                    image={placeholder_image}
                    size="lg"
                    alt="Placeholder image"
                    zoomAllowed={false}
                />
                <Figure
                    image={placeholder_image}
                    size="lg"
                    alt="Placeholder with caption"
                    caption="This is an optional caption"
                    zoomAllowed={false}
                />
                <Code language="tsx" content={Snippets.Basic.simple} />
                <Code language="tsx" content={Snippets.Basic.withCaption} />
            </Section>

            <Section>
                <Heading as="h2" id="sizes">
                    Sizes
                </Heading>
                <Paragraph>
                    Four size presets constrain the image width: <CodeText>sm</CodeText> (400px),{' '}
                    <CodeText>md</CodeText> (800px), <CodeText>lg</CodeText> (1000px), and{' '}
                    <CodeText>full</CodeText> (100%, default).
                </Paragraph>
                <Stack.Vertical gap="16">
                    <Figure
                        image={placeholder_image}
                        size="sm"
                        alt="Small"
                        caption='size="sm"'
                        zoomAllowed={false}
                    />
                    <Figure
                        image={placeholder_image}
                        size="md"
                        alt="Medium"
                        caption='size="md"'
                        zoomAllowed={false}
                    />
                    <Figure
                        image={placeholder_image}
                        size="lg"
                        alt="Large"
                        caption='size="lg"'
                        zoomAllowed={false}
                    />
                    <Figure
                        image={placeholder_image}
                        alt="Full"
                        caption='size="full" (default)'
                        zoomAllowed={false}
                    />
                </Stack.Vertical>
                <Code language="tsx" content={Snippets.Sizes.all} />
            </Section>

            <Section>
                <Heading as="h2" id="zoomable">
                    Zoomable
                </Heading>
                <Paragraph>
                    Pass <CodeText>onZoom</CodeText> to make the figure clickable. The cursor
                    changes to a pointer and the image dims on hover.
                </Paragraph>
                <Figure
                    image={placeholder_image}
                    size="md"
                    alt="Zoomable image"
                    caption="Click me to zoom"
                    zoomAllowed
                />
                <Code language="tsx" content={Snippets.Zoom.onZoom} />
            </Section>

            <Section>
                <Heading as="h2" id="responsive-sources">
                    Responsive Sources
                </Heading>
                <Paragraph>
                    Pass <CodeText>sources</CodeText> to render a <CodeText>{'<picture>'}</CodeText>{' '}
                    element with multiple <CodeText>{'<source>'}</CodeText> tags. The browser picks
                    the best match based on <CodeText>minWidth</CodeText>,{' '}
                    <CodeText>maxWidth</CodeText>, and <CodeText>type</CodeText>.
                </Paragraph>
                <Code language="tsx" content={Snippets.Responsive.sources} />
            </Section>

            <Section>
                <Heading as="h2" id="accessibility">
                    Accessibility
                </Heading>
                <Paragraph>
                    Use <CodeText>ariaLabel</CodeText> on the <CodeText>{'<figure>'}</CodeText> when
                    the alt text alone doesn{"'"}t provide enough context. The caption renders as a{' '}
                    <CodeText>{'<figcaption>'}</CodeText>.
                </Paragraph>
                <Code language="tsx" content={Snippets.Accessibility.ariaLabel} />
            </Section>

            <Section>
                <Heading as="h2" id="background-color">
                    Background Color
                </Heading>
                <Paragraph>
                    Use <CodeText>bgColor</CodeText> to set a background colour on the image
                    wrapper. The same colour is applied to the zoom overlay. When omitted, the
                    background is transparent.
                </Paragraph>
                <Figure
                    image={placeholder_image}
                    size="md"
                    alt="Figure with white background"
                    caption="bgColor='white'"
                    bgColor="white"
                    zoomAllowed
                />
                <Figure
                    image={placeholder_image}
                    size="md"
                    alt="Figure with no background"
                    caption="No bgColor — transparent"
                    zoomAllowed
                />
                <Code language="tsx" content={Snippets.BgColor.example} />
            </Section>
        </Main>
    </Screen>
)
