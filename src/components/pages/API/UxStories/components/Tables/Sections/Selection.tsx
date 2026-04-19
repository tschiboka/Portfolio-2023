import { Code } from '@common/ux'
import { Code as Snippets } from '../Tables.code'
import {
    MultipleSelectionDemo,
    SingleSelectionDemo,
    SelectableDemo,
    SelectionWithActionsDemo,
} from '../Tables.demos'

export const Selection = () => (
    <>
        <h2 id="selection">Selection</h2>
        <p>
            The <code>selection</code> prop adds a checkbox column to the table for row selection.
            It supports single and multiple selection modes, controlled state via{' '}
            <code>selectedRowIds</code> / <code>onChange</code>, per-row selectability, and a
            select-all header checkbox.
        </p>
        <section>
            <h3>Multiple Selection</h3>
            <p>
                The default mode. A checkbox appears in every row and a select-all checkbox renders
                in the header. Ticking individual rows adds their id to the{' '}
                <code>selectedRowIds</code> set; the header checkbox toggles all selectable rows at
                once and is only checked when every selectable row is selected.
            </p>
            <MultipleSelectionDemo />
            <Code language="tsx" content={Snippets.Selection.multiple} />
        </section>
        <section>
            <h3>Single Selection</h3>
            <p>
                Set <code>mode=&quot;single&quot;</code> to allow only one row to be selected at a
                time. The header checkbox is hidden and selecting a new row automatically deselects
                the previous one.
            </p>
            <SingleSelectionDemo />
            <Code language="tsx" content={Snippets.Selection.single} />
        </section>
        <section>
            <h3>isRowSelectable</h3>
            <p>
                The <code>isRowSelectable</code> callback receives the row meta and returns whether
                that row can be checked. Disabled checkboxes are greyed out and excluded from
                select-all. Below, rows with an &quot;inactive&quot; status cannot be selected.
            </p>
            <SelectableDemo />
            <Code language="tsx" content={Snippets.Selection.isRowSelectable} />
        </section>
        <section>
            <h3>Selection with Actions</h3>
            <p>
                Selection and actions work side by side. The checkbox column sits after the expand
                chevron and before data columns, while the action menu stays at the far right. Both
                features share the same row meta.
            </p>
            <SelectionWithActionsDemo />
            <Code language="tsx" content={Snippets.Selection.withActions} />
        </section>
    </>
)
