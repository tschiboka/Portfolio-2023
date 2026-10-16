import { ModalHooks, Options } from '../../common/components'
import { Functions } from '@common-utils'

export const HomeOptions = () => {
    const { setOpen } = ModalHooks.useContext()

    return (
        <Options>
            <Options.Button label="Invite a Friend" onClick={() => setOpen('invite')} />
            <Options.Button label="Find a Match" disabled={true} onClick={Functions.noop} />
            <Options.Button label="Instructions" disabled={true} onClick={Functions.noop} />
            <Options.Button label="Settings" disabled={true} onClick={Functions.noop} />
        </Options>
    )
}
