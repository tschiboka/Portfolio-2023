import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { type Row, rows, type BreakpointRow, breakpointData } from '../Tables.mocks'
import { Code as Snippets } from '../Tables.code'

export const Responsive = () => (
    <>
        <Heading as="h2" id="responsive">
            Responsive
        </Heading>
        <Paragraph>Responsive column visibility based on viewport breakpoints.</Paragraph>
        <Section>
            <Heading as="h3">Breakpoints</Heading>
            <Paragraph>
                Each column can declare a <CodeText>breakpoint</CodeText> that sets the minimum
                viewport width at which the column becomes visible. On narrower screens the column
                is hidden automatically, allowing the table to remain readable on mobile without
                horizontal scrolling. Resize your browser window to see columns appear and disappear
                at each threshold.
            </Paragraph>
            <Table<BreakpointRow>
                title="Breakpoints"
                ariaLabel="Breakpoints reference table"
                data={breakpointData}
                columns={[
                    { header: 'Property', accessor: 'property' },
                    { header: '2xs', accessor: '2xs', breakpoint: '2xs' },
                    { header: 'xs', accessor: 'xs', breakpoint: 'xs' },
                    { header: 'sm', accessor: 'sm', breakpoint: 'sm' },
                    { header: 'mx', accessor: 'mx', breakpoint: 'mx' },
                    { header: 'md', accessor: 'md', breakpoint: 'md' },
                    { header: 'lg', accessor: 'lg', breakpoint: 'lg' },
                    { header: 'xl', accessor: 'xl', breakpoint: 'xl' },
                    { header: '2xl', accessor: '2xl', breakpoint: '2xl' },
                ]}
            />
            <Code language="tsx" content={Snippets.Responsive.breakpoints} />
        </Section>
        <Section>
            <Heading as="h3">Accordion</Heading>
            <Paragraph>
                The <CodeText>accordion</CodeText> breakpoint is a special value that keeps a column
                permanently hidden in the main row, regardless of viewport width. The column data is
                always available in the expandable row instead. This is useful when certain details
                are secondary and should only be revealed on demand via the expand chevron.
            </Paragraph>
            <Table<Row>
                title="Accordion breakpoint"
                ariaLabel="Accordion breakpoint demo table"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Value', accessor: 'value' },
                    { header: 'Status', accessor: 'status', breakpoint: 'accordion' },
                    { header: 'Note', accessor: 'note', breakpoint: 'accordion' },
                ]}
            />
            <Code language="tsx" content={Snippets.Responsive.accordion} />
        </Section>
    </>
)
