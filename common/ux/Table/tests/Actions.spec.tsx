import { fireEvent, screen } from '@testing-library/react'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'
import { Test } from '@common/ux/Test'

describe('Table — Actions', () => {
    describe('Basic actions', () => {
        it('renders action column when actions are provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(Test.Table.Get.actionButton()).toBeInTheDocument()
        })

        it('does not render action column when no actions', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table.Query.actionButton()).not.toBeInTheDocument()
        })

        it('renders one action button per row', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(Test.Table.Get.actionButtons()).toHaveLength(rows.length)
        })
    })

    describe('onClick action', () => {
        it('calls onClick with correct meta when action is clicked', async () => {
            const onClick = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit', onClick }],
            })
            await Test.Table.Act.clickAction('Edit')
            expect(onClick).toHaveBeenCalledTimes(1)
            expect(onClick).toHaveBeenCalledWith(
                expect.objectContaining({
                    row: rows[0],
                    index: 0,
                }),
            )
        })

        it('closes dropdown after clicking an action', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit', onClick: vi.fn() }],
            })
            await Test.Table.Act.clickAction('Edit')
            expect(Test.Table.Query.menu()).not.toBeInTheDocument()
        })
    })

    describe('href action', () => {
        it('navigates to href computed from meta', async () => {
            const originalHref = window.location.href
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [
                    {
                        id: 'view',
                        label: 'View',
                        href: ({ row }) => `#${row.name.toLowerCase()}`,
                    },
                ],
            })
            await Test.Table.Act.clickAction('View')
            // jsdom doesn't navigate, but we can check the location was set
            expect(window.location.href).toContain('alpha')
            // Restore
            window.location.href = originalHref
        })
    })

    describe('filter action', () => {
        it('hides action when filter returns false', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [
                    { name: 'Visible', value: '1', status: 'active', note: '' },
                    { name: 'Hidden', value: '2', status: 'inactive', note: '' },
                ],
                columns: basicColumns,
                actions: [
                    {
                        id: 'activate',
                        label: 'Activate',
                        filter: ({ row }) => row.status !== 'active',
                    },
                ],
            })
            // First row — action filtered out (active)
            await Test.Table.Act.openActionMenu(0)
            expect(Test.Table.Query.menuItem('Activate')).not.toBeInTheDocument()
        })

        it('shows action when filter returns true', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [
                    { name: 'Active', value: '1', status: 'active', note: '' },
                    { name: 'Inactive', value: '2', status: 'inactive', note: '' },
                ],
                columns: basicColumns,
                actions: [
                    {
                        id: 'activate',
                        label: 'Activate',
                        filter: ({ row }) => row.status !== 'active',
                    },
                ],
            })
            // Second row — action visible (inactive)
            await Test.Table.Act.openActionMenu(1)
            expect(Test.Table.Get.menuItem('Activate')).toBeInTheDocument()
        })
    })

    describe('isDisabled action', () => {
        it('disables the action item when isDisabled returns true', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [
                    {
                        id: 'delete',
                        label: 'Delete',
                        isDisabled: () => true,
                    },
                ],
            })
            await Test.Table.Act.openActionMenu()
            expect(Test.Table.Get.menuItem('Delete')).toBeDisabled()
        })

        it('does not disable the action item when isDisabled returns false', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [
                    {
                        id: 'delete',
                        label: 'Delete',
                        isDisabled: () => false,
                    },
                ],
            })
            await Test.Table.Act.openActionMenu()
            expect(Test.Table.Get.menuItem('Delete')).not.toBeDisabled()
        })
    })

    describe('isActionDisabled (column-level)', () => {
        it('disables entire action button when isActionDisabled returns true', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'Disabled', value: '0', status: 'x', note: '' }],
                columns: [
                    {
                        header: 'Name',
                        accessor: 'name' as const,
                        isActionDisabled: () => true,
                    },
                ],
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(Test.Table.Get.actionButton()).toBeDisabled()
        })

        it('does not disable action button when isActionDisabled returns false', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: [{ name: 'Enabled', value: '1', status: 'x', note: '' }],
                columns: [
                    {
                        header: 'Name',
                        accessor: 'name' as const,
                        isActionDisabled: () => false,
                    },
                ],
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(Test.Table.Get.actionButton()).not.toBeDisabled()
        })
    })

    describe('Action variants', () => {
        it.each(['primary', 'secondary', 'danger'] as const)(
            'applies %s variant class to action item',
            async (variant) => {
                Test.Table.Set.mock<Row>({
                    ariaLabel: 'test',
                    data: rows.slice(0, 1),
                    columns: basicColumns,
                    actions: [{ id: 'a', label: 'Action', variant }],
                })
                await Test.Table.Act.openActionMenu()
                const item = Test.Table.Get.menuItem('Action')
                expect(item).toHaveClass(variant)
            },
        )
    })

    describe('Action menu toggle', () => {
        it('opens the menu on click', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            await Test.Table.Act.openActionMenu()
            expect(Test.Table.Get.menu()).toBeInTheDocument()
        })

        it('closes the menu on second click', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const btn = Test.Table.Get.actionButton()
            const user = await Test.Table.Click.actionButton()
            await user.click(btn)
            expect(Test.Table.Query.menu()).not.toBeInTheDocument()
        })

        it('renders multiple actions in the dropdown', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [
                    { id: 'edit', label: 'Edit' },
                    { id: 'delete', label: 'Delete' },
                    { id: 'view', label: 'View' },
                ],
            })
            await Test.Table.Act.openActionMenu()
            expect(screen.getAllByRole('menuitem')).toHaveLength(3)
        })

        it('renders action icon when provided', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [
                    {
                        id: 'edit',
                        label: 'Edit',
                        icon: <span data-testid="edit-icon">✏️</span>,
                    },
                ],
            })
            await Test.Table.Act.openActionMenu()
            expect(screen.getByTestId('edit-icon')).toBeInTheDocument()
        })

        it('closes the menu on window resize', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            await Test.Table.Act.openActionMenu()
            expect(Test.Table.Get.menu()).toBeInTheDocument()
            fireEvent(window, new Event('resize'))
            expect(Test.Table.Query.menu()).not.toBeInTheDocument()
        })

        it('closes the menu on scroll', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            await Test.Table.Act.openActionMenu()
            expect(Test.Table.Get.menu()).toBeInTheDocument()
            fireEvent.scroll(window)
            expect(Test.Table.Query.menu()).not.toBeInTheDocument()
        })
    })
})
