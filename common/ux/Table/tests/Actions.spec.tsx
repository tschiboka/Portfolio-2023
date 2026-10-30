import { fireEvent, screen } from '@testing-library/react'
import { Test } from '@common-ux/Test'
import { Row } from './Table.spec.types'
import { TableMocks } from './Table.mocks'

const { rows, basicColumns } = TableMocks

describe('Table — Actions', () => {
    describe('Basic actions', () => {
        it('should render the action column when actions are provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(Test.Table('test').Get.actionButton()).toBeInTheDocument()
        })

        it('should not render the action column when no actions are provided', () => {
            Test.Table.Set.mock<Row>({ ariaLabel: 'test', data: rows, columns: basicColumns })
            expect(Test.Table('test').Has.actionButton()).toBe(false)
        })

        it('should render one action button per row', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            expect(Test.Table('test').Get.actionButtons()).toHaveLength(rows.length)
        })
    })

    describe('onClick action', () => {
        it('should call onClick with the correct meta when an action is clicked', async () => {
            const onClick = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit', onClick }],
            })
            const table = Test.Table('test')
            await table.Do.clickAction('Edit')
            expect(onClick).toHaveBeenCalledTimes(1)
            expect(onClick).toHaveBeenCalledWith(
                expect.objectContaining({
                    row: rows[0],
                    index: 0,
                }),
            )
        })

        it('should close the dropdown after clicking an action', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit', onClick: vi.fn() }],
            })
            const table = Test.Table('test')
            await table.Do.clickAction('Edit')
            expect(table.Has.menu()).toBe(false)
        })
    })

    describe('href action', () => {
        it('should navigate to the href computed from the meta', async () => {
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
            const table = Test.Table('test')
            await table.Do.clickAction('View')
            // jsdom doesn't navigate, but we can check the location was set
            expect(window.location.href).toContain('alpha')
            // Restore
            window.location.href = originalHref
        })
    })

    describe('filter action', () => {
        it('should hide the action when the filter returns false', async () => {
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
            const table = Test.Table('test')
            // First row — action filtered out (active)
            await table.Do.clickActionButton(0)
            expect(table.Has.menuItem('Activate')).toBe(false)
        })

        it('should show the action when the filter returns true', async () => {
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
            const table = Test.Table('test')
            // Second row — action visible (inactive)
            await table.Do.clickActionButton(1)
            expect(table.Get.menuItem('Activate')).toBeInTheDocument()
        })
    })

    describe('isDisabled action', () => {
        it('should disable the action item when isDisabled returns true', async () => {
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
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            expect(table.Get.menuItem('Delete')).toBeDisabled()
        })

        it('should not disable the action item when isDisabled returns false', async () => {
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
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            expect(table.Get.menuItem('Delete')).not.toBeDisabled()
        })
    })

    describe('isActionDisabled (column-level)', () => {
        it('should disable the entire action button when isActionDisabled returns true', () => {
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
            expect(Test.Table('test').Get.actionButton()).toBeDisabled()
        })

        it('should not disable the action button when isActionDisabled returns false', () => {
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
            expect(Test.Table('test').Get.actionButton()).not.toBeDisabled()
        })
    })

    describe('Action variants', () => {
        it.each(['primary', 'secondary', 'danger'] as const)(
            'should apply the %s variant class to the action item',
            async (variant) => {
                Test.Table.Set.mock<Row>({
                    ariaLabel: 'test',
                    data: rows.slice(0, 1),
                    columns: basicColumns,
                    actions: [{ id: 'a', label: 'Action', variant }],
                })
                const table = Test.Table('test')
                await table.Do.clickActionButton()
                const item = table.Get.menuItem('Action')
                expect(item).toHaveClass(variant)
            },
        )
    })

    describe('Action menu toggle', () => {
        it('should open the menu on click', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            expect(table.Get.menu()).toBeInTheDocument()
        })

        it('should close the menu on second click', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            await table.Do.clickActionButton()
            expect(table.Has.menu()).toBe(false)
        })

        it('should render multiple actions in the dropdown', async () => {
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
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            expect(screen.getAllByRole('menuitem')).toHaveLength(3)
        })

        it('should render the action icon when provided', async () => {
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
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            expect(screen.getByTestId('edit-icon')).toBeInTheDocument()
        })

        it('should close the menu on window resize', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            expect(table.Get.menu()).toBeInTheDocument()
            fireEvent(window, new Event('resize'))
            expect(table.Has.menu()).toBe(false)
        })

        it('should close the menu on scroll', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows.slice(0, 1),
                columns: basicColumns,
                actions: [{ id: 'edit', label: 'Edit' }],
            })
            const table = Test.Table('test')
            await table.Do.clickActionButton()
            expect(table.Get.menu()).toBeInTheDocument()
            fireEvent.scroll(window)
            expect(table.Has.menu()).toBe(false)
        })
    })
})
