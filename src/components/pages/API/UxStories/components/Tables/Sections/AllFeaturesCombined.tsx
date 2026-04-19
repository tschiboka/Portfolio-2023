import { Code } from '@common/ux'
import { Code as Snippets } from '../Tables.code'
import { AllFeaturesCombinedDemo } from '../Tables.demos'

export const AllFeaturesCombined = () => (
    <>
        <h2 id="all-features-combined">All Features Combined</h2>
        <p>
            This example brings together every <code>Table</code> feature in a single demo: custom
            cell renderers (uppercase names, status <code>Pill</code>s), a per-cell variant function
            on Status, a row-level variant that greys out inactive users, responsive breakpoints
            hiding columns on smaller screens, default values for empty Note cells, row aria labels,
            a DOM <code>id</code>, multiple-selection checkboxes with non-selectable inactive rows,
            a full action menu with <code>onClick</code>, <code>href</code>, <code>filter</code>,{' '}
            <code>isDisabled</code>, and variant-coloured items, a multi-format download dropdown
            (CSV / PDF), and pagination with a custom page size of 3. Resize the browser to see
            columns collapse into the expand row.
        </p>
        <AllFeaturesCombinedDemo />
        <Code language="tsx" content={Snippets.AllFeaturesCombined.demo} />
    </>
)
