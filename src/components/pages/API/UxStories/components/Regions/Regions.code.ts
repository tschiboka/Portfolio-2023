export const Code = {
    Card: {
        basic: `<Card ariaLabel="User profile">
    <p>Card content goes here.</p>
</Card>`,
        withTitle: `<Card ariaLabel="Summary" title="Summary" icon={<FaChartBar />}>
    <p>Monthly usage overview.</p>
</Card>`,
    },
    Section: {
        static: `<Section title="Details" ariaLabel="Details">
    <p>Section content is always visible.</p>
</Section>`,
        expandable: `<Section title="Advanced" expandable ariaLabel="Advanced">
    <p>This section can be toggled open and closed.</p>
</Section>`,
        collapsed: `<Section title="Collapsed" expandable defaultOpen={false} ariaLabel="Collapsed">
    <p>Starts collapsed — click the header to expand.</p>
</Section>`,
    },
    Dialog: {
        basic: `<Dialog ariaLabel="Confirm action">
    <p>Are you sure you want to proceed?</p>
</Dialog>`,
    },
    Sidebar: {
        basic: `<Sidebar ariaLabel="App navigation">
    <nav>
        <a href="/home">Home</a>
        <a href="/about">About</a>
    </nav>
</Sidebar>`,
    },
    Header: {
        basic: `<Header ariaLabel="Site header">
    <span>Logo</span>
    <nav>Navigation links</nav>
</Header>`,
    },
    Main: {
        basic: `<Main ariaLabel="Page content">
    <h1>Welcome</h1>
    <p>Primary content area.</p>
</Main>`,
    },
    Region: {
        direct: `{/* All wrappers delegate to Region */}
<Region variant="default">…</Region>
<Region variant="section" collapsible>…</Region>
<Region variant="dialog">…</Region>
<Region variant="sidebar">…</Region>
<Region variant="header">…</Region>
<Region variant="main">…</Region>`,
    },
}
