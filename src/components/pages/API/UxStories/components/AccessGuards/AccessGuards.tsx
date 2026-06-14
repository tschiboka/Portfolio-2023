import { AccessGuard } from '@common/utils'
import { useForm } from 'react-hook-form'
import { Guards } from './Guards'
import {
    Button,
    Code,
    CodeText,
    Form,
    Heading,
    Main,
    Paragraph,
    Section,
    Stack,
    Text,
} from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './AccessGuards.code'

const { hiddenGuard, visibleGuard, disabledGuard, softDisabledGuard, tooltipGuard } = Guards

type AccessGuardsProps = {
    path: string
}
export const AccessGuards = ({ path }: AccessGuardsProps) => {
    const { control } = useForm({
        defaultValues: {
            hiddenInput: '',
            visibleInput: '',
            disabledInput: '',
            softDisabledInput: '',
            tooltipInput: '',
        },
    })

    return (
        <Screen
            title={'Tivadar Debnar | Access Guards'}
            path={path}
            variant="api"
            pageName="Projects"
            sideMenu={<PageSideMenu />}
            hasContentNavigator
        >
            <Main>
                <StoryNav />
                <Heading as="h1">AccessGuards</Heading>
                <Paragraph>
                    AccessGuards are a utility I created to manage access control in my
                    applications. They allow me to define granulated access rules based on user
                    roles, permissions, or any other criteria. This helps ensure that only
                    authorized users can access certain features or perform specific actions.
                </Paragraph>
                <Section>
                    <Heading as="h3" id="hidden-mode">
                        Hidden Mode
                    </Heading>
                    <Paragraph>
                        The guarded content below is completely removed from the DOM:
                    </Paragraph>
                    <Stack.Horizontal gap="24">
                        <AccessGuard guards={hiddenGuard}>
                            <Text>This text is hidden</Text>
                        </AccessGuard>
                        <AccessGuard guards={hiddenGuard}>
                            <Paragraph>This paragraph is hidden</Paragraph>
                        </AccessGuard>
                        <AccessGuard guards={hiddenGuard}>
                            <Button>This button is hidden</Button>
                        </AccessGuard>
                        <AccessGuard guards={hiddenGuard}>
                            <Form.Input
                                name="hiddenInput"
                                control={control}
                                type="text"
                                placeholder="This input is hidden"
                            />
                        </AccessGuard>
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.hidden} />
                </Section>
                <Section>
                    <Heading as="h3" id="visible-mode">
                        Visible Mode
                    </Heading>
                    <Paragraph>
                        The guarded content renders normally (access denied, but mode is visible):
                    </Paragraph>
                    <Stack.Horizontal gap="24" align="center">
                        <AccessGuard guards={visibleGuard}>
                            <Text>This text is visible</Text>
                        </AccessGuard>
                        <AccessGuard guards={visibleGuard}>
                            <Paragraph>This paragraph is visible</Paragraph>
                        </AccessGuard>
                        <AccessGuard guards={visibleGuard}>
                            <Button>This button is visible</Button>
                        </AccessGuard>
                        <AccessGuard guards={visibleGuard}>
                            <Form.Input
                                name="visibleInput"
                                control={control}
                                type="text"
                                placeholder="This input is visible"
                            />
                        </AccessGuard>
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.visible} />
                </Section>
                <Section>
                    <Heading as="h3" id="disabled-mode">
                        Disabled Mode
                    </Heading>
                    <Paragraph>
                        The content is shown but faded out and non-interactive (hover for reason):
                    </Paragraph>
                    <Stack.Horizontal gap="24" align="center">
                        <AccessGuard guards={disabledGuard}>
                            <Text>This text is disabled</Text>
                        </AccessGuard>
                        <AccessGuard guards={disabledGuard}>
                            <Paragraph>This paragraph is disabled</Paragraph>
                        </AccessGuard>
                        <AccessGuard guards={disabledGuard}>
                            <Button>This button is disabled</Button>
                        </AccessGuard>
                        <AccessGuard guards={disabledGuard}>
                            <Form.Input
                                name="disabledInput"
                                control={control}
                                type="text"
                                placeholder="This input is disabled"
                            />
                        </AccessGuard>
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.disabled} />
                </Section>
                <Section>
                    <Heading as="h3" id="soft-disabled-mode">
                        Soft-Disabled Mode
                    </Heading>
                    <Paragraph>
                        The content appears faded but clickable — clicking opens a popup dialog:
                    </Paragraph>
                    <Stack.Horizontal gap="24" align="center">
                        <AccessGuard guards={softDisabledGuard}>
                            <Text>Click this text for info</Text>
                        </AccessGuard>
                        <AccessGuard guards={softDisabledGuard}>
                            <Paragraph>Click this paragraph for info</Paragraph>
                        </AccessGuard>
                        <AccessGuard guards={softDisabledGuard}>
                            <Button>Click this button for info</Button>
                        </AccessGuard>
                        <AccessGuard guards={softDisabledGuard}>
                            <Form.Input
                                name="softDisabledInput"
                                control={control}
                                type="text"
                                placeholder="Click this input for info"
                            />
                        </AccessGuard>
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.softDisabled} />
                </Section>
                <Section>
                    <Heading as="h3" id="tooltip-mode">
                        Tooltip Mode
                    </Heading>
                    <Paragraph>
                        The content is faded and non-interactive — hover to see the tooltip:
                    </Paragraph>
                    <Stack.Horizontal gap="24" align="center">
                        <AccessGuard guards={tooltipGuard}>
                            <Text>Hover this text for tooltip</Text>
                        </AccessGuard>
                        <AccessGuard guards={tooltipGuard}>
                            <Paragraph>Hover this paragraph for tooltip</Paragraph>
                        </AccessGuard>
                        <AccessGuard guards={tooltipGuard}>
                            <Button>Hover this button for tooltip</Button>
                        </AccessGuard>
                        <AccessGuard guards={tooltipGuard}>
                            <Form.Input
                                name="tooltipInput"
                                control={control}
                                type="text"
                                placeholder="Hover this input for tooltip"
                            />
                        </AccessGuard>
                    </Stack.Horizontal>
                    <Code language="tsx" content={Snippets.tooltip} />
                </Section>
                <Section>
                    <Heading as="h3" id="condition-types">
                        Condition Types
                    </Heading>
                    <Paragraph>
                        Guards support three condition types: <CodeText>capability</CodeText>,{' '}
                        <CodeText>feature</CodeText>, and <CodeText>custom</CodeText>. Use{' '}
                        <CodeText>unless</CodeText> instead of <CodeText>when</CodeText> to invert
                        the condition.
                    </Paragraph>
                    <Code language="tsx" content={Snippets.conditionTypes} />
                </Section>
            </Main>
        </Screen>
    )
}
