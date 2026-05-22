import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
import { Code as Snippets } from '../Tables.code'
import {
    PaginationDemo,
    CustomPageSizeDemo,
    SmallDatasetPaginationDemo,
    NoTotalItemsDemo,
} from '../Tables.demos'

export const Pagination = () => (
    <>
        <Heading as="h2" id="pagination">
            Pagination
        </Heading>
        <Paragraph>
            The optional <CodeText>pagination</CodeText> prop adds a footer bar below the table. The
            table itself never slices data — the consumer owns the page state, computes the visible
            slice, and passes it via <CodeText>data</CodeText>. The footer displays an item range on
            the left, and a page-size selector with first / prev / numbered pages / next / last
            navigation on the right. A sliding 5-page window keeps the current page centred.
        </Paragraph>
        <Section>
            <Heading as="h3">Basic Pagination</Heading>
            <Paragraph>
                A dataset of 87 items with the default page size of 10 and default page-size options
                (10, 25, 50, 100). The left side shows "Showing 1–10 of 87". Navigate with the arrow
                buttons or click a page number directly. Changing the page size resets to page 1.
            </Paragraph>
            <PaginationDemo />
            <Code language="tsx" content={Snippets.Pagination.basic} />
        </Section>
        <Section>
            <Heading as="h3">Custom Page Size Options</Heading>
            <Paragraph>
                Override <CodeText>pageSizeOptions</CodeText> to offer different choices. This
                example starts at 5 items per page and offers [5, 15, 30]. The page window adjusts
                automatically as the total page count changes.
            </Paragraph>
            <CustomPageSizeDemo />
            <Code language="tsx" content={Snippets.Pagination.customPageSize} />
        </Section>
        <Section>
            <Heading as="h3">Small Dataset</Heading>
            <Paragraph>
                When the dataset fits on a single page the navigation buttons are disabled and the
                page window shows just page 1. The footer still renders so layout stays consistent
                across empty / small / large datasets.
            </Paragraph>
            <SmallDatasetPaginationDemo />
            <Code language="tsx" content={Snippets.Pagination.smallDataset} />
        </Section>
        <Section>
            <Heading as="h3">Without Total Items</Heading>
            <Paragraph>
                The <CodeText>totalItems</CodeText> prop is optional. When omitted the "Showing x–y
                of z" text is hidden — useful for server-side pagination where the total count may
                not be known. Navigation still works via <CodeText>totalPages</CodeText>.
            </Paragraph>
            <NoTotalItemsDemo />
            <Code language="tsx" content={Snippets.Pagination.noTotalItems} />
        </Section>
    </>
)
