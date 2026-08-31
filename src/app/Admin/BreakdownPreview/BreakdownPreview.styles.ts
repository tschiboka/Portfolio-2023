import type { CSSProperties } from 'react'

/**
 * Preview shell — mirrors the project's dark-theme design.
 * Every element has explicit color + background so the preview
 * looks correct regardless of system or page theme.
 */

export const shellStyle: CSSProperties = {
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
    fontWeight: 300,
    background: '#111',
    padding: '24px 12px',
    color: '#eee',
}

export const cardStyle: CSSProperties = {
    maxWidth: '600px',
    margin: '0 auto',
    background: '#0a0a0a',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '2px solid #222',
    boxShadow:
        '10px 10px 30px rgba(0,0,0,0.7), -5px -5px 5px rgba(255,255,255,0.02), inset 10px 10px 20px black',
}

export const headerStyle: CSSProperties = {
    background: '#111',
    color: '#eee',
    padding: '24px 20px',
    borderBottom: '1px solid #333',
}

export const headerTitleStyle: CSSProperties = {
    margin: 0,
    fontSize: '1.53rem',
    fontWeight: 700,
    fontVariant: 'small-caps',
    color: '#eee',
}

export const headerSubStyle: CSSProperties = {
    margin: '6px 0 0',
    opacity: 0.7,
    fontSize: '0.74rem',
    color: '#bbb',
}

export const bodyStyle: CSSProperties = {
    padding: '20px',
    background: '#0a0a0a',
    color: '#d8d8d8',
}

export const sectionTitleStyle: CSSProperties = {
    margin: '0 0 12px',
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#d8d8d8',
    fontVariant: 'small-caps',
}

export const statCardStyle: CSSProperties = {
    flex: 1,
    background: '#222',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #333',
    color: '#a8a8a8',
}

export const statLabelStyle: CSSProperties = {
    fontSize: '0.58rem',
    color: '#a8a8a8',
    marginBottom: '2px',
    fontWeight: 300,
}

export const statValueStyle: CSSProperties = {
    fontSize: '1.94rem',
    fontWeight: 700,
    lineHeight: 1.1,
    color: '#00ffff',
}

export const tableStyle: CSSProperties = {
    width: '100%',
    fontSize: '0.74rem',
    borderCollapse: 'collapse',
    color: '#d8d8d8',
    background: 'transparent',
}

export const thStyle: CSSProperties = {
    padding: '8px 0',
    textAlign: 'left',
    fontWeight: 700,
    color: '#a8a8a8',
    borderBottom: '1px solid #333',
    fontVariant: 'small-caps',
    background: 'transparent',
}

export const thRightStyle: CSSProperties = {
    ...thStyle,
    textAlign: 'right',
}

export const tdStyle: CSSProperties = {
    padding: '8px 0',
    borderBottom: '1px solid #222',
    color: '#d8d8d8',
    fontWeight: 300,
    background: 'transparent',
}

export const tdRightStyle: CSSProperties = {
    ...tdStyle,
    textAlign: 'right',
    fontWeight: 700,
    color: '#eee',
}

export const tdTotalStyle: CSSProperties = {
    ...tdStyle,
    textAlign: 'right',
    color: '#a8a8a8',
}

export const emptyStyle: CSSProperties = {
    padding: '8px 0',
    color: '#888',
    fontStyle: 'italic',
    fontWeight: 300,
    background: 'transparent',
}

export const dividerStyle: CSSProperties = {
    margin: '24px 0',
    border: 'none',
    borderTop: '1px solid #333',
}

export const footerStyle: CSSProperties = {
    marginTop: '24px',
    fontSize: '0.58rem',
    color: '#888',
    textAlign: 'center',
    fontWeight: 300,
}

// ---------------------------------------------------------------------------
// Responsive overrides (injected via <style> tag)
// ---------------------------------------------------------------------------

export const responsiveOverrides = `
    <style id="breakdown-preview-responsive">
        @media (max-width: 600px) {
            .bp-shell { padding: 12px 6px !important; }
            .bp-header { padding: 16px !important; }
            .bp-body { padding: 16px !important; }
            .bp-stat-value { font-size: 1.53rem !important; }
            .bp-signature-row { flex-direction: column !important; align-items: flex-start !important; }
            .bp-signature-links { flex-direction: column !important; align-items: flex-start !important; gap: 6px !important; }
        }
    </style>
`
