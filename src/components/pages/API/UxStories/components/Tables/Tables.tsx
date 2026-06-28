import { CodeText, Heading, Main, Paragraph } from '@common/ux'
import { Screen } from '../../../../../sharedComponents/Screen/Screen'
import { PageSideMenu } from '../../../../../sharedComponents/PageSideMenu/PageSideMenu'
import { StoryNav } from '../StoryNav/StoryNav'
import {
    Fundamentals,
    Controller,
    Filtering,
    CellRenderingDefaults,
    Responsive,
    Variants,
    Actions,
    Selection,
    Pagination,
    Sorting,
    Download,
    RefreshLoading,
    ColumnCustomization,
    Accessibility,
    AllFeaturesCombined,
} from './Sections'

type TablesProps = {
    path: string
}

export const Tables = ({ path }: TablesProps) => (
    <Screen
        title={'Tivadar Debnar | Tables'}
        path={path}
        variant="api"
        pageName="Projects"
        sideMenu={<PageSideMenu />}
        hasContentNavigator
    >
        <Main>
            <StoryNav />
            <Heading as="h1">Tables</Heading>
            <Paragraph>
                The <CodeText>Table</CodeText> component renders data in a structured grid with
                support for custom cell renderers, breakpoints, default values, context passing, and
                accessibility props.
            </Paragraph>
            <Fundamentals />
            <Controller />
            <Filtering />
            <CellRenderingDefaults />
            <Responsive />
            <Variants />
            <Actions />
            <Selection />
            <Pagination />
            <Sorting />
            <Download />
            <RefreshLoading />
            <ColumnCustomization />
            <Accessibility />
            <AllFeaturesCombined />
        </Main>
    </Screen>
)
