const GREEN_BG = '#77f97b'
const GREEN_STROKE = '#11561c'

export const CheckMark = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        {/* Green square background */}
        <rect x="2" y="2" width="20" height="20" rx="4" fill={GREEN_BG} />

        {/* White checkmark */}
        <path
            d="M6 12l4 4 8-8"
            fill="none"
            stroke={GREEN_STROKE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
