import { useState, useCallback } from 'react'
import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { type Row, rows } from '../Tables.mocks'
import { Code as Snippets } from '../Tables.code'
import { renderStatus } from '../Tables.config'

export const RefreshLoading = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    const handleRefresh = useCallback(() => {
        setIsLoading(true)
        setTimeout(() => {
            setRefreshKey((k) => k + 1)
            setIsLoading(false)
        }, 1500)
    }, [])

    return (
        <>
            <Heading as="h2" id="refresh-loading">
                Refresh &amp; Loading
            </Heading>
            <Paragraph>
                The <CodeText>onRefresh</CodeText> prop adds a refresh button (↻) to the table
                header, next to the filter and download buttons. Clicking it fires the provided
                callback — typically used to refetch data from an API.
            </Paragraph>
            <Paragraph>
                The <CodeText>isLoading</CodeText> prop replaces the table body with animated
                skeleton bars matching the column count and page size, preventing layout shifts when
                data arrives. The skeleton uses <CodeText>table-layout: fixed</CodeText> to keep
                column widths stable between loading and loaded states.
            </Paragraph>
            <Section>
                <Heading as="h3">Refresh with Skeleton</Heading>
                <Paragraph>
                    Click the refresh button (↻) in the header to trigger a 1.5s simulated load. The
                    skeleton bars match the number of columns and the current page size.
                </Paragraph>
                <Table<Row>
                    title={`Refresh & Skeleton (${rows.length} rows)`}
                    key={refreshKey}
                    ariaLabel="Table with refresh and skeleton loading"
                    data={isLoading ? [] : rows}
                    columns={[
                        { header: 'Name', accessor: 'name' },
                        { header: 'Value', accessor: 'value' },
                        { header: 'Status', accessor: 'status', cell: renderStatus },
                    ]}
                    isLoading={isLoading}
                    onRefresh={handleRefresh}
                    emptyState={undefined}
                    pagination={{
                        page: 1,
                        totalPages: 1,
                        pageSize: 5,
                        onPageChange: () => {},
                        onPageSizeChange: () => {},
                    }}
                />
                <Code language="tsx" content={Snippets.RefreshLoading.refresh} />
            </Section>
            <Section>
                <Heading as="h3">isLoading with emptyState</Heading>
                <Paragraph>
                    When <CodeText>isLoading</CodeText> is <CodeText>true</CodeText>, the skeleton
                    takes precedence over <CodeText>emptyState</CodeText>. Once loading finishes and
                    the data is empty, <CodeText>emptyState</CodeText> is shown instead.
                </Paragraph>
                <Code language="tsx" content={Snippets.RefreshLoading.isLoading} />
            </Section>
        </>
    )
}
