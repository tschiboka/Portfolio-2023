import { Code, CodeText, Heading, Paragraph } from '@common/ux'
import { Code as Snippets } from '../Tables.code'
import { AllFeaturesCombinedDemo } from '../Tables.demos'

export const AllFeaturesCombined = () => (
    <>
        <Heading as="h2" id="all-features-combined">
            All Features Combined
        </Heading>
        <Paragraph>
            This example brings together every <CodeText>Table</CodeText> feature in a single demo:
            custom cell renderers (uppercase names, status <CodeText>Pill</CodeText>s), a per-cell
            variant function on Status, a row-level variant that greys out inactive users,
            responsive breakpoints hiding columns on smaller screens, default values for empty Note
            cells, row aria labels, a DOM <CodeText>id</CodeText>, multiple-selection checkboxes
            with non-selectable inactive rows, a full action menu with <CodeText>onClick</CodeText>,{' '}
            <CodeText>href</CodeText>, <CodeText>filter</CodeText>, <CodeText>isDisabled</CodeText>,
            and variant-coloured items, a multi-format download dropdown (CSV / PDF), and pagination
            with a custom page size of 3. Resize the browser to see columns collapse into the expand
            row.
        </Paragraph>
        <AllFeaturesCombinedDemo />
        <Code language="tsx" content={Snippets.AllFeaturesCombined.demo} />
    </>
)
