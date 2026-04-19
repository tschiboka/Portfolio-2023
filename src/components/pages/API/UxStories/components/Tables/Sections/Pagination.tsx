import { Code } from '@common/ux'
import { Code as Snippets } from '../Tables.code'
import {
    PaginationDemo,
    CustomPageSizeDemo,
    SmallDatasetPaginationDemo,
    NoTotalItemsDemo,
} from '../Tables.demos'

export const Pagination = () => (
    <>
        <h2 id="pagination">Pagination</h2>
        <p>
            The optional <code>pagination</code> prop adds a footer bar below the table. The table
            itself never slices data — the consumer owns the page state, computes the visible slice,
            and passes it via <code>data</code>. The footer displays an item range on the left, and
            a page-size selector with first / prev / numbered pages / next / last navigation on the
            right. A sliding 5-page window keeps the current page centred.
        </p>
        <section>
            <h3>Basic Pagination</h3>
            <p>
                A dataset of 87 items with the default page size of 10 and default page-size options
                (10, 25, 50, 100). The left side shows "Showing 1–10 of 87". Navigate with the arrow
                buttons or click a page number directly. Changing the page size resets to page 1.
            </p>
            <PaginationDemo />
            <Code language="tsx" content={Snippets.Pagination.basic} />
        </section>
        <section>
            <h3>Custom Page Size Options</h3>
            <p>
                Override <code>pageSizeOptions</code> to offer different choices. This example
                starts at 5 items per page and offers [5, 15, 30]. The page window adjusts
                automatically as the total page count changes.
            </p>
            <CustomPageSizeDemo />
            <Code language="tsx" content={Snippets.Pagination.customPageSize} />
        </section>
        <section>
            <h3>Small Dataset</h3>
            <p>
                When the dataset fits on a single page the navigation buttons are disabled and the
                page window shows just page 1. The footer still renders so layout stays consistent
                across empty / small / large datasets.
            </p>
            <SmallDatasetPaginationDemo />
            <Code language="tsx" content={Snippets.Pagination.smallDataset} />
        </section>
        <section>
            <h3>Without Total Items</h3>
            <p>
                The <code>totalItems</code> prop is optional. When omitted the "Showing x–y of z"
                text is hidden — useful for server-side pagination where the total count may not be
                known. Navigation still works via <code>totalPages</code>.
            </p>
            <NoTotalItemsDemo />
            <Code language="tsx" content={Snippets.Pagination.noTotalItems} />
        </section>
    </>
)
