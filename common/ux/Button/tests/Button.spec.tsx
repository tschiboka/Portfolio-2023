import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Button } from '../Button'
import { Set } from './Button.spec.utils'

describe('Button', () => {
    describe('as button (default)', () => {
        it('should render a button element', () => {
            const button = Set.button()
            expect(button.Get.tagName()).toBe('BUTTON')
        })

        it('should render children', () => {
            const button = Set.button({ children: 'Submit' })
            expect(button.Get.textContent()).toBe('Submit')
        })

        it('should default to type="button"', () => {
            const button = Set.button()
            expect(button.Get.attribute('type')).toBe('button')
        })

        it('should apply type="submit"', () => {
            const button = Set.button({ type: 'submit' })
            expect(button.Get.attribute('type')).toBe('submit')
        })

        it('should apply primary variant by default', () => {
            const button = Set.button()
            expect(button.Get.className()).toContain('btn')
            expect(button.Get.className()).not.toContain('secondary')
        })

        it('should apply secondary variant', () => {
            const button = Set.button({ variant: 'secondary' })
            expect(button.Get.className()).toContain('secondary')
        })

        it('should apply disabled state', () => {
            const button = Set.button({ disabled: true })
            expect(button.Get.isDisabled()).toBe(true)
        })

        it('should not be disabled by default', () => {
            const button = Set.button()
            expect(button.Get.isDisabled()).toBe(false)
        })

        it('should call onClick when clicked', async () => {
            const onClick = vi.fn()
            const button = Set.button({ onClick })
            await button.Do.click()
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('should apply ariaLabel', () => {
            const button = Set.button({ ariaLabel: 'Save changes' })
            expect(button.Get.attribute('aria-label')).toBe('Save changes')
        })

        it('should apply className', () => {
            const button = Set.button({ className: 'extra' })
            expect(button.Get.className()).toContain('extra')
        })

        it('should apply custom style', () => {
            const button = Set.button({ style: { margin: '10px' } })
            expect(button.Get.style().margin).toBe('10px')
        })

        it('should default to md size', () => {
            const button = Set.button()
            expect(button.Get.size()).toBe('md')
            expect(button.Get.className()).toContain('standalone-btn')
        })

        it('should apply sm size', () => {
            const button = Set.button({ size: 'sm' })
            expect(button.Get.size()).toBe('sm')
            expect(button.Get.className()).toContain('btn--sm')
            expect(button.Get.className()).not.toContain('standalone-btn')
        })
    })

    describe('as anchor', () => {
        it('should render an anchor element', () => {
            const link = Set.link()
            expect(link.Get.tagName()).toBe('A')
        })

        it('should apply href', () => {
            const link = Set.link({ href: 'https://example.com' })
            expect(link.Get.href()).toContain('https://example.com')
        })

        it('should apply download attribute', () => {
            const link = Set.link({ href: '/file.pdf', download: true })
            expect(link.Get.hasDownload()).toBe(true)
        })

        it('should not have download by default', () => {
            const link = Set.link()
            expect(link.Get.hasDownload()).toBe(false)
        })

        it('should apply target', () => {
            const link = Set.link({ target: '_blank' })
            expect(link.Get.target()).toBe('_blank')
        })

        it('should apply rel', () => {
            const link = Set.link({ rel: 'noopener noreferrer' })
            expect(link.Get.rel()).toBe('noopener noreferrer')
        })

        it('should apply secondary variant', () => {
            const link = Set.link({ variant: 'secondary' })
            expect(link.Get.className()).toContain('secondary')
        })

        it('should apply ariaLabel', () => {
            const link = Set.link({ ariaLabel: 'Download CV' })
            expect(link.Get.attribute('aria-label')).toBe('Download CV')
        })

        it('should render children', () => {
            const link = Set.link({ children: 'Go somewhere' })
            expect(link.Get.textContent()).toBe('Go somewhere')
        })
    })

    describe('as custom component', () => {
        it('should render using a custom component', () => {
            const CustomLink = (props: Record<string, unknown>) => (
                <a data-testid="custom" {...props} />
            )
            render(
                <Button as={CustomLink} to="/page" ariaLabel="Custom">
                    Custom button
                </Button>,
            )
            const link = screen.getByLabelText('Custom')
            expect(link.textContent).toBe('Custom button')
            expect(link.className).toContain('btn')
        })

        it('should forward extra props to the custom component', () => {
            const CustomLink = ({ to, ...rest }: { to: string } & Record<string, unknown>) => (
                <a href={to} {...rest} />
            )
            render(
                <Button as={CustomLink} to="/dashboard" ariaLabel="Go">
                    Dashboard
                </Button>,
            )
            const link = screen.getByLabelText('Go')
            expect((link as HTMLAnchorElement).href).toContain('/dashboard')
        })
    })
})
