import { Table } from '@common/ux/Table'
import { Code, CodeText, Heading, Paragraph, Section } from '@common/ux'
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
        <Heading as="h2" id="actions">
            Actions
        </Heading>
        <Paragraph>
            Contextual row action menus with click handlers, links, filtering, disabled states, and
            colour variants.
        </Paragraph>
        <Section>
            <Heading as="h3">Actions Overview</Heading>
            <Paragraph>
                Rows can have a contextual action menu triggered by a vertical ellipsis button.
                Below is a summary of all available action features:
            </Paragraph>
            <Table<ActionRow>
                title="Action Features"
                ariaLabel="Action features overview"
                data={actionRows}
                columns={[
                    { header: 'Name', accessor: 'name' },
                    { header: 'Function', accessor: 'function' },
                ]}
            />
        </Section>
        <Section>
            <Heading as="h3">isActionDisabled</Heading>
            <Paragraph>
                Columns can define <CodeText>isActionDisabled</CodeText> to disable the entire
                action menu for a row based on its data. The disabled row has the kebab button
                greyed out.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">onClick</Heading>
            <Paragraph>
                An action with an <CodeText>onClick</CodeText> handler. Clicking the action triggers
                a callback that receives the row meta.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">href</Heading>
            <Paragraph>
                An action with an <CodeText>href</CodeText> function. The action navigates to a URL
                computed from the row data.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">filter</Heading>
            <Paragraph>
                An action with a <CodeText>filter</CodeText> function. The action is hidden from the
                menu for rows that don&apos;t match the condition. When all actions are filtered out
                the menu button is disabled.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">isDisabled</Heading>
            <Paragraph>
                An action with <CodeText>isDisabled</CodeText>. The action stays visible but is
                greyed out and unclickable for the matching row.
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">Variants</Heading>
            <Paragraph>
                Actions support colour variants: <CodeText>primary</CodeText> (accent),{' '}
                <CodeText>secondary</CodeText> (dark accent), <CodeText>danger</CodeText> (error),
                and the default (neutral).
            </Paragraph>
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
        </Section>
        <Section>
            <Heading as="h3">All Actions Combined</Heading>
            <Paragraph>
                A table combining all action features: <CodeText>onClick</CodeText>,{' '}
                <CodeText>href</CodeText>, <CodeText>filter</CodeText>,{' '}
                <CodeText>isDisabled</CodeText>, and variants in a single action menu.
            </Paragraph>
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
        </Section>
    </>
)
