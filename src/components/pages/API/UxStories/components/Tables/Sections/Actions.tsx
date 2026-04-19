import { Table } from '@common/ux/Table'
import { Code } from '@common/ux'
import {
    type Row,
    rows,
    type ActionRow,
    actionRows,
    isActionDisabledData,
    onClickData,
    hrefData,
    filterData,
    isDisabledData,
    variantData,
} from '../Tables.mocks'
import {
    clickAction,
    hrefAction,
    filterAction,
    disabledItemAction,
    variantActions,
    allActions,
} from '../Tables.config'
import { Code as Snippets } from '../Tables.code'

export const Actions = () => (
    <>
        <h2 id="actions">Actions</h2>
        <p>
            Contextual row action menus with click handlers, links, filtering, disabled states, and
            colour variants.
        </p>
        <section>
            <h3>Actions Overview</h3>
            <p>
                Rows can have a contextual action menu triggered by a vertical ellipsis button.
                Below is a summary of all available action features:
            </p>
            <Table<ActionRow>
                title="Action Features"
                ariaLabel="Action features overview"
                data={actionRows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Function', accessor: 'function' },
                ]}
            />
        </section>
        <section>
            <h3>isActionDisabled</h3>
            <p>
                Columns can define <code>isActionDisabled</code> to disable the entire action menu
                for a row based on its data. The disabled row has the kebab button greyed out.
            </p>
            <Table<ActionRow>
                title="isActionDisabled"
                ariaLabel="Table with disabled action menu"
                data={isActionDisabledData}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    {
                        header: 'Function',
                        accessor: 'function',
                        isActionDisabled: ({ row }) => row.name === 'Disabled row',
                    },
                ]}
                actions={clickAction}
            />
            <Code language="tsx" content={Snippets.Actions.isActionDisabled} />
        </section>
        <section>
            <h3>onClick</h3>
            <p>
                An action with an <code>onClick</code> handler. Clicking the action triggers a
                callback that receives the row meta.
            </p>
            <Table<ActionRow>
                title="onClick"
                ariaLabel="Table with onClick action"
                data={onClickData}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Function', accessor: 'function' },
                ]}
                actions={clickAction}
            />
            <Code language="tsx" content={Snippets.Actions.onClick} />
        </section>
        <section>
            <h3>href</h3>
            <p>
                An action with an <code>href</code> function. The action navigates to a URL computed
                from the row data.
            </p>
            <Table<ActionRow>
                title="href"
                ariaLabel="Table with href action"
                data={hrefData}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Function', accessor: 'function' },
                ]}
                actions={hrefAction}
            />
            <Code language="tsx" content={Snippets.Actions.href} />
        </section>
        <section>
            <h3>filter</h3>
            <p>
                An action with a <code>filter</code> function. The action is hidden entirely for the
                row that doesn't match the condition.
            </p>
            <Table<ActionRow>
                title="filter"
                ariaLabel="Table with filtered action"
                data={filterData}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Function', accessor: 'function' },
                ]}
                actions={filterAction}
            />
            <Code language="tsx" content={Snippets.Actions.filter} />
        </section>
        <section>
            <h3>isDisabled</h3>
            <p>
                An action with <code>isDisabled</code>. The action stays visible but is greyed out
                and unclickable for the matching row.
            </p>
            <Table<ActionRow>
                title="isDisabled"
                ariaLabel="Table with disabled action item"
                data={isDisabledData}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Function', accessor: 'function' },
                ]}
                actions={disabledItemAction}
            />
            <Code language="tsx" content={Snippets.Actions.isDisabled} />
        </section>
        <section>
            <h3>Variants</h3>
            <p>
                Actions support colour variants: <code>primary</code> (accent),{' '}
                <code>secondary</code> (dark accent), <code>danger</code> (error), and the default
                (neutral).
            </p>
            <Table<ActionRow>
                title="Variants"
                ariaLabel="Table with action variants"
                data={variantData}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Function', accessor: 'function' },
                ]}
                actions={variantActions}
            />
            <Code language="tsx" content={Snippets.Actions.variants} />
        </section>
        <section>
            <h3>All Actions Combined</h3>
            <p>
                A table combining all action features: <code>onClick</code>, <code>href</code>,{' '}
                <code>filter</code>, <code>isDisabled</code>, and variants in a single action menu.
            </p>
            <Table<Row>
                title="All Actions Combined"
                ariaLabel="Table with all action features"
                data={rows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Status', accessor: 'status' },
                ]}
                actions={allActions}
            />
            <Code language="tsx" content={Snippets.Actions.allCombined} />
        </section>
    </>
)
