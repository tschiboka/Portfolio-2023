import { Table } from '@common/ux/Table'
import { Code } from '@common/ux'
import { type Row, rows, type BreakpointRow, breakpointData } from '../Tables.mocks'
import { Code as Snippets } from '../Tables.code'

export const Responsive = () => (
    <>
        <h2 id="responsive">Responsive</h2>
        <p>Responsive column visibility based on viewport breakpoints.</p>
        <section>
            <h3>Breakpoints</h3>
            <p>
                Each column can declare a <code>breakpoint</code> that sets the minimum viewport
                width at which the column becomes visible. On narrower screens the column is hidden
                automatically, allowing the table to remain readable on mobile without horizontal
                scrolling. Resize your browser window to see columns appear and disappear at each
                threshold.
            </p>
            <Table<BreakpointRow>
                title="Breakpoints"
                ariaLabel="Breakpoints reference table"
                data={breakpointData}
                columns={[
                    { header: 'Property', accessor: 'property' },
                    { header: 'xxs', accessor: 'xxs', breakpoint: 'xxs' },
                    { header: 'xs', accessor: 'xs', breakpoint: 'xs' },
                    { header: 'sm', accessor: 'sm', breakpoint: 'sm' },
                    { header: 'mx', accessor: 'mx', breakpoint: 'mx' },
                    { header: 'md', accessor: 'md', breakpoint: 'md' },
                    { header: 'lg', accessor: 'lg', breakpoint: 'lg' },
                    { header: 'xl', accessor: 'xl', breakpoint: 'xl' },
                    { header: 'xxl', accessor: 'xxl', breakpoint: 'xxl' },
                ]}
            />
            <Code language="tsx" content={Snippets.Responsive.breakpoints} />
        </section>
        <section>
            <h3>Accordion</h3>
            <p>
                The <code>accordion</code> breakpoint is a special value that keeps a column
                permanently hidden in the main row, regardless of viewport width. The column data is
                always available in the expandable row instead. This is useful when certain details
                are secondary and should only be revealed on demand via the expand chevron.
            </p>
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
        </section>
    </>
)
