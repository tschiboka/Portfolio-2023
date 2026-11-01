import { screen } from '@testing-library/react'
import { Accessor } from '@common-ux/Test'
import { Test } from '@shared-components/Screen/tests'
import { XmasMocks } from './Xmas.mocks'
import { XmasMockHandlers } from './Xmas.mockHandlers'
import { Xmas } from '../Xmas'

const render = () =>
    Test.Screen.Do.render({
        path: '/xmas2025',
        children: <Xmas />,
        handlers: XmasMockHandlers.Defaults,
        session: {
            isAuthenticated: true,
            session: { user: XmasMocks.user },
        },
    })

const fillName = async (value: string) => {
    const nameInput = screen.getByLabelText<HTMLInputElement>('Name')
    await Accessor.user.type(nameInput, value, {
        initialSelectionStart: 0,
        initialSelectionEnd: nameInput.value.length,
    })
}

export const XmasTestUtils = { render, fillName }
