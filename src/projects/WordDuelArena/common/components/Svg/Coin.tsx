const YELLOW_BASE = '#D4A017'
const YELLOW_OUTLINE = '#926b00'
const YELLOW_BRIGHT = '#ffe17d'

export const Coin = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
    >
        {/* Coin base */}
        <circle
            cx="12"
            cy="12"
            r="10"
            fill={YELLOW_BASE}
            stroke={YELLOW_OUTLINE}
            strokeWidth="2"
        />

        {/* Top-left curved shine */}
        {/* ROTATED: start point and end point moved for light from top-left */}
        <path
            d="M 4.35,12 A 8,8 0 0,1 12,4.35"
            fill="none"
            stroke="white"
            opacity="0.3"
            strokeWidth="2.5"
            strokeLinecap="round"
        />

        {/* Centered 5-point star */}
        <polygon
            fill={YELLOW_BRIGHT}
            stroke={YELLOW_OUTLINE}
            strokeWidth="1"
            strokeLinejoin="round"
            points="12,6.3 13.339,10.05 17.4,10.05 14.03,12.65 15.369,16.4 12,13.8 8.631,16.4 9.97,12.65 6.6,10.05 10.661,10.05"
        />
    </svg>
)
