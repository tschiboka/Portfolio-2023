import { OptionPanel, useModal } from '../common/components'

export const HomeOptions = () => {
    const { setOpen } = useModal()

    return (
        <OptionPanel>
            <OptionPanel.Button
                label="Invite a Friend"
                onClick={() => setOpen('invite')}
            />
            <OptionPanel.Button
                label="Find a Match"
                disabled={true}
                onClick={() => {}}
            />
            <OptionPanel.Button
                label="Instructions"
                disabled={true}
                onClick={() => {}}
            />
            <OptionPanel.Button
                label="Settings"
                disabled={true}
                onClick={() => {}}
            />
        </OptionPanel>
    )
}
