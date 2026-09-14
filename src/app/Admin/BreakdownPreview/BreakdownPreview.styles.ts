import type { CSSProperties } from 'react'
import { Const } from '@common-ux'

/**
 * Preview shell — mirrors the project's dark-theme design.
 * Every element has explicit color + background so the preview
 * looks correct regardless of system or page theme.
 */

const tableTh: CSSProperties = {
    padding: `${Const.Spacing[8]}px 0`,
    textAlign: 'left',
    fontWeight: 700,
    color: Const.Color.White[4],
    borderBottom: `1px solid ${Const.Color.Black[3]}`,
    fontVariant: 'small-caps',
    background: 'transparent',
}

const tableTd: CSSProperties = {
    padding: `${Const.Spacing[8]}px 0`,
    borderBottom: `1px solid ${Const.Color.Black[2]}`,
    color: Const.Color.White[2],
    fontWeight: 300,
    background: 'transparent',
}

export const BreakdownPreviewStyles = {
    shell: {
        fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
        fontWeight: 300,
        background: Const.Color.Black[1],
        padding: `${Const.Spacing[24]}px ${Const.Spacing[12]}px`,
        color: Const.Color.White[1],
    },

    card: {
        maxWidth: '600px',
        margin: '0 auto',
        background: Const.Color.Black.X,
        borderRadius: '10px',
        overflow: 'hidden',
        border: `2px solid ${Const.Color.Black[2]}`,
        boxShadow:
            '10px 10px 30px rgba(0,0,0,0.7), -5px -5px 5px rgba(255,255,255,0.02), inset 10px 10px 20px black',
    },

    body: {
        padding: `${Const.Spacing[20]}px`,
        background: Const.Color.Black.X,
        color: Const.Color.White[2],
    },

    divider: {
        margin: `${Const.Spacing[24]}px 0`,
        border: 'none',
        borderTop: `1px solid ${Const.Color.Black[3]}`,
    },

    header: {
        style: {
            background: Const.Color.Black[1],
            color: Const.Color.White[1],
            padding: `${Const.Spacing[24]}px ${Const.Spacing[20]}px`,
            borderBottom: `1px solid ${Const.Color.Black[3]}`,
        },
        title: {
            margin: 0,
            fontSize: '1.53rem',
            fontWeight: 700,
            fontVariant: 'small-caps',
            color: Const.Color.White[1],
        },
        sub: {
            margin: '6px 0 0',
            opacity: 0.7,
            fontSize: '0.74rem',
            color: Const.Color.White[3],
        },
        icon: {
            marginRight: `${Const.Spacing[8]}px`,
            verticalAlign: 'middle',
        },
    },

    section: {
        title: {
            margin: `0 0 ${Const.Spacing[12]}px`,
            fontSize: '1.2rem',
            fontWeight: 700,
            color: Const.Color.White[2],
            fontVariant: 'small-caps',
        },
        icon: {
            marginRight: '6px',
            verticalAlign: 'middle',
        },
    },

    stat: {
        card: {
            flex: 1,
            background: Const.Color.Black[2],
            padding: `${Const.Spacing[12]}px`,
            borderRadius: `${Const.Spacing[8]}px`,
            border: `1px solid ${Const.Color.Black[3]}`,
            color: Const.Color.White[4],
        },
        label: {
            fontSize: '0.58rem',
            color: Const.Color.White[4],
            marginBottom: '2px',
            fontWeight: 300,
        },
        value: {
            fontSize: '1.94rem',
            fontWeight: 700,
            lineHeight: 1.1,
            color: Const.Color.Accent[0],
        },
    },

    table: {
        style: {
            width: '100%',
            fontSize: '0.74rem',
            borderCollapse: 'collapse',
            color: Const.Color.White[2],
            background: 'transparent',
        },
        th: tableTh,
        thRight: {
            ...tableTh,
            textAlign: 'right',
        },
        td: tableTd,
        tdRight: {
            ...tableTd,
            textAlign: 'right',
            fontWeight: 700,
            color: Const.Color.White[1],
        },
        tdTotal: {
            ...tableTd,
            textAlign: 'right',
            color: Const.Color.White[4],
        },
        empty: {
            padding: `${Const.Spacing[8]}px 0`,
            color: Const.Color.White[5],
            fontStyle: 'italic',
            fontWeight: 300,
            background: 'transparent',
        },
    },

    signature: {
        container: {
            marginTop: `${Const.Spacing[24]}px`,
            borderTop: `1px solid ${Const.Color.Black[3]}`,
            paddingTop: `${Const.Spacing[16]}px`,
        },
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: `${Const.Spacing[12]}px`,
            alignItems: 'stretch',
        },
        avatarCol: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: `${Const.Spacing[8]}px`,
            flexShrink: 0,
            justifyContent: 'center',
            width: '84px',
        },
        avatar: {
            borderRadius: '50%',
            display: 'inline-block',
            border: `2px solid ${Const.Color.Black[3]}`,
            boxShadow:
                '2px 2px 4px rgba(0,0,0,0.6), -2px -2px 4px rgba(255,255,255,0.04), inset 2px 2px 4px rgba(255,255,255,0.1), inset -2px -2px 4px rgba(0,0,0,0.4)',
        },
        info: {
            flex: 1,
            minWidth: '200px',
            fontSize: '0.74rem',
            color: Const.Color.White[4],
            fontWeight: 300,
            lineHeight: 1.5,
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
        },
        nameBlock: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
        },
        name: {
            color: Const.Color.Accent[4],
            fontWeight: 700,
            fontSize: '0.83rem',
        },
        small: {
            fontSize: '0.58rem',
            color: Const.Color.White[5],
            lineHeight: 1.6,
        },
        degree: {
            fontSize: '0.52rem',
        },
        stamp: {
            fontStyle: 'italic',
        },
        avatarSpacer: {
            height: '8px',
        },
        linksGap: {
            width: '100%',
            height: '6px',
        },
        linksBlock: {
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
        },
        links: {
            fontSize: '0.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            alignItems: 'center',
            fontFamily: 'Fira Code, monospace',
            lineHeight: '18px',
        },
        link: {
            color: Const.Color.White[5],
            textDecoration: 'none',
            fontFamily: 'Fira Code, monospace',
        },
        linkUnderline: {
            color: Const.Color.White[5],
            textDecoration: 'underline',
            fontFamily: 'Fira Code, monospace',
        },
        linkItem: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
            height: '18px',
        },
        linkIcon: {
            color: Const.Color.Accent[2],
            flexShrink: 0,
        },
        socials: {
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        disclaimer: {
            borderTop: `1px solid ${Const.Color.Black[3]}`,
            paddingTop: `${Const.Spacing[12]}px`,
            marginTop: `${Const.Spacing[12]}px`,
            fontSize: '0.58rem',
            color: Const.Color.White[5],
        },
    },
} as const

// ---------------------------------------------------------------------------
// Responsive overrides (rendered in a real <style> element, not dangerously)
// ---------------------------------------------------------------------------

export const responsiveOverrides = `
    @media (max-width: 600px) {
        .bp-shell { padding: 12px 6px !important; }
        .bp-header { padding: 16px !important; }
        .bp-body { padding: 16px !important; }
        .bp-stat-value { font-size: 1.53rem !important; }
        .bp-signature-row { flex-direction: column !important; align-items: flex-start !important; }
        .bp-signature-links { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; }
    }
`
