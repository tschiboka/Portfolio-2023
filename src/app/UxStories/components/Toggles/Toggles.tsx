import { useState } from 'react'
import { BsSun, BsMoonStars } from 'react-icons/bs'
import { Functions } from '@common-utils'
import { Code, CodeText, Heading, Main, Paragraph, Section, Stack, Toggle } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'
import { PageSideMenu } from '@shared-components/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Toggles.code'

type TogglesProps = { path: string }

export const Toggles = ({ path }: TogglesProps) => (
    <Screen
        title={'tschiboka | Toggles'}
        path={path}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Toggle</Heading>
            <Paragraph>
                The <CodeText>Toggle</CodeText> component renders a switch control with a sliding
                thumb. It is used for boolean state, e.g. theme switching, and is fully keyboard
                accessible (Enter / Space).
            </Paragraph>

            <Section>
                <Heading as="h2" id="no-icon">
                    Without Icons
                </Heading>
                <Paragraph>
                    <CodeText>children</CodeText> is optional — omit it for a bare switch with no
                    icon.
                </Paragraph>
                <Stack.Horizontal gap="16">
                    <Toggle handleClick={Functions.noop} active={false} />
                    <Toggle handleClick={Functions.noop} active />
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.NoIcon.bare} />
            </Section>

            <Section>
                <Heading as="h2" id="basic-usage">
                    Basic Usage
                </Heading>
                <Paragraph>
                    Pass <CodeText>children</CodeText> for the icon label,{' '}
                    <CodeText>handleClick</CodeText> for the toggle action and{' '}
                    <CodeText>active</CodeText> to control the state.
                </Paragraph>
                <Stack.Horizontal gap="16">
                    <Toggle handleClick={Functions.noop} active={false}>
                        <BsSun className="theme-icon" />
                    </Toggle>
                    <Toggle handleClick={Functions.noop} active>
                        <BsMoonStars className="theme-icon" />
                    </Toggle>
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Basic.inactive} />
                <Code language="tsx" content={Snippets.Basic.active} />
            </Section>

            <Section>
                <Heading as="h2" id="colors">
                    Active Colour
                </Heading>
                <Paragraph>
                    Set <CodeText>activeColor</CodeText> to override the background when the toggle
                    is active (enabled). Omit it to use the theme default.
                </Paragraph>
                <Stack.Horizontal gap="16">
                    <Toggle handleClick={Functions.noop} active={false} />
                    <Toggle handleClick={Functions.noop} active activeColor="#00ff00" />
                </Stack.Horizontal>
                <Code language="tsx" content={Snippets.Colors.activeColor} />
            </Section>

            <Section>
                <Heading as="h2" id="controlled">
                    Controlled State
                </Heading>
                <Paragraph>
                    Tie the toggle to local state to flip between the two states on interaction.
                </Paragraph>
                <ControlledToggle />
                <Code language="tsx" content={Snippets.States.controlled} />
            </Section>
        </Main>
    </Screen>
)

const ControlledToggle = () => {
    const [active, setActive] = useState(false)
    return (
        <Toggle handleClick={() => setActive(!active)} active={active}>
            {active ? <BsSun className="theme-icon" /> : <BsMoonStars className="theme-icon" />}
        </Toggle>
    )
}
