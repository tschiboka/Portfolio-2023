import { OptionPanel, useModal } from '../common/components'
import { Functions } from '@common-utils'

export const HomeOptions = () => {
    const { setOpen } = useModal()

    return (
        <OptionPanel>
            <OptionPanel.Button label="Invite a Friend" onClick={() => setOpen('invite')} />
            <OptionPanel.Button label="Find a Match" disabled={true} onClick={Functions.noop} />
            <OptionPanel.Button label="Instructions" disabled={true} onClick={Functions.noop} />
            <OptionPanel.Button label="Settings" disabled={true} onClick={Functions.noop} />
        </OptionPanel>
    )
}
