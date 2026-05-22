import { Set } from './Typography.spec.utils'

describe('Typography', () => {
    describe('base component', () => {
        it('should render a <span> by default', () => {
            const typo = Set.typography()
            expect(typo.Get.tagName()).toBe('SPAN')
        })

        it('should render children', () => {
            const typo = Set.typography({ children: 'Hello world' })
            expect(typo.Get.textContent()).toContain('Hello world')
        })

        it('should render a custom element', () => {
            const typo = Set.typography({ as: 'p' })
            expect(typo.Get.tagName()).toBe('P')
        })

        it('should apply size class', () => {
            const typo = Set.typography({ size: 'lg' })
            expect(typo.Get.className()).toContain('typo--lg')
        })

        it('should apply weight class', () => {
            const typo = Set.typography({ weight: 'bold' })
            expect(typo.Get.className()).toContain('typo--bold')
        })

        it('should apply alignment class', () => {
            const typo = Set.typography({ align: 'center' })
            expect(typo.Get.className()).toContain('typo--center')
        })

        it('should apply tone class', () => {
            const typo = Set.typography({ tone: 'error' })
            expect(typo.Get.className()).toContain('typo--error')
        })

        it('should not apply tone class for default tone', () => {
            const typo = Set.typography({ tone: 'default' })
            expect(typo.Get.className()).not.toContain('typo--default')
        })

        it('should apply truncate class', () => {
            const typo = Set.typography({ truncate: true })
            expect(typo.Get.className()).toContain('typo--truncate')
        })

        it('should apply wrap class', () => {
            const typo = Set.typography({ wrap: 'balance' })
            expect(typo.Get.className()).toContain('typo--balance')
        })

        it('should apply family class', () => {
            const typo = Set.typography({ family: 'mono' })
            expect(typo.Get.className()).toContain('typo--mono')
        })

        it('should apply decoration class', () => {
            const typo = Set.typography({ decoration: 'underline' })
            expect(typo.Get.className()).toContain('typo--decoration-underline')
        })

        it('should apply transform class', () => {
            const typo = Set.typography({ transform: 'uppercase' })
            expect(typo.Get.className()).toContain('typo--uppercase')
        })

        it('should apply ariaLabel', () => {
            const typo = Set.typography({ ariaLabel: 'Important' })
            expect(typo.Get.attribute('aria-label')).toBe('Important')
        })

        it('should apply className', () => {
            const typo = Set.typography({ className: 'custom' })
            expect(typo.Get.className()).toContain('custom')
            expect(typo.Get.className()).toContain('typo')
        })

        it('should always include base typo class', () => {
            const typo = Set.typography()
            expect(typo.Get.className()).toContain('typo')
        })
    })

    describe('Heading', () => {
        it('should render an <h2> by default', () => {
            const heading = Set.heading()
            expect(heading.Get.tagName()).toBe('H2')
        })

        it('should render the specified heading level', () => {
            const heading = Set.heading({ as: 'h3', children: 'Title' })
            expect(heading.Get.tagName()).toBe('H3')
        })

        it('should render children', () => {
            const heading = Set.heading({ children: 'Welcome' })
            expect(heading.Get.textContent()).toContain('Welcome')
        })

        it('should apply bold weight by default', () => {
            const heading = Set.heading()
            expect(heading.Get.className()).toContain('typo--bold')
        })

        it('should infer size from level', () => {
            const heading = Set.heading({ as: 'h1', children: 'Big title' })
            expect(heading.Get.className()).toContain('typo--2xl')
        })

        it('should allow overriding size', () => {
            const heading = Set.heading({ as: 'h1', size: 'sm', children: 'Small h1' })
            expect(heading.Get.className()).toContain('typo--sm')
            expect(heading.Get.className()).not.toContain('typo--2xl')
        })

        it('should expose heading level via accessor', () => {
            const heading = Set.heading({ as: 'h4', children: 'Sub' })
            expect(heading.Get.level()).toBe(4)
        })

        it('should apply tone', () => {
            const heading = Set.heading({ tone: 'warning', children: 'Warn' })
            expect(heading.Get.tone()).toBe('warning')
        })
    })

    describe('Paragraph', () => {
        it('should render a <p> element', () => {
            const paragraph = Set.paragraph()
            expect(paragraph.Get.tagName()).toBe('P')
        })

        it('should render children', () => {
            const paragraph = Set.paragraph({ children: 'Body text' })
            expect(paragraph.Get.textContent()).toContain('Body text')
        })

        it('should apply md size by default', () => {
            const paragraph = Set.paragraph()
            expect(paragraph.Get.className()).toContain('typo--md')
        })

        it('should not apply an explicit weight class by default', () => {
            const paragraph = Set.paragraph()
            expect(paragraph.Get.className()).not.toContain('typo--bold')
        })

        it('should allow overriding size', () => {
            const paragraph = Set.paragraph({ size: 'lg' })
            expect(paragraph.Get.className()).toContain('typo--lg')
        })
    })

    describe('Text', () => {
        it('should render a <span> element', () => {
            const text = Set.text()
            expect(text.Get.tagName()).toBe('SPAN')
        })

        it('should render children', () => {
            const text = Set.text({ children: 'Inline content' })
            expect(text.Get.textContent()).toContain('Inline content')
        })

        it('should pass through size', () => {
            const text = Set.text({ size: 'xl' })
            expect(text.Get.className()).toContain('typo--xl')
        })

        it('should pass through weight', () => {
            const text = Set.text({ weight: 'semibold' })
            expect(text.Get.className()).toContain('typo--semibold')
        })
    })

    describe('Caption', () => {
        it('should render a <span> element', () => {
            const caption = Set.caption()
            expect(caption.Get.tagName()).toBe('SPAN')
        })

        it('should render children', () => {
            const caption = Set.caption({ children: 'Small note' })
            expect(caption.Get.textContent()).toContain('Small note')
        })

        it('should apply xs size', () => {
            const caption = Set.caption()
            expect(caption.Get.className()).toContain('typo--xs')
        })

        it('should apply muted tone', () => {
            const caption = Set.caption()
            expect(caption.Get.tone()).toBe('muted')
        })

        it('should apply regular weight by default', () => {
            const caption = Set.caption()
            expect(caption.Get.className()).toContain('typo--regular')
        })
    })

    describe('CodeText', () => {
        it('should render a <code> element', () => {
            const code = Set.codeText()
            expect(code.Get.tagName()).toBe('CODE')
        })

        it('should render children', () => {
            const code = Set.codeText({ children: 'npm install' })
            expect(code.Get.textContent()).toContain('npm install')
        })

        it('should apply sm size by default', () => {
            const code = Set.codeText()
            expect(code.Get.className()).toContain('typo--sm')
        })

        it('should allow overriding size', () => {
            const code = Set.codeText({ size: 'lg' })
            expect(code.Get.className()).toContain('typo--lg')
        })
    })

    describe('BlockQuote', () => {
        it('should render a <blockquote> element', () => {
            const quote = Set.blockQuote()
            expect(quote.Get.tagName()).toBe('BLOCKQUOTE')
        })

        it('should render children', () => {
            const quote = Set.blockQuote({ children: 'Famous words' })
            expect(quote.Get.textContent()).toContain('Famous words')
        })

        it('should apply md size by default', () => {
            const quote = Set.blockQuote()
            expect(quote.Get.className()).toContain('typo--md')
        })

        it('should apply regular weight by default', () => {
            const quote = Set.blockQuote()
            expect(quote.Get.className()).toContain('typo--regular')
        })
    })

    describe('Overline', () => {
        it('should render a <span> element', () => {
            const overline = Set.overline()
            expect(overline.Get.tagName()).toBe('SPAN')
        })

        it('should render children', () => {
            const overline = Set.overline({ children: 'SECTION' })
            expect(overline.Get.textContent()).toContain('SECTION')
        })

        it('should include the overline class', () => {
            const overline = Set.overline()
            expect(overline.Get.className()).toContain('typo--overline')
        })

        it('should apply semibold weight by default', () => {
            const overline = Set.overline()
            expect(overline.Get.className()).toContain('typo--semibold')
        })

        it('should apply tone', () => {
            const overline = Set.overline({ tone: 'info' })
            expect(overline.Get.className()).toContain('typo--info')
        })
    })

    describe('List', () => {
        it('should render a <ul> by default', () => {
            const list = Set.list()
            expect(list.Get.tagName()).toBe('UL')
        })

        it('should render an <ol> when specified', () => {
            const list = Set.list({ as: 'ol' })
            expect(list.Get.tagName()).toBe('OL')
        })

        it('should render items as <li> elements', () => {
            const list = Set.list({ items: ['Apple', 'Banana', 'Cherry'] })
            expect(list.Get.textContent()).toContain('Apple')
            expect(list.Get.textContent()).toContain('Banana')
            expect(list.Get.textContent()).toContain('Cherry')
        })

        it('should apply md size by default', () => {
            const list = Set.list()
            expect(list.Get.className()).toContain('typo--md')
        })

        it('should allow overriding size', () => {
            const list = Set.list({ size: 'lg' })
            expect(list.Get.className()).toContain('typo--lg')
        })

        it('should apply the typo-list class', () => {
            const list = Set.list()
            expect(list.Get.className()).toContain('typo-list')
        })

        it('should apply tone class', () => {
            const list = Set.list({ tone: 'muted' })
            expect(list.Get.className()).toContain('typo--muted')
        })

        it('should apply custom className', () => {
            const list = Set.list({ className: 'custom-list' })
            expect(list.Get.className()).toContain('custom-list')
            expect(list.Get.className()).toContain('typo')
        })

        it('should apply aria-label', () => {
            const list = Set.list({ ariaLabel: 'Navigation items' })
            expect(list.Get.attribute('aria-label')).toBe('Navigation items')
        })

        it('should render ReactNode items', () => {
            const list = Set.list({
                items: [<strong key="a">Bold</strong>, <em key="b">Italic</em>],
            })
            expect(list.Get.textContent()).toContain('Bold')
            expect(list.Get.textContent()).toContain('Italic')
        })
    })

    describe('InlineReference', () => {
        it('should render a link with bracketed author text', () => {
            const ref = { title: 'Article', author: 'Smith', source: 'https://example.com' }
            const inlineRef = Set.inlineReference({ reference: ref })
            expect(inlineRef.Get.textContent()).toBe('[Smith]')
        })

        it('should render an external link with href', () => {
            const ref = { title: 'Article', author: 'Smith', source: 'https://example.com' }
            const inlineRef = Set.inlineReference({ reference: ref })
            expect(inlineRef.Get.href()).toContain('https://example.com')
        })

        it('should render an internal link for non-http sources', () => {
            const ref = { title: 'Article', author: 'Smith', source: '/blog/some-article' }
            const inlineRef = Set.inlineReference({ reference: ref })
            expect(inlineRef.Get.href()).toBe('/blog/some-article')
        })

        it('should apply the typo-inline-ref class', () => {
            const inlineRef = Set.inlineReference()
            expect(inlineRef.Get.className()).toContain('typo-inline-ref')
        })

        it('should apply custom className', () => {
            const inlineRef = Set.inlineReference({ className: 'custom-ref' })
            expect(inlineRef.Get.className()).toContain('custom-ref')
            expect(inlineRef.Get.className()).toContain('typo-inline-ref')
        })

        it('should apply aria-label', () => {
            const inlineRef = Set.inlineReference({ ariaLabel: 'Reference to Smith' })
            expect(inlineRef.Get.attribute('aria-label')).toBe('Reference to Smith')
        })
    })
})
