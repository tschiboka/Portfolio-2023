import { useRef, useState } from 'react'
import {
    Button,
    Code,
    CodeText,
    Heading,
    List,
    Main,
    Overlay,
    Paragraph,
    Section,
    Stack,
} from '@common-ux'
import type { ActionMenuItem } from '@common-ux'
import { Screen } from '@shared-components/Screen/Screen'
import { PageSideMenu } from '@shared-components/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import type { Nullable } from '@common-utils'
import { Code as Snippets } from './Overlays.code'
import { PopupMode, PopupSize } from '@common-ux/Overlay/Overlay.types'
import './Overlays.styles.css'

const modes: PopupMode[] = ['primary', 'warning', 'danger', 'info']
const sizes: PopupSize[] = ['sm', 'md', 'lg']
const aligns = ['start', 'center', 'end'] as const

type OverlaysProps = {
    path: string
}
export const Overlays = ({ path }: OverlaysProps) => {
    const [activePopup, setActivePopup] = useState<Nullable<string>>(null)
    const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})

    const open = (id: string) => setActivePopup(id)
    const close = () => setActivePopup(null)

    const refFor = (id: string) => (el: HTMLButtonElement | null) => {
        btnRefs.current[id] = el
    }
    const anchorFor = (id: string) => ({ current: btnRefs.current[id] ?? null })

    const basicItems: ActionMenuItem[] = [
        { id: 'edit', label: 'Edit', onClick: () => alert('Edit clicked') },
        { id: 'duplicate', label: 'Duplicate', onClick: () => alert('Duplicate clicked') },
        { id: 'delete', label: 'Delete', onClick: () => alert('Delete clicked') },
    ]

    const variantItems: ActionMenuItem[] = [
        { id: 'view', label: 'View', variant: 'primary', onClick: () => alert('View') },
        { id: 'edit', label: 'Edit', variant: 'secondary', onClick: () => alert('Edit') },
        { id: 'delete', label: 'Delete', variant: 'danger', onClick: () => alert('Delete') },
    ]

    const disabledItems: ActionMenuItem[] = [
        { id: 'edit', label: 'Edit', onClick: () => alert('Edit') },
        { id: 'locked', label: 'Locked action', disabled: true, onClick: () => alert('Locked') },
        { id: 'delete', label: 'Delete', onClick: () => alert('Delete') },
    ]

    const iconItems: ActionMenuItem[] = [
        { id: 'edit', label: 'Edit', icon: <span>✏️</span>, onClick: () => alert('Edit') },
        { id: 'copy', label: 'Copy', icon: <span>📋</span>, onClick: () => alert('Copy') },
        {
            id: 'delete',
            label: 'Delete',
            icon: <span>🗑️</span>,
            variant: 'danger',
            onClick: () => alert('Delete'),
        },
    ]

    return (
        <Screen
            title={'tschiboka | Overlays'}
            path={path}
            variant="app"
            pageName="Projects"
            sideMenu={<PageSideMenu />}
            hasContentNavigator
        >
            <Main>
                <StoryNav />
                <Heading as="h1">Overlays</Heading>
                <Paragraph>
                    Overlay components provide modal dialogs and portaled menus for user
                    interaction. The <CodeText>Popup</CodeText> variant supports modes, sizes,
                    actions, and anchored positioning. The <CodeText>ActionMenu</CodeText> is a
                    lightweight portaled dropdown for contextual actions.
                </Paragraph>
                <Heading as="h2" id="popup">
                    Popup
                </Heading>
                <Section>
                    <Heading as="h3">Modes</Heading>
                    <Paragraph>Each mode has a distinct color scheme and default icon:</Paragraph>
                    <Stack.Horizontal gap="12" wrap>
                        {modes.map((mode) => (
                            <Button
                                key={mode}
                                ref={refFor(`mode-${mode}`)}
                                onClick={() => open(`mode-${mode}`)}
                            >
                                {mode}
                            </Button>
                        ))}
                    </Stack.Horizontal>
                    {modes.map(
                        (mode) =>
                            activePopup === `mode-${mode}` && (
                                <Overlay.Popup
                                    key={mode}
                                    mode={mode}
                                    anchorRef={anchorFor(`mode-${mode}`)}
                                    title={`${mode.charAt(0).toUpperCase()}${mode.slice(1)} Mode`}
                                    message={`This is a popup in ${mode} mode with its default icon.`}
                                    onClose={close}
                                    actions={[{ label: 'OK', onClick: close }]}
                                />
                            ),
                    )}
                    <Code language="tsx" content={Snippets.Popup.modes} />
                </Section>
                <Section>
                    <Heading as="h3">Sizes</Heading>
                    <Paragraph>Popups come in three sizes — sm, md, and lg:</Paragraph>
                    <Stack.Horizontal gap="12" wrap>
                        {sizes.map((size) => (
                            <Button
                                key={size}
                                ref={refFor(`size-${size}`)}
                                onClick={() => open(`size-${size}`)}
                            >
                                {size}
                            </Button>
                        ))}
                    </Stack.Horizontal>
                    {sizes.map(
                        (size) =>
                            activePopup === `size-${size}` && (
                                <Overlay.Popup
                                    key={size}
                                    size={size}
                                    anchorRef={anchorFor(`size-${size}`)}
                                    title={`Size: ${size}`}
                                    message={`This popup uses the "${size}" size preset.`}
                                    onClose={close}
                                />
                            ),
                    )}
                    <Code language="tsx" content={Snippets.Popup.sizes} />
                </Section>
                <Section>
                    <Heading as="h3">Actions</Heading>
                    <Paragraph>
                        Popups can have multiple action buttons, with conditional visibility:
                    </Paragraph>
                    <Button ref={refFor('actions')} onClick={() => open('actions')}>
                        Open with actions
                    </Button>
                    {activePopup === 'actions' && (
                        <Overlay.Popup
                            mode="info"
                            anchorRef={anchorFor('actions')}
                            title="Action Demo"
                            message="The 'Hidden' button has when: false and won't appear."
                            onClose={close}
                            actions={[
                                { label: 'Confirm', onClick: close },
                                {
                                    label: 'Hidden',
                                    variant: 'secondary',
                                    onClick: close,
                                    when: false,
                                },
                            ]}
                        />
                    )}
                    <Code language="tsx" content={Snippets.Popup.actions} />
                </Section>
                <Section>
                    <Heading as="h3">Anchored</Heading>
                    <Paragraph>
                        Popups anchor to the trigger button and auto-position above or below:
                    </Paragraph>
                    <Stack.Horizontal gap="24" wrap style={{ padding: '40px 0' }}>
                        <Button ref={refFor('anchored')} onClick={() => open('anchored')}>
                            Open anchored
                        </Button>
                    </Stack.Horizontal>
                    {activePopup === 'anchored' && (
                        <Overlay.Popup
                            mode="primary"
                            anchorRef={anchorFor('anchored')}
                            title="Anchored Popup"
                            message="This popup auto-positions based on available space."
                            onClose={close}
                            size="sm"
                        />
                    )}
                    <Code language="tsx" content={Snippets.Popup.anchored} />
                </Section>
                <Section>
                    <Heading as="h3">Custom Content</Heading>
                    <Paragraph>Popups accept children for fully custom body content:</Paragraph>
                    <Button ref={refFor('custom')} onClick={() => open('custom')}>
                        Open custom popup
                    </Button>
                    {activePopup === 'custom' && (
                        <Overlay.Popup
                            mode="warning"
                            title="Custom Content"
                            anchorRef={anchorFor('custom')}
                            onClose={close}
                            size="lg"
                        >
                            <div className="overlays-popup-body">
                                <Paragraph className="overlays-popup-text">
                                    This popup has custom children rendered below the title.
                                </Paragraph>
                                <List
                                    className="overlays-popup-list"
                                    items={[
                                        { key: 'one', content: 'Custom list item 1' },
                                        { key: 'two', content: 'Custom list item 2' },
                                        { key: 'three', content: 'Custom list item 3' },
                                    ]}
                                />
                            </div>
                        </Overlay.Popup>
                    )}
                    <Code language="tsx" content={Snippets.Popup.customContent} />
                </Section>
                {/* ── ActionMenu ──────────────────────────────────── */}
                <Heading as="h2" id="action-menu">
                    ActionMenu
                </Heading>
                <Paragraph>
                    A lightweight portaled dropdown menu for contextual actions. Renders to{' '}
                    <CodeText>document.body</CodeText> via <CodeText>createPortal</CodeText>,
                    avoiding overflow clipping. Closes on Escape, click outside, scroll, and resize.
                </Paragraph>
                <Section>
                    <Heading as="h3">Basic</Heading>
                    <Paragraph>A simple action menu with three items:</Paragraph>
                    <Button ref={refFor('am-basic')} onClick={() => open('am-basic')}>
                        Open menu
                    </Button>
                    {activePopup === 'am-basic' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-basic')}
                            items={basicItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.basic} />
                </Section>
                <Section>
                    <Heading as="h3">Alignment</Heading>
                    <Paragraph>
                        The <CodeText>align</CodeText> prop controls horizontal alignment relative
                        to the anchor: <CodeText>start</CodeText>, <CodeText>center</CodeText>{' '}
                        (default), or <CodeText>end</CodeText>.
                    </Paragraph>
                    <Stack.Horizontal gap="12" wrap>
                        {aligns.map((align) => (
                            <Button
                                key={align}
                                ref={refFor(`am-align-${align}`)}
                                onClick={() => open(`am-align-${align}`)}
                            >
                                align=&quot;{align}&quot;
                            </Button>
                        ))}
                    </Stack.Horizontal>
                    {aligns.map(
                        (align) =>
                            activePopup === `am-align-${align}` && (
                                <Overlay.ActionMenu
                                    key={align}
                                    anchorRef={anchorFor(`am-align-${align}`)}
                                    align={align}
                                    items={basicItems}
                                    onClose={close}
                                />
                            ),
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.align} />
                </Section>
                <Section>
                    <Heading as="h3">Variants</Heading>
                    <Paragraph>
                        Items support colour variants: <CodeText>primary</CodeText>,{' '}
                        <CodeText>secondary</CodeText>, and <CodeText>danger</CodeText>.
                    </Paragraph>
                    <Button ref={refFor('am-variants')} onClick={() => open('am-variants')}>
                        Open with variants
                    </Button>
                    {activePopup === 'am-variants' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-variants')}
                            items={variantItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.variants} />
                </Section>
                <Section>
                    <Heading as="h3">Disabled Items</Heading>
                    <Paragraph>
                        Items with <CodeText>disabled: true</CodeText> are greyed out and
                        unclickable:
                    </Paragraph>
                    <Button ref={refFor('am-disabled')} onClick={() => open('am-disabled')}>
                        Open with disabled
                    </Button>
                    {activePopup === 'am-disabled' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-disabled')}
                            items={disabledItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.disabled} />
                </Section>
                <Section>
                    <Heading as="h3">Icons</Heading>
                    <Paragraph>Items can include an icon rendered before the label:</Paragraph>
                    <Button ref={refFor('am-icons')} onClick={() => open('am-icons')}>
                        Open with icons
                    </Button>
                    {activePopup === 'am-icons' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-icons')}
                            items={iconItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.icons} />
                </Section>
                <Section>
                    <Heading as="h3">Custom aria-label</Heading>
                    <Paragraph>
                        Override the default <CodeText>&quot;Action menu&quot;</CodeText> label for
                        screen readers:
                    </Paragraph>
                    <Button ref={refFor('am-aria')} onClick={() => open('am-aria')}>
                        Open with custom label
                    </Button>
                    {activePopup === 'am-aria' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-aria')}
                            ariaLabel="User actions"
                            items={basicItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.ariaLabel} />
                </Section>
            </Main>
        </Screen>
    )
}
