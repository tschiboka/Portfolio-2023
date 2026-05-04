import { useRef, useState } from 'react'
import { Code, Overlay, Stack } from '@common/ux'
import { PopupMode, PopupSize } from '@common/ux/Overlay/Overlay.types'
import type { ActionMenuItem } from '@common/ux/Overlay/ActionMenu'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import { Code as Snippets } from './Overlays.code'

const modes: PopupMode[] = ['primary', 'warning', 'danger', 'info']
const sizes: PopupSize[] = ['sm', 'md', 'lg']
const aligns = ['start', 'center', 'end'] as const

type OverlaysProps = {
    path: string
}
export const Overlays = ({ path }: OverlaysProps) => {
    const [activePopup, setActivePopup] = useState<string | null>(null)
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
            title={'Tivadar Debnar | Overlays'}
            path={path}
            recordVisit={false}
            loginRequired
            variant="api"
            pageName="Projects"
            sideMenu={<PageSideMenu />}
        >
            <main>
                <StoryNav />
                <h1>Overlays</h1>
                <p>
                    Overlay components provide modal dialogs and portaled menus for user
                    interaction. The <code>Popup</code> variant supports modes, sizes, actions, and
                    anchored positioning. The <code>ActionMenu</code> is a lightweight portaled
                    dropdown for contextual actions.
                </p>

                {/* ── Popup ───────────────────────────────────────── */}

                <h2>Popup</h2>

                <section>
                    <h3>Modes</h3>
                    <p>Each mode has a distinct color scheme and default icon:</p>
                    <Stack.Horizontal gap="12" wrap>
                        {modes.map((mode) => (
                            <button
                                key={mode}
                                ref={refFor(`mode-${mode}`)}
                                onClick={() => open(`mode-${mode}`)}
                            >
                                {mode}
                            </button>
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
                </section>

                <section>
                    <h3>Sizes</h3>
                    <p>Popups come in three sizes — sm, md, and lg:</p>
                    <Stack.Horizontal gap="12" wrap>
                        {sizes.map((size) => (
                            <button
                                key={size}
                                ref={refFor(`size-${size}`)}
                                onClick={() => open(`size-${size}`)}
                            >
                                {size}
                            </button>
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
                </section>

                <section>
                    <h3>Actions</h3>
                    <p>Popups can have multiple action buttons, with conditional visibility:</p>
                    <button ref={refFor('actions')} onClick={() => open('actions')}>
                        Open with actions
                    </button>
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
                </section>

                <section>
                    <h3>Anchored</h3>
                    <p>Popups anchor to the trigger button and auto-position above or below:</p>
                    <Stack.Horizontal gap="24" wrap style={{ padding: '40px 0' }}>
                        <button ref={refFor('anchored')} onClick={() => open('anchored')}>
                            Open anchored
                        </button>
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
                </section>

                <section>
                    <h3>Custom Content</h3>
                    <p>Popups accept children for fully custom body content:</p>
                    <button ref={refFor('custom')} onClick={() => open('custom')}>
                        Open custom popup
                    </button>
                    {activePopup === 'custom' && (
                        <Overlay.Popup
                            mode="warning"
                            title="Custom Content"
                            anchorRef={anchorFor('custom')}
                            onClose={close}
                            size="lg"
                        >
                            <div style={{ padding: '12px 0' }}>
                                <p style={{ margin: 0 }}>
                                    This popup has custom children rendered below the title.
                                </p>
                                <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                                    <li>Custom list item 1</li>
                                    <li>Custom list item 2</li>
                                    <li>Custom list item 3</li>
                                </ul>
                            </div>
                        </Overlay.Popup>
                    )}
                    <Code language="tsx" content={Snippets.Popup.customContent} />
                </section>

                {/* ── ActionMenu ──────────────────────────────────── */}

                <h2>ActionMenu</h2>
                <p>
                    A lightweight portaled dropdown menu for contextual actions. Renders to{' '}
                    <code>document.body</code> via <code>createPortal</code>, avoiding overflow
                    clipping. Closes on Escape, click outside, scroll, and resize.
                </p>

                <section>
                    <h3>Basic</h3>
                    <p>A simple action menu with three items:</p>
                    <button ref={refFor('am-basic')} onClick={() => open('am-basic')}>
                        Open menu
                    </button>
                    {activePopup === 'am-basic' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-basic')}
                            items={basicItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.basic} />
                </section>

                <section>
                    <h3>Alignment</h3>
                    <p>
                        The <code>align</code> prop controls horizontal alignment relative to the
                        anchor: <code>start</code>, <code>center</code> (default), or{' '}
                        <code>end</code>.
                    </p>
                    <Stack.Horizontal gap="12" wrap>
                        {aligns.map((align) => (
                            <button
                                key={align}
                                ref={refFor(`am-align-${align}`)}
                                onClick={() => open(`am-align-${align}`)}
                            >
                                align=&quot;{align}&quot;
                            </button>
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
                </section>

                <section>
                    <h3>Variants</h3>
                    <p>
                        Items support colour variants: <code>primary</code>, <code>secondary</code>,
                        and <code>danger</code>.
                    </p>
                    <button ref={refFor('am-variants')} onClick={() => open('am-variants')}>
                        Open with variants
                    </button>
                    {activePopup === 'am-variants' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-variants')}
                            items={variantItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.variants} />
                </section>

                <section>
                    <h3>Disabled Items</h3>
                    <p>
                        Items with <code>disabled: true</code> are greyed out and unclickable:
                    </p>
                    <button ref={refFor('am-disabled')} onClick={() => open('am-disabled')}>
                        Open with disabled
                    </button>
                    {activePopup === 'am-disabled' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-disabled')}
                            items={disabledItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.disabled} />
                </section>

                <section>
                    <h3>Icons</h3>
                    <p>Items can include an icon rendered before the label:</p>
                    <button ref={refFor('am-icons')} onClick={() => open('am-icons')}>
                        Open with icons
                    </button>
                    {activePopup === 'am-icons' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-icons')}
                            items={iconItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.icons} />
                </section>

                <section>
                    <h3>Custom aria-label</h3>
                    <p>
                        Override the default <code>&quot;Action menu&quot;</code> label for screen
                        readers:
                    </p>
                    <button ref={refFor('am-aria')} onClick={() => open('am-aria')}>
                        Open with custom label
                    </button>
                    {activePopup === 'am-aria' && (
                        <Overlay.ActionMenu
                            anchorRef={anchorFor('am-aria')}
                            ariaLabel="User actions"
                            items={basicItems}
                            onClose={close}
                        />
                    )}
                    <Code language="tsx" content={Snippets.ActionMenu.ariaLabel} />
                </section>
            </main>
        </Screen>
    )
}
