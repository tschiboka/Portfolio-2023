import type { ActionMenuItem } from '../ActionMenu'

export const mocks = {
    default: [
        { id: 'edit', label: 'Edit', onClick: vi.fn() },
        { id: 'delete', label: 'Delete', onClick: vi.fn() },
    ] as ActionMenuItem[],
    fullScreen: { ariaLabel: 'full', children: 'Content' } as const,
}
