export const Code = {
    Popup: {
        modes: `<Overlay.Popup
    mode="warning"
    anchorRef={anchorRef}
    title="Warning Mode"
    message="This is a popup in warning mode with its default icon."
    onClose={close}
    actions={[{ label: 'OK', onClick: close }]}
/>`,
        sizes: `<Overlay.Popup
    size="lg"
    anchorRef={anchorRef}
    title="Large Popup"
    message="This popup uses the lg size preset."
    onClose={close}
/>`,
        actions: `<Overlay.Popup
    anchorRef={anchorRef}
    title="Action Demo"
    onClose={close}
    actions={[
        { label: 'Confirm', onClick: close },
        { label: 'Hidden', variant: 'secondary', onClick: close, when: false },
    ]}
/>`,
        anchored: `const ref = useRef<HTMLButtonElement>(null)

<button ref={ref} onClick={open}>Open</button>

<Overlay.Popup
    anchorRef={ref}
    title="Anchored Popup"
    message="Auto-positions based on available space."
    onClose={close}
/>`,
        customContent: `<Overlay.Popup
    mode="warning"
    title="Custom Content"
    anchorRef={anchorRef}
    onClose={close}
    size="lg"
>
    <p>Custom children rendered below the title.</p>
</Overlay.Popup>`,
    },
    ActionMenu: {
        basic: `const [open, setOpen] = useState(false)
const ref = useRef<HTMLButtonElement>(null)

<button ref={ref} onClick={() => setOpen(true)}>Open menu</button>

{open && (
    <Overlay.ActionMenu
        anchorRef={ref}
        onClose={() => setOpen(false)}
        items={[
            { id: 'edit', label: 'Edit', onClick: () => console.log('Edit') },
            { id: 'delete', label: 'Delete', onClick: () => console.log('Delete') },
        ]}
    />
)}`,
        align: `<Overlay.ActionMenu
    anchorRef={ref}
    align="end"    // 'start' | 'center' | 'end'
    onClose={close}
    items={[...]}
/>`,
        variants: `items={[
    { id: 'view', label: 'View', variant: 'primary', onClick: ... },
    { id: 'edit', label: 'Edit', variant: 'secondary', onClick: ... },
    { id: 'delete', label: 'Delete', variant: 'danger', onClick: ... },
]}`,
        disabled: `items={[
    { id: 'edit', label: 'Edit', onClick: ... },
    { id: 'locked', label: 'Locked', disabled: true, onClick: ... },
]}`,
        icons: `items={[
    { id: 'edit', label: 'Edit', icon: <EditIcon />, onClick: ... },
    { id: 'delete', label: 'Delete', icon: <TrashIcon />, onClick: ... },
]}`,
        ariaLabel: `<Overlay.ActionMenu
    anchorRef={ref}
    ariaLabel="User actions"
    onClose={close}
    items={[...]}
/>`,
    },
}
