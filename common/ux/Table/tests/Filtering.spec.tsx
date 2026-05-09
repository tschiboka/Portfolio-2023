import { Test, Accessor } from '@common/ux/Test'
import { Row } from './Table.spec.types'
import { basicColumns, rows } from './Table.mocks'

describe('Table — Filtering', () => {
    describe('Filter toggle', () => {
        it('renders filter button when filtering is provided', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            expect(table.Get.filterToggle()).toBeInTheDocument()
        })

        it('does not show filter panel initially', () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            expect(table.Has.filterPanel()).toBe(false)
        })

        it('shows filter panel after clicking toggle', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(table.Get.filterPanel()).toBeInTheDocument()
        })

        it('hides filter panel when toggled off', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            await table.Do.toggleFilters()
            expect(table.Has.filterPanel()).toBe(false)
        })

        it('adds active class when filter panel is open', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(table.Get.filterToggle()).toHaveClass('active')
        })
    })

    describe('Text filter input', () => {
        it('renders text input with label', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [
                        {
                            key: 'name',
                            label: 'Name',
                            type: 'text',
                            placeholder: 'Enter name…',
                        },
                    ],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            const input = Accessor.screen.getByLabelText('Name')
            expect(input).toHaveAttribute('type', 'text')
            expect(input).toHaveAttribute('placeholder', 'Enter name…')
        })

        it('calls onFilter with text value on input', async () => {
            const onFilter = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter,
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            await Accessor.user.type(Accessor.screen.getByLabelText('Name'), 'Alpha')
            await table.Do.applyFilters()
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ name: 'Alpha' }))
        })
    })

    describe('Number filter input', () => {
        it('renders number input with min/max', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'min', label: 'Min Value', type: 'number', min: 0, max: 100 }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            const input = Accessor.screen.getByLabelText('Min Value')
            expect(input).toHaveAttribute('type', 'number')
            expect(input).toHaveAttribute('min', '0')
            expect(input).toHaveAttribute('max', '100')
        })

        it('calls onFilter with numeric value', async () => {
            const onFilter = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'min', label: 'Min', type: 'number' }],
                    onFilter,
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            await Accessor.user.type(Accessor.screen.getByLabelText('Min'), '42')
            await table.Do.applyFilters()
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ min: 42 }))
        })
    })

    describe('Search filter input', () => {
        it('renders search input', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'q', label: 'Search', type: 'search', placeholder: 'Search…' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(Accessor.screen.getByLabelText('Search')).toHaveAttribute('type', 'search')
        })
    })

    describe('Date filter input', () => {
        it('renders date input with min/max', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [
                        {
                            key: 'from',
                            label: 'From',
                            type: 'date',
                            min: '2020-01-01',
                            max: '2026-12-31',
                        },
                    ],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            const input = Accessor.screen.getByLabelText('From')
            expect(input).toHaveAttribute('type', 'date')
            expect(input).toHaveAttribute('min', '2020-01-01')
            expect(input).toHaveAttribute('max', '2026-12-31')
        })
    })

    describe('Checkbox filter input', () => {
        it('renders checkbox input', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'active', label: 'Active only', type: 'checkbox' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(Accessor.screen.getByLabelText('Active only')).toHaveAttribute(
                'type',
                'checkbox',
            )
        })

        it('calls onFilter with boolean value', async () => {
            const onFilter = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'active', label: 'Active only', type: 'checkbox' }],
                    onFilter,
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            await Accessor.user.click(Accessor.screen.getByLabelText('Active only'))
            await table.Do.applyFilters()
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ active: true }))
        })

        it('toggles checkbox back to false', async () => {
            const onFilter = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'active', label: 'Active only', type: 'checkbox' }],
                    onFilter,
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            const checkbox = Accessor.screen.getByLabelText('Active only')
            await Accessor.user.click(checkbox)
            await Accessor.user.click(checkbox)
            await table.Do.applyFilters()
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ active: false }))
        })
    })

    describe('Option (select) filter input', () => {
        it('renders dropdown trigger with aria-label', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [
                        {
                            key: 'status',
                            label: 'Status',
                            type: 'option',
                            options: [
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ],
                        },
                    ],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(Accessor.screen.getByRole('button', { name: 'Status' })).toBeInTheDocument()
        })

        it('shows options including "All" when dropdown is opened', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [
                        {
                            key: 'status',
                            label: 'Status',
                            type: 'option',
                            options: [
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ],
                        },
                    ],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            await Accessor.user.click(Accessor.screen.getByRole('button', { name: 'Status' }))
            expect(Accessor.screen.getByRole('option', { name: 'All' })).toBeInTheDocument()
            expect(Accessor.screen.getByRole('option', { name: 'Active' })).toBeInTheDocument()
            expect(Accessor.screen.getByRole('option', { name: 'Inactive' })).toBeInTheDocument()
        })
    })

    describe('Multiple filter inputs combined', () => {
        it('renders all filter inputs in a single panel', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [
                        { key: 'name', label: 'Name', type: 'text' },
                        { key: 'min', label: 'Min', type: 'number' },
                        { key: 'active', label: 'Active', type: 'checkbox' },
                    ],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            expect(Accessor.screen.getByLabelText('Name')).toBeInTheDocument()
            expect(Accessor.screen.getByLabelText('Min')).toBeInTheDocument()
            expect(Accessor.screen.getByLabelText('Active')).toBeInTheDocument()
        })

        it('onFilter receives all current filter values', async () => {
            const onFilter = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [
                        { key: 'name', label: 'Name', type: 'text' },
                        { key: 'active', label: 'Active', type: 'checkbox' },
                    ],
                    onFilter,
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            await Accessor.user.type(Accessor.screen.getByLabelText('Name'), 'X')
            await table.Do.applyFilters()
            // The onFilter receives both keys
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const lastCall = onFilter.mock.calls[onFilter.mock.calls.length - 1][0] as Record<
                string,
                unknown
            >
            expect(lastCall).toHaveProperty('name', 'X')
            expect(lastCall).toHaveProperty('active', false)
        })
    })

    describe('Reset button', () => {
        it('shows Reset button only when filter panel is open', async () => {
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter: vi.fn(),
                },
            })
            const table = Test.Table('test')
            expect(table.Has.resetFilters()).toBe(false)
            await table.Do.toggleFilters()
            expect(table.Get.resetFilters()).toBeInTheDocument()
        })

        it('resets filter values when Reset is clicked', async () => {
            const onFilter = vi.fn()
            Test.Table.Set.mock<Row>({
                ariaLabel: 'test',
                data: rows,
                columns: basicColumns,
                filtering: {
                    inputs: [{ key: 'name', label: 'Name', type: 'text' }],
                    onFilter,
                },
            })
            const table = Test.Table('test')
            await table.Do.toggleFilters()
            await Accessor.user.type(Accessor.screen.getByLabelText('Name'), 'hello')
            await table.Do.resetFilters()
            // After reset, onFilter is called with default values
            expect(onFilter).toHaveBeenLastCalledWith(expect.objectContaining({ name: '' }))
        })
    })
})
