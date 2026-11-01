import { screen, waitFor } from '@testing-library/react'
import { Accessor } from '@common-ux/Test'
import { Test } from '@shared-components/Screen/tests'
import { XmasTestUtils } from './Xmas.spec.utils'

describe('Xmas', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render the reindeer image', () => {
            XmasTestUtils.render()
            expect(
                new Accessor(
                    screen.getByRole('img', { name: /Reindeer Image/i }),
                    'Reindeer Image',
                ),
            ).toBeDefined()
        })

        it('should render the form with name and message fields', () => {
            XmasTestUtils.render()
            expect(Test.Typography.byLabel('Name')).toBeDefined()
            expect(Test.Typography.byLabel('Message')).toBeDefined()
        })

        it('should render the submit button', () => {
            XmasTestUtils.render()
            expect(Test.Button('Submit')).toBeDefined()
        })

        it('should render the Candles heading', () => {
            XmasTestUtils.render()
            expect(Test.Heading('Candles')).toBeDefined()
        })

        it('should render the candle panel description', () => {
            XmasTestUtils.render()
            expect(
                Test.Typography(/Click on a candle to mess up my candle settings/i),
            ).toBeDefined()
        })

        it('should render the page with main content', () => {
            XmasTestUtils.render()
            expect(screen.getByRole('main')).toBeInTheDocument()
        })
    })

    describe('Candle panel', () => {
        it('should render four candles', async () => {
            XmasTestUtils.render()
            await waitFor(() => {
                expect(screen.getAllByRole('img', { name: 'Candle' })).toHaveLength(4)
            })
        })
    })

    describe('Form validation', () => {
        it('should show validation error when name is too short on submit', async () => {
            XmasTestUtils.render()
            await XmasTestUtils.fillName('ab')
            await Test.Button('Submit').Do.click()

            await waitFor(() => {
                expect(Test.Typography(/Name must be at least 4 characters/)).toBeDefined()
            })
        })

        it('should show validation error when message is empty on submit', async () => {
            XmasTestUtils.render()
            await XmasTestUtils.fillName('ValidName')
            await Test.Button('Submit').Do.click()

            await waitFor(() => {
                expect(Test.Typography(/Message is required/)).toBeDefined()
            })
        })

        it('should show validation error when name contains special characters', async () => {
            XmasTestUtils.render()
            await XmasTestUtils.fillName('User@Name!')
            await Test.Button('Submit').Do.click()

            await waitFor(() => {
                expect(Test.Typography(/Name allows only alphanumerics/)).toBeDefined()
            })
        })

        it('should show validation error when message exceeds max length', async () => {
            XmasTestUtils.render()
            await XmasTestUtils.fillName('ValidName')
            const messageInput = screen.getByLabelText('Message')
            await Accessor.user.type(
                messageInput,
                'This message is way too long for the xmas form validation',
            )
            await Test.Button('Submit').Do.click()

            await waitFor(() => {
                expect(Test.Typography(/Message must be under 50 characters/)).toBeDefined()
            })
        })
    })

    describe('Successful submission', () => {
        it('should show success message after submitting valid form', async () => {
            XmasTestUtils.render()
            const messageInput = screen.getByLabelText('Message')

            await Accessor.user.type(messageInput, 'Hello world')
            await Test.Button('Submit').Do.click()

            await waitFor(() => {
                expect(Test.Typography('Successful submission')).toBeDefined()
            })
        })
    })

    describe('Loading state', () => {
        it('should not show loading indicator initially', () => {
            XmasTestUtils.render()
            expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
        })
    })
})
