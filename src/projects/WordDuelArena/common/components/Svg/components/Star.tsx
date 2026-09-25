const YELLOW_BRIGHT = '#ffe17d'
const YELLOW_OUTLINE = '#926b00'

type StarProps = {
    isFilled?: boolean
}
export const Star = ({ isFilled = true }: StarProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
    >
        <polygon
            fill={isFilled ? YELLOW_BRIGHT : 'none'}
            stroke={YELLOW_OUTLINE}
            strokeWidth="1.5"
            strokeLinejoin="round"
            points="12,2 14.472,9.236 22,9.236 16.764,14.472 19.236,22 12,16.764 4.764,22 7.236,14.472 2,9.236 9.528,9.236"
        />
    </svg>
)
