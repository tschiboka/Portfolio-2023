import { screen, waitFor } from '@testing-library/react'
import { Test } from '@common/ux/Test'
import { Accessor } from '@common/ux/Test/Accessor/Accessor'
import Xmas2025 from '../Xmas2025'
import { handlers } from './Xmas2025.mockHandles'
import { mockUser } from './Xmas2025.mocks'

const setupXmas2025 = () => {
    Test.Page.Do.render({
        path: '/xmas2025',
        children: <Xmas2025 />,
        handlers,
        session: {
            isAuthenticated: true,
            session: { user: mockUser },
        },
    })
}

describe('Xmas2025', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Layout', () => {
        it('should render the reindeer image', () => {
            setupXmas2025()
            expect(
                new Accessor(
                    screen.getByRole('img', { name: /Reindeer Image/i }),
                    'Reindeer Image',
                ),
            ).toBeDefined()
        })

        it('should render the form with name and message fields', () => {
            setupXmas2025()
            expect(Test.Typography.byLabel('Name')).toBeDefined()
            expect(Test.Typography.byLabel('Message')).toBeDefined()
        })

        it('should render the submit button', () => {
            setupXmas2025()
            expect(Test.Button('Submit')).toBeDefined()
        })

        it('should render the Candles heading', () => {
            setupXmas2025()
            expect(Test.Heading('Candles')).toBeDefined()
        })

        it('should render the candle panel description', () => {
            setupXmas2025()
            expect(
                Test.Typography(/Click on a candle to mess up my candle settings/i),
            ).toBeDefined()
        })

        it('should render the page with main content', () => {
            setupXmas2025()
            expect(screen.getByRole('main')).toBeInTheDocument()
        })
    })

    describe('Candle panel', () => {
        it('should render four candles', async () => {
            setupXmas2025()
            await waitFor(() => {
                expect(screen.getAllByRole('img', { name: 'Candle' })).toHaveLength(4)
            })
        })
    })

    describe.skip('Message wall', () => {
        it('should render the messaging wall heading and messages', async () => {
            setupXmas2025()
            await waitFor(() => {
                expect(Test.Heading('Messaging wall')).toBeDefined()
            })
            expect(Test.Typography('Merry Christmas!')).toBeDefined()
            expect(Test.Typography('Happy holidays!')).toBeDefined()
        })
    })

    describe('Form validation', () => {
        const fillName = async (value: string) => {
            const nameInput = screen.getByLabelText<HTMLInputElement>('Name')
            await Accessor.user.type(nameInput, value, {
                initialSelectionStart: 0,
                initialSelectionEnd: nameInput.value.length,
            })
        }

        it('should show validation error when name is too short on submit', async () => {
            setupXmas2025()
            await fillName('ab')
            await Test.Button('Submit').Do.click()

            await waitFor(() => {
                expect(Test.Typography(/Min 4 chars/)).toBeDefined()
            })
        })

        it('should show validation error when message is empty on submit', async () => {
            setupXmas2025()
            await fillName('ValidName')
            await Test.Button('Submit').Do.click()

            await waitFor(() => {
                expect(Test.Typography(/Required/)).toBeDefined()
            })
        })

        it('should show validation error when name contains special characters', async () => {
            setupXmas2025()
            await fillName('User@Name!')
            await Test.Button('Submit').Do.click()

            await waitFor(() => {
                expect(Test.Typography(/Only alphanumerics/)).toBeDefined()
            })
        })

        it('should show validation error when message exceeds max length', async () => {
            setupXmas2025()
            await fillName('ValidName')
            const messageInput = screen.getByLabelText('Message')
            await Accessor.user.type(
                messageInput,
                'This message is way too long for the xmas form validation',
            )
            await Test.Button('Submit').Do.click()

            await waitFor(() => {
                expect(Test.Typography(/Max 50 chars/i)).toBeDefined()
            })
        })
    })

    describe('Successful submission', () => {
        it('should show success message after submitting valid form', async () => {
            setupXmas2025()
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
            setupXmas2025()
            expect(Test.LoadingIndicator.Has.isLoading()).toBe(false)
        })
    })
})
