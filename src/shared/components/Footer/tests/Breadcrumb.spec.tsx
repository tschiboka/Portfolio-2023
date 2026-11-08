import { screen } from '@testing-library/react'
import { Test } from '@shared-components/Screen/tests'
import { FooterTestUtils } from './Footer.spec.utils'

const { renderBreadcrumb } = FooterTestUtils

describe('Breadcrumb', () => {
    it('should link the house icon home', () => {
        renderBreadcrumb()

        expect(Test.Link('Home').Get.href()).toBe('/')
    })

    it('should render one link per path segment', () => {
        renderBreadcrumb()

        expect(Test.Link('/projects').Get.href()).toBe('/projects')
        expect(Test.Link('/typist').Get.href()).toBe('/projects/typist')
    })

    it('should show the preloaded visit count', () => {
        renderBreadcrumb(true, 42)

        expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('should show a dash when the count is zero', () => {
        renderBreadcrumb(true, 0)

        expect(screen.getByText('-')).toBeInTheDocument()
    })
})
