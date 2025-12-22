type OptionButtonProps = {
    label: string
    onClick: () => void
    disabled?: boolean
}

export const OptionButton = ({
    label,
    onClick,
    disabled,
}: OptionButtonProps) => (
    <button className="option-button" onClick={onClick} disabled={disabled}>
        {label}
    </button>
)
