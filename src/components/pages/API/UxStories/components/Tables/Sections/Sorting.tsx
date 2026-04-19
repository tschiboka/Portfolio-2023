import { Code } from '@common/ux'
import { Code as Snippets } from '../Tables.code'
import {
    BasicSortingDemo,
    MixedSortableDemo,
    SortingWithSelectionDemo,
    SortingWithPaginationDemo,
} from '../Tables.demos'

export const Sorting = () => (
    <>
        <h2 id="sorting">Sorting</h2>
        <p>
            The optional <code>sorting</code> prop enables column-header sorting controls. Sorting
            is <strong>externally controlled</strong> — the <code>Table</code> component never
            reorders data internally. The consumer owns the sort state (<code>column</code> and{' '}
            <code>direction</code>), handles the <code>onSortChange</code> callback, sorts the data
            array, and passes the result back via <code>data</code>. Each column opts in
            individually by setting <code>isSortable: true</code>. Sortable headers render as{' '}
            <code>&lt;button&gt;</code> elements with an animated arrow icon. Clicking a column that
            is not currently sorted activates it in ascending order; clicking the active ascending
            column toggles it to descending. The active column header highlights in the accent
            colour and the corresponding arrow becomes solid. An <code>aria-sort</code> attribute on
            the <code>&lt;th&gt;</code> and an <code>aria-label</code> on each button ensure full
            screen-reader support.
        </p>
        <section>
            <h3>Basic Sorting</h3>
            <p>
                The simplest sorting setup. All data columns are marked{' '}
                <code>isSortable: true</code> while the Status column is left non-sortable. Click
                any sortable header to sort ascending; click again to reverse to descending.
                Clicking a different column resets the direction to ascending. The consumer sorts
                the data with a plain <code>Array.sort</code> comparator and passes the result to{' '}
                <code>data</code>.
            </p>
            <BasicSortingDemo />
            <Code language="tsx" content={Snippets.Sorting.basic} />
        </section>
        <section>
            <h3>Mixed Sortable Columns</h3>
            <p>
                Not every column needs to be sortable. Here only Name and Score have{' '}
                <code>isSortable: true</code>. The Age and Status headers render as plain text
                without a sort button or arrow icon. This is useful when certain columns contain
                non-orderable content like action labels or status badges.
            </p>
            <MixedSortableDemo />
            <Code language="tsx" content={Snippets.Sorting.mixedSortable} />
        </section>
        <section>
            <h3>Sorting with Selection</h3>
            <p>
                Sorting and selection work side by side. The checkbox column is unaffected by sort
                order — selected row IDs are tracked by value (here the <code>name</code> field), so
                selections persist even when rows move position after a re-sort. Try selecting a few
                rows, then click a header to re-sort and confirm the checkboxes follow the data.
            </p>
            <SortingWithSelectionDemo />
            <Code language="tsx" content={Snippets.Sorting.withSelection} />
        </section>
        <section>
            <h3>Sorting with Pagination</h3>
            <p>
                When combining sorting with pagination, sort the full dataset first, then slice the
                current page from the sorted result. The demo below resets to page 1 whenever the
                sort column or direction changes, ensuring the user always sees the top of the newly
                sorted list. The consumer handles this in the <code>onSortChange</code> callback by
                calling <code>setPage(1)</code> alongside the sort state update.
            </p>
            <SortingWithPaginationDemo />
            <Code language="tsx" content={Snippets.Sorting.withPagination} />
        </section>
    </>
)
