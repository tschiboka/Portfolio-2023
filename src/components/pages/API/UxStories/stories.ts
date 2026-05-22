export interface StoryEntry {
    label: string
    path: string
    description?: string
}

export const stories: StoryEntry[] = [
    {
        label: 'Access Guards',
        path: '/api/ux-stories/access-guards',
        description: 'Role-based visibility, disabled states, and tooltip guards.',
    },
    {
        label: 'Buttons',
        path: '/api/ux-stories/buttons',
        description: 'Variants, sizes, disabled state, anchor rendering, and accessibility.',
    },
    {
        label: 'Code Blocks',
        path: '/api/ux-stories/code-blocks',
        description: 'Syntax-highlighted code snippets with copy support.',
    },
    {
        label: 'Figures',
        path: '/api/ux-stories/figures',
        description: 'Semantic images with captions, sizes, responsive sources, and zoom.',
    },
    {
        label: 'Forms',
        path: '/api/ux-stories/forms',
        description: 'Controlled inputs integrated with react-hook-form.',
    },
    {
        label: 'Layouts',
        path: '/api/ux-stories/layouts',
        description: 'Layout primitives: Box, Stack, Inline, Grid, Split, Spacer, Show, Hide.',
    },
    {
        label: 'Links',
        path: '/api/ux-stories/links',
        description: 'Polymorphic links for internal routes and external anchors.',
    },
    {
        label: 'Loading Indicators',
        path: '/api/ux-stories/loading-indicators',
        description: 'Animated spinner with conditional visibility and custom color.',
    },
    {
        label: 'Nav',
        path: '/api/ux-stories/nav',
        description: 'Responsive navigation bar with submenus and mobile menu.',
    },
    {
        label: 'Overlays',
        path: '/api/ux-stories/overlays',
        description: 'Modal dialogs, popups, and action menus.',
    },
    {
        label: 'Pills',
        path: '/api/ux-stories/pills',
        description: 'Inline coloured badges for status and tagging.',
    },
    {
        label: 'Regions',
        path: '/api/ux-stories/regions',
        description: 'Unified structural primitives: Card, Section, Modal, Sidebar, Header, Main.',
    },
    {
        label: 'Tables',
        path: '/api/ux-stories/tables',
        description: 'Data grids with sorting, filtering, pagination, and selection.',
    },
    {
        label: 'Test Accessor',
        path: '/api/ux-stories/test-accessor',
        description: 'Structured test utility layer for consistent component testing.',
    },
    {
        label: 'Typography',
        path: '/api/ux-stories/typography',
        description: 'Heading, Paragraph, Text, Caption, CodeText, BlockQuote, Overline.',
    },
]

export const STORIES_INDEX_PATH = '/api/ux-stories'
