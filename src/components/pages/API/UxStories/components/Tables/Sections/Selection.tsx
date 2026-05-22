import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { Code as Snippets } from '../Tables.code'
import {
    MultipleSelectionDemo,
    SingleSelectionDemo,
    SelectableDemo,
    SelectionWithActionsDemo,
} from '../Tables.demos'

export const Selection = () => (
    <>
        <Heading as="h2" id="selection">
            Selection
        </Heading>
        <Paragraph>
            The <CodeText>selection</CodeText> prop adds a checkbox column to the table for row
            selection. It supports single and multiple selection modes, controlled state via{' '}
            <CodeText>selectedRowIds</CodeText> / <CodeText>onChange</CodeText>, per-row
            selectability, and a select-all header checkbox.
        </Paragraph>
        <Section>
            <Heading as="h3">Multiple Selection</Heading>
            <Paragraph>
                The default mode. A checkbox appears in every row and a select-all checkbox renders
                in the header. Ticking individual rows adds their id to the{' '}
                <CodeText>selectedRowIds</CodeText> set; the header checkbox toggles all selectable
                rows at once and is only checked when every selectable row is selected.
            </Paragraph>
            <MultipleSelectionDemo />
            <Code language="tsx" content={Snippets.Selection.multiple} />
        </Section>
        <Section>
            <Heading as="h3">Single Selection</Heading>
            <Paragraph>
                Set <CodeText>mode=&quot;single&quot;</CodeText> to allow only one row to be
                selected at a time. The header checkbox is hidden and selecting a new row
                automatically deselects the previous one.
            </Paragraph>
            <SingleSelectionDemo />
            <Code language="tsx" content={Snippets.Selection.single} />
        </Section>
        <Section>
            <Heading as="h3">isRowSelectable</Heading>
            <Paragraph>
                The <CodeText>isRowSelectable</CodeText> callback receives the row meta and returns
                whether that row can be checked. Disabled checkboxes are greyed out and excluded
                from select-all. Below, rows with an &quot;inactive&quot; status cannot be selected.
            </Paragraph>
            <SelectableDemo />
            <Code language="tsx" content={Snippets.Selection.isRowSelectable} />
        </Section>
        <Section>
            <Heading as="h3">Selection with Actions</Heading>
            <Paragraph>
                Selection and actions work side by side. The checkbox column sits after the expand
                chevron and before data columns, while the action menu stays at the far right. Both
                features share the same row meta.
            </Paragraph>
            <SelectionWithActionsDemo />
            <Code language="tsx" content={Snippets.Selection.withActions} />
        </Section>
    </>
)
