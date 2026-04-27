export const Code = {
    Basic: {
        minimal: `<Pill label="Active" />`,
        withColor: `<Pill label="ERROR" color="error" />`,
    },
    Colors: {
        allColors: `<Pill label="ACCENT" color="accent" />
<Pill label="ERROR" color="error" />
<Pill label="SUCCESS" color="success" />
<Pill label="YELLOW" color="yellow" />
<Pill label="ORANGE" color="orange" />
<Pill label="PURPLE" color="purple" />
<Pill label="GRAY" color="gray" />`,
    },
    UseCases: {
        statusBadge: `const statusColors: Record<string, PillColor> = {
    active: 'success',
    inactive: 'error',
    pending: 'orange',
}

const renderStatus = (status: string) => (
    <Pill
        label={status.toUpperCase()}
        color={statusColors[status] ?? 'gray'}
    />
)`,
        tags: `const tags = ['React', 'TypeScript', 'CSS']

{tags.map((tag) => (
    <Pill key={tag} label={tag} color="purple" />
))}`,
        legend: `<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <span><Pill label="ACTIVE" color="success" /> = 21</span>
    <span><Pill label="PENDING" color="orange" /> = 8</span>
    <span><Pill label="INACTIVE" color="error" /> = 3</span>
</div>`,
    },
    Accessibility: {
        ariaLabel: `<Pill
    label="3 errors"
    color="error"
    ariaLabel="3 validation errors found"
/>`,
    },
    CustomStyling: {
        className: `<Pill label="Custom" className="my-pill" color="accent" />`,
        style: `<Pill
    label="Wide"
    color="accent"
    style={{ padding: '6px 24px', fontSize: '1rem' }}
/>`,
    },
}
