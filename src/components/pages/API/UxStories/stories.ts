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
        label: 'Code Blocks',
        path: '/api/ux-stories/code-blocks',
        description: 'Syntax-highlighted code snippets with copy support.',
    },
    {
        label: 'Forms',
        path: '/api/ux-stories/forms',
        description: 'Controlled inputs integrated with react-hook-form.',
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
        label: 'Stacks',
        path: '/api/ux-stories/stacks',
        description: 'Flexbox layout primitives for vertical and horizontal flow.',
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
]

export const STORIES_INDEX_PATH = '/api/ux-stories'
