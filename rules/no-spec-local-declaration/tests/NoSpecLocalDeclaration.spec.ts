import { DataErrorMessage, HelperErrorMessage } from '../NoSpecLocalDeclaration.constants'
import { Rules } from '../NoSpecLocalDeclaration.rules'
import { ruleTester, typescriptRuleTester } from '../../config'

ruleTester.run('no-spec-local-declaration', Rules.Eslint.NoSpecLocalDeclaration9, {
    valid: [
        {
            name: 'should accept a spec that declares nothing of its own',
            code: "describe('Blog', () => { it('should render', () => {}) })",
        },
        {
            name: 'should accept the imports',
            code: "import { render } from '@testing-library/react'\ndescribe('Blog', () => {})",
        },
        {
            name: 'should accept a beforeEach hook',
            code: "beforeEach(() => { renderPage() })\ndescribe('Blog', () => {})",
        },
        {
            name: 'should accept an afterEach hook',
            code: "afterEach(() => { cleanup() })\ndescribe('Blog', () => {})",
        },
        {
            name: 'should accept an alias',
            code: "const renderPage = render\ndescribe('Blog', () => {})",
        },
        {
            name: 'should accept a destructure',
            code: "const { screen } = renderPage()\ndescribe('Blog', () => {})",
        },
        {
            name: 'should accept a vi.mock statement',
            code: "vi.mock('@common-utils/Http/Axios')\ndescribe('Blog', () => {})",
        },
        {
            name: 'should accept a vi.mocked handle',
            code: "const getMock = vi.mocked(get)\ndescribe('Blog', () => {})",
        },
        {
            name: 'should accept a helper declared inside a test',
            code: "describe('Blog', () => { it('should render', () => { const setup = () => 1 }) })",
        },
        {
            name: 'should accept a fixture declared inside a test',
            code: "describe('Blog', () => { it('should render', () => { const title = 'Blog' }) })",
        },
        {
            name: 'should accept a declaration inside a hook',
            code: "describe('Blog', () => { beforeEach(() => { const title = 'Blog' }) })",
        },
        {
            name: 'should accept a destructure inside a suite',
            code: "describe('Blog', () => { const { screen } = renderPage() })",
        },
        {
            name: 'should accept an alias inside a suite',
            code: "describe('Blog', () => { const renderPage = render })",
        },
        {
            name: 'should accept a vi.mocked handle inside a suite',
            code: "describe('Blog', () => { const getMock = vi.mocked(get) })",
        },
        {
            name: 'should accept a hook inside a suite',
            code: "describe('Blog', () => { beforeEach(() => { expect(1).toBe(1) }) })",
        },
        {
            name: 'should accept a beforeAll hook inside a suite',
            code: "describe('Blog', () => { beforeAll(() => setup()) })",
        },
        {
            name: 'should accept a vi.mock statement inside a suite',
            code: "describe('Blog', () => { vi.mock('@common-utils/Http/Axios') })",
        },
        {
            name: 'should accept a suite written as a function expression',
            code: "describe('Blog', function () { it('should render', () => {}) })",
        },
        {
            name: 'should accept a suite whose callback is an expression',
            code: "describe.each([1, 2])('%i', () => renderPage())",
        },
        {
            name: 'should accept a spec that opens no suite',
            code: "it('should render', () => {})",
        },
        {
            name: 'should read describe.each as the suite',
            code: "describe.each([1, 2])('%i', () => {})\nconst title = 'Blog'",
        },
        {
            name: 'should read describe.only as the suite',
            code: "describe.only('Blog', () => {})\nconst title = 'Blog'",
        },
        {
            name: 'should accept a declaration below the first suite',
            code: "describe('Blog', () => {})\nconst title = 'Blog'",
        },
    ],
    invalid: [
        {
            name: 'should throw for a function declaration above the first suite',
            code: "function setup() {}\ndescribe('Blog', () => {})",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for an arrow helper above the first suite',
            code: "const setup = () => {}\ndescribe('Blog', () => {})",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for a function expression above the first suite',
            code: "const setup = function () {}\ndescribe('Blog', () => {})",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for a class above the first suite',
            code: "class Setup {}\ndescribe('Blog', () => {})",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for an exported helper above the first suite',
            code: "export function setup() {}\ndescribe('Blog', () => {})",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for a call that is not a hook above the first suite',
            code: "renderPage()\ndescribe('Blog', () => {})",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for an identity constant above the first suite',
            code: "const title = 'Blog'\ndescribe('Blog', () => {})",
            errors: [{ message: DataErrorMessage }],
        },
        {
            name: 'should throw for a data object above the first suite',
            code: "const article = { title: 'Blog' }\ndescribe('Blog', () => {})",
            errors: [{ message: DataErrorMessage }],
        },
        {
            name: 'should throw once per offending declarator',
            code: "const setup = () => {}, title = 'Blog'\ndescribe('Blog', () => {})",
            errors: [{ message: HelperErrorMessage }, { message: DataErrorMessage }],
        },
        {
            name: 'should throw for a helper declared inside a suite',
            code: "describe('Blog', () => { const setup = () => 1 })",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for a function declared inside a suite',
            code: "describe('Blog', () => { function setup() {} })",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for data declared inside a suite',
            code: "describe('Blog', () => { const title = 'Blog' })",
            errors: [{ message: DataErrorMessage }],
        },
        {
            name: 'should throw for a helper declared inside a nested suite',
            code: "describe('Blog', () => { describe('Layout', () => { const setup = () => 1 }) })",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for a helper declared in a suite that follows another',
            code: "describe('Blog', () => {})\ndescribe('Word', () => { const setup = () => 1 })",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw for a class declared inside a suite',
            code: "describe('Blog', () => { class Setup {} })",
            errors: [{ message: HelperErrorMessage }],
        },
        {
            name: 'should throw once per declaration inside a suite',
            code: "describe('Blog', () => { const setup = () => 1, title = 'Blog' })",
            errors: [{ message: HelperErrorMessage }, { message: DataErrorMessage }],
        },
    ],
})

typescriptRuleTester.run(
    'no-spec-local-declaration with types',
    Rules.Eslint.NoSpecLocalDeclaration9,
    {
        valid: [
            {
                name: 'should accept an interface above the first suite',
                code: "interface Props { title: string }\ndescribe('Blog', () => {})",
            },
            {
                name: 'should accept a type above the first suite',
                code: "type Props = { title: string }\ndescribe('Blog', () => {})",
            },
            {
                name: 'should accept an exported type above the first suite',
                code: "export type Props = { title: string }\ndescribe('Blog', () => {})",
            },
            {
                name: 'should accept an interface inside a suite',
                code: "describe('Blog', () => { interface Props { title: string } })",
            },
        ],
        invalid: [
            {
                name: 'should throw for an annotated helper above the first suite',
                code: "const setup = (title: string): string => title\ndescribe('Blog', () => {})",
                errors: [{ message: HelperErrorMessage }],
            },
            {
                name: 'should throw for an annotated helper inside a suite',
                code: "describe('Blog', () => { const setup = (title: string): string => title })",
                errors: [{ message: HelperErrorMessage }],
            },
        ],
    },
)
