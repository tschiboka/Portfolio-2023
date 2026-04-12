import { AccessGuard } from '@common/utils'
import { useForm } from 'react-hook-form'
import { WrappedInput } from '../../../../../sharedComponents/WrappedFormComponents/WrappedFormComponents'
import { Guards } from './Guards'
import { Stack } from '@common/ux'

const { hiddenGuard, visibleGuard, disabledGuard, softDisabledGuard, tooltipGuard } = Guards

export const AccessGuards = () => {
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
        <>
            <h2>AccessGuards</h2>
            <p>
                AccessGuards are a utility I created to manage access control in my applications.
                They allow me to define granulated access rules based on user roles, permissions, or
                any other criteria. This helps ensure that only authorized users can access certain
                features or perform specific actions.
            </p>
            <section>
                <h3>Hidden Mode</h3>
                <p>The guarded content below is completely removed from the DOM:</p>
                <Stack.Horizontal gap="24">
                    <AccessGuard guards={hiddenGuard}>
                        <span>This text is hidden</span>
                    </AccessGuard>
                    <AccessGuard guards={hiddenGuard}>
                        <p>This paragraph is hidden</p>
                    </AccessGuard>
                    <AccessGuard guards={hiddenGuard}>
                        <button>This button is hidden</button>
                    </AccessGuard>
                    <AccessGuard guards={hiddenGuard}>
                        <WrappedInput
                            name="hiddenInput"
                            control={control}
                            type="text"
                            placeholder="This input is hidden"
                        />
                    </AccessGuard>
                </Stack.Horizontal>
            </section>
            <section>
                <h3>Visible Mode</h3>
                <p>The guarded content renders normally (access denied, but mode is visible):</p>
                <Stack.Horizontal gap="24" align="center">
                    <AccessGuard guards={visibleGuard}>
                        <span>This text is visible</span>
                    </AccessGuard>
                    <AccessGuard guards={visibleGuard}>
                        <p>This paragraph is visible</p>
                    </AccessGuard>
                    <AccessGuard guards={visibleGuard}>
                        <button>This button is visible</button>
                    </AccessGuard>
                    <AccessGuard guards={visibleGuard}>
                        <WrappedInput
                            name="visibleInput"
                            control={control}
                            type="text"
                            placeholder="This input is visible"
                        />
                    </AccessGuard>
                </Stack.Horizontal>
            </section>
            <section>
                <h3>Disabled Mode</h3>
                <p>The content is shown but faded out and non-interactive (hover for reason):</p>
                <Stack.Horizontal gap="24" align="center">
                    <AccessGuard guards={disabledGuard}>
                        <span>This text is disabled</span>
                    </AccessGuard>
                    <AccessGuard guards={disabledGuard}>
                        <p>This paragraph is disabled</p>
                    </AccessGuard>
                    <AccessGuard guards={disabledGuard}>
                        <button>This button is disabled</button>
                    </AccessGuard>
                    <AccessGuard guards={disabledGuard}>
                        <WrappedInput
                            name="disabledInput"
                            control={control}
                            type="text"
                            placeholder="This input is disabled"
                        />
                    </AccessGuard>
                </Stack.Horizontal>
            </section>
            <section>
                <h3>Soft-Disabled Mode</h3>
                <p>The content appears faded but clickable — clicking opens a popup dialog:</p>
                <Stack.Horizontal gap="24" align="center">
                    <AccessGuard guards={softDisabledGuard}>
                        <span>Click this text for info</span>
                    </AccessGuard>
                    <AccessGuard guards={softDisabledGuard}>
                        <p>Click this paragraph for info</p>
                    </AccessGuard>
                    <AccessGuard guards={softDisabledGuard}>
                        <button>Click this button for info</button>
                    </AccessGuard>
                    <AccessGuard guards={softDisabledGuard}>
                        <WrappedInput
                            name="softDisabledInput"
                            control={control}
                            type="text"
                            placeholder="Click this input for info"
                        />
                    </AccessGuard>
                </Stack.Horizontal>
            </section>
            <section>
                <h3>Tooltip Mode</h3>
                <p>The content is faded and non-interactive — hover to see the tooltip:</p>
                <Stack.Horizontal gap="24" align="center">
                    <AccessGuard guards={tooltipGuard}>
                        <span>Hover this text for tooltip</span>
                    </AccessGuard>
                    <AccessGuard guards={tooltipGuard}>
                        <p>Hover this paragraph for tooltip</p>
                    </AccessGuard>
                    <AccessGuard guards={tooltipGuard}>
                        <button>Hover this button for tooltip</button>
                    </AccessGuard>
                    <AccessGuard guards={tooltipGuard}>
                        <WrappedInput
                            name="tooltipInput"
                            control={control}
                            type="text"
                            placeholder="Hover this input for tooltip"
                        />
                    </AccessGuard>
                </Stack.Horizontal>
            </section>
        </>
    )
}
