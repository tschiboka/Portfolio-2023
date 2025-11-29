import { screen, render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { AppContextProvider } from '../../../context/AppContext/App.context'
import AchievementListItem from './AchievementListItem'
import Achievement from './Achievements'
import Overlay from '../Overlay/Overlay'

const achievement: Achievement = {
    title: 'Achievement_Certificate_Title',
    details: ['Achievement_Detail_1', 'Achievement_Detail_2'],
    year: 2023,
    image: 'Achievement Institution Icon',
    image_alt: 'Achievement Alt',
    certificate_img: 'Achievement Certificate Image',
}

function renderComponent() {
    render(
        <AppContextProvider>
            <AchievementListItem achievement={achievement} />
        </AppContextProvider>,
    )
}

describe('Achievement List Item', () => {
    test('Should Render a List Item', () => {
        renderComponent()

        const list = screen.getByRole('listitem')
        expect(list).toBeInTheDocument()
        expect(list).toHaveClass('AchievementListItem')
    })

    test('Should Display an Image with Achievement Alt', () => {
        renderComponent()

        const img = screen.getByRole('img')
        expect(img).toBeInTheDocument()
    })

    test('Should Display Achievement Title', () => {
        renderComponent()

        const title = screen.getByText(/Achievement_Certificate_Title/)
        expect(title).toBeInTheDocument()
        expect(title).toHaveClass('AchievementListItem__title')
    })

    test('Should Display Achievement Details', () => {
        renderComponent()

        const details = screen.getAllByText(/Achievement_Detail/)
        details.forEach((detail) => {
            expect(detail).toBeInTheDocument()
            expect(detail).toHaveClass('AchievementListItem__detail')
        })
        expect(details).toHaveLength(2)
    })

    test('Should Display Achievement Year', () => {
        renderComponent()

        const year = screen.getByText(/2023/)
        expect(year).toBeInTheDocument()
        expect(year).toHaveClass('AchievementListItem__year')
    })

    test('Should Display a Certificate Image Overlay When Clicked', async () => {
        render(
            <AppContextProvider>
                <Overlay></Overlay>
                <AchievementListItem achievement={achievement} />
            </AppContextProvider>,
        )

        const achievementItem = screen.getByRole('listitem')
        await user.click(achievementItem)

        const overlayImage = screen.getByAltText(/Certificate/)
        expect(overlayImage).toBeInTheDocument()
    })

    test('Should Display Text When Hovered', async () => {
        renderComponent()

        const achievementItem = screen.getByRole('listitem')
        await user.hover(achievementItem)

        const hoverText = screen.getByText(/View Certificate/)
        expect(hoverText).toBeInTheDocument()
        expect(hoverText).toHaveClass('AchievementListItem__hover-text')
    })
})
