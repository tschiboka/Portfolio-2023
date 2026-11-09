import type { VoidFunction } from '@common-utils'

type OptionButtonProps = {
    label: string
    onClick: VoidFunction
    disabled?: boolean
}

export const OptionButton = ({ label, onClick, disabled }: OptionButtonProps) => (
    <button className="option-button" onClick={onClick} disabled={disabled}>
        {label}
    </button>
)
