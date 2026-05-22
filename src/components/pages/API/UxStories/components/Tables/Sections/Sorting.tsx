import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { Code as Snippets } from '../Tables.code'
import {
    BasicSortingDemo,
    MixedSortableDemo,
    SortingWithSelectionDemo,
    SortingWithPaginationDemo,
} from '../Tables.demos'

export const Sorting = () => (
    <>
        <Heading as="h2" id="sorting">
            Sorting
        </Heading>
        <Paragraph>
            The optional <CodeText>sorting</CodeText> prop enables column-header sorting controls.
            Sorting is <strong>externally controlled</strong> — the <CodeText>Table</CodeText>{' '}
            component never reorders data internally. The consumer owns the sort state (
            <CodeText>column</CodeText> and <CodeText>direction</CodeText>), handles the{' '}
            <CodeText>onSortChange</CodeText> callback, sorts the data array, and passes the result
            back via <CodeText>data</CodeText>. Each column opts in individually by setting{' '}
            <CodeText>isSortable: true</CodeText>. Sortable headers render as{' '}
            <CodeText>&lt;button&gt;</CodeText> elements with an animated arrow icon. Clicking a
            column that is not currently sorted activates it in ascending order; clicking the active
            ascending column toggles it to descending. The active column header highlights in the
            accent colour and the corresponding arrow becomes solid. An{' '}
            <CodeText>aria-sort</CodeText> attribute on the <CodeText>&lt;th&gt;</CodeText> and an{' '}
            <CodeText>aria-label</CodeText> on each button ensure full screen-reader support.
        </Paragraph>
        <Section>
            <Heading as="h3">Basic Sorting</Heading>
            <Paragraph>
                The simplest sorting setup. All data columns are marked{' '}
                <CodeText>isSortable: true</CodeText> while the Status column is left non-sortable.
                Click any sortable header to sort ascending; click again to reverse to descending.
                Clicking a different column resets the direction to ascending. The consumer sorts
                the data with a plain <CodeText>Array.sort</CodeText> comparator and passes the
                result to <CodeText>data</CodeText>.
            </Paragraph>
            <BasicSortingDemo />
            <Code language="tsx" content={Snippets.Sorting.basic} />
        </Section>
        <Section>
            <Heading as="h3">Mixed Sortable Columns</Heading>
            <Paragraph>
                Not every column needs to be sortable. Here only Name and Score have{' '}
                <CodeText>isSortable: true</CodeText>. The Age and Status headers render as plain
                text without a sort button or arrow icon. This is useful when certain columns
                contain non-orderable content like action labels or status badges.
            </Paragraph>
            <MixedSortableDemo />
            <Code language="tsx" content={Snippets.Sorting.mixedSortable} />
        </Section>
        <Section>
            <Heading as="h3">Sorting with Selection</Heading>
            <Paragraph>
                Sorting and selection work side by side. The checkbox column is unaffected by sort
                order — selected row IDs are tracked by value (here the <CodeText>name</CodeText>{' '}
                field), so selections persist even when rows move position after a re-sort. Try
                selecting a few rows, then click a header to re-sort and confirm the checkboxes
                follow the data.
            </Paragraph>
            <SortingWithSelectionDemo />
            <Code language="tsx" content={Snippets.Sorting.withSelection} />
        </Section>
        <Section>
            <Heading as="h3">Sorting with Pagination</Heading>
            <Paragraph>
                When combining sorting with pagination, sort the full dataset first, then slice the
                current page from the sorted result. The demo below resets to page 1 whenever the
                sort column or direction changes, ensuring the user always sees the top of the newly
                sorted list. The consumer handles this in the <CodeText>onSortChange</CodeText>{' '}
                callback by calling <CodeText>setPage(1)</CodeText> alongside the sort state update.
            </Paragraph>
            <SortingWithPaginationDemo />
            <Code language="tsx" content={Snippets.Sorting.withPagination} />
        </Section>
    </>
)
