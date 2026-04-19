import { Table } from '@common/ux/Table'
import { Code } from '@common/ux'
import { type VariantRow, variantRows } from '../Tables.mocks'
import { cellVariantFn, rowVariantFn } from '../Tables.config'
import { Code as Snippets } from '../Tables.code'

export const Variants = () => (
    <>
        <h2 id="variants">Variants</h2>
        <p>
            Colour variants at the column, row, and cell level with configurable priority
            resolution.
        </p>
        <section>
            <h3>Column Variants — Static</h3>
            <p>
                Each column can specify a static <code>variant</code> to colour all its cells
                uniformly. Use <code>primary</code> to draw attention to key data,{' '}
                <code>secondary</code> for supporting values, <code>danger</code> for warnings or
                destructive content, and <code>disabled</code> to visually de-emphasise inactive
                entries. Columns without a variant keep the default inherited text colour.
            </p>
            <Table<VariantRow>
                title="Column Variants — Static"
                ariaLabel="Table demonstrating static column colour variants"
                data={variantRows}
                columns={[
                    { header: 'Default', accessor: 'label' },
                    { header: 'Primary', accessor: 'label', variant: 'primary' },
                    { header: 'Secondary', accessor: 'label', variant: 'secondary' },
                    { header: 'Danger', accessor: 'label', variant: 'danger' },
                    { header: 'Disabled', accessor: 'label', variant: 'disabled' },
                ]}
            />
            <Code language="tsx" content={Snippets.Variants.columnStatic} />
        </section>
        <section>
            <h3>Row Variants</h3>
            <p>
                The <code>rowVariant</code> prop accepts a function that receives the row meta and
                returns a variant. Every cell in the row inherits the colour unless overridden by a
                column-level or cell-level variant. In this example rows with an <code>error</code>{' '}
                status turn <code>danger</code> and <code>inactive</code> rows turn{' '}
                <code>disabled</code>.
            </p>
            <Table<VariantRow>
                title="Row Variants"
                ariaLabel="Table demonstrating row-level variants"
                data={variantRows}
                rowVariant={rowVariantFn}
                columns={[
                    { header: 'Label', accessor: 'label' },
                    { header: 'Status', accessor: 'status' },
                    { header: 'Description', accessor: 'description' },
                ]}
            />
            <Code language="tsx" content={Snippets.Variants.rowVariants} />
        </section>
        <section>
            <h3>Cell Variants — Dynamic</h3>
            <p>
                A column&apos;s <code>variant</code> can also be a function that receives the cell
                value and meta, returning a variant per cell. This gives fine-grained control — here
                the Description column colours each cell based on the row&apos;s <code>status</code>{' '}
                field while the Label column stays default.
            </p>
            <Table<VariantRow>
                title="Cell Variants — Dynamic"
                ariaLabel="Table demonstrating per-cell dynamic variants"
                data={variantRows}
                columns={[
                    { header: 'Label', accessor: 'label' },
                    { header: 'Status', accessor: 'status' },
                    {
                        header: 'Description',
                        accessor: 'description',
                        variant: cellVariantFn,
                    },
                ]}
            />
            <Code language="tsx" content={Snippets.Variants.cellDynamic} />
        </section>
        <section>
            <h3>Variant Priority</h3>
            <p>
                When multiple variant sources overlap, the priority is:{' '}
                <strong>cell function &gt; static column &gt; row variant</strong>. Below, the Label
                column has a static <code>secondary</code> variant, the Description column uses a
                cell function, and the table sets a <code>rowVariant</code>. Notice how the Status
                column (no column variant) falls back to the row variant, while Label stays{' '}
                <code>secondary</code> and Description uses its cell function.
            </p>
            <Table<VariantRow>
                title="Variant Priority"
                ariaLabel="Table demonstrating variant priority resolution"
                data={variantRows}
                rowVariant={rowVariantFn}
                columns={[
                    { header: 'Label', accessor: 'label', variant: 'secondary' },
                    { header: 'Status', accessor: 'status' },
                    {
                        header: 'Description',
                        accessor: 'description',
                        variant: cellVariantFn,
                    },
                ]}
            />
            <Code language="tsx" content={Snippets.Variants.priority} />
        </section>
    </>
)
