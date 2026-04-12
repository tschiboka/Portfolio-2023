import { useRef, useState } from 'react'
import { Overlay, Stack } from '@common/ux'
import { PopupMode, PopupSize } from '@common/ux/Overlay/Overlay.types'

const modes: PopupMode[] = ['primary', 'warning', 'danger', 'info']
const sizes: PopupSize[] = ['sm', 'md', 'lg']

export const Overlays = () => {
    const [activePopup, setActivePopup] = useState<string | null>(null)
    const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({})

    const open = (id: string) => setActivePopup(id)
    const close = () => setActivePopup(null)

    const refFor = (id: string) => (el: HTMLButtonElement | null) => {
        btnRefs.current[id] = el
    }
    const anchorFor = (id: string) => ({ current: btnRefs.current[id] ?? null })

    return (
        <>
            <h2>Overlays</h2>
            <p>
                Overlay components provide modal dialogs for user interaction. The Popup variant
                supports different modes, sizes, actions, and default icons per mode.
            </p>

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
                            { label: 'Hidden', variant: 'secondary', onClick: close, when: false },
                        ]}
                    />
                )}
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
            </section>
        </>
    )
}
