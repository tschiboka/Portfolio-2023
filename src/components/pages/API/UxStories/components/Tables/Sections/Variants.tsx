import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { type VariantRow, variantRows } from '../Tables.mocks'
import { cellVariantFn, rowVariantFn } from '../Tables.config'
import { Code as Snippets } from '../Tables.code'

export const Variants = () => (
    <>
        <Heading as="h2" id="variants">
            Variants
        </Heading>
        <Paragraph>
            Colour variants at the column, row, and cell level with configurable priority
            resolution.
        </Paragraph>
        <Section>
            <Heading as="h3">Column Variants — Static</Heading>
            <Paragraph>
                Each column can specify a static <CodeText>variant</CodeText> to colour all its
                cells uniformly. Use <CodeText>primary</CodeText> to draw attention to key data,{' '}
                <CodeText>secondary</CodeText> for supporting values, <CodeText>danger</CodeText>{' '}
                for warnings or destructive content, and <CodeText>disabled</CodeText> to visually
                de-emphasise inactive entries. Columns without a variant keep the default inherited
                text colour.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">Row Variants</Heading>
            <Paragraph>
                The <CodeText>rowVariant</CodeText> prop accepts a function that receives the row
                meta and returns a variant. Every cell in the row inherits the colour unless
                overridden by a column-level or cell-level variant. In this example each status maps
                to a matching variant: <CodeText>active</CodeText> → <CodeText>primary</CodeText>,{' '}
                <CodeText>pending</CodeText> → <CodeText>secondary</CodeText>,{' '}
                <CodeText>error</CodeText> → <CodeText>danger</CodeText>, and{' '}
                <CodeText>inactive</CodeText> → <CodeText>disabled</CodeText>.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">Cell Variants — Dynamic</Heading>
            <Paragraph>
                A column&apos;s <CodeText>variant</CodeText> can also be a function that receives
                the cell value and meta, returning a variant per cell. This gives fine-grained
                control — here the Description column colours each cell based on the row&apos;s{' '}
                <CodeText>status</CodeText> field while the Label column stays default.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">Variant Priority</Heading>
            <Paragraph>
                When multiple variant sources overlap, the priority is:{' '}
                <strong>cell function &gt; static column &gt; row variant</strong>. Below, the Label
                column has a static <CodeText>secondary</CodeText> variant, the Description column
                uses a cell function, and the table sets a <CodeText>rowVariant</CodeText>. Notice
                how the Status column (no column variant) falls back to the row variant, while Label
                stays <CodeText>secondary</CodeText> and Description uses its cell function.
            </Paragraph>
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
        </Section>
    </>
)
