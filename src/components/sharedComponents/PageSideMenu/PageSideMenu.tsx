import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BiSolidUpArrowSquare } from 'react-icons/bi'
import { HiShare } from 'react-icons/hi'
import { FaEye } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { SideMenu } from '@common/ux/SideMenu'
import type { SideMenuItem } from '@common/ux/SideMenu'
import { getLikes, postLike } from '../../../serverAPI/likes'
import { getVisits } from '../../../serverAPI/visits'
import ShareMenu from '../ShareMenu/ShareMenu'
import './PageSideMenu.css'

const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

export const PageSideMenu = () => {
    const [visible, setVisible] = useState(true)
    const [shareMenuVisible, setShareMenuVisible] = useState(false)
    const [visits, setVisits] = useState(0)
    const [likes, setLikes] = useState(0)
    const [liked, setLiked] = useState(false)

    const { pathname } = useLocation()

    useEffect(() => {
        void getVisits(pathname, setVisits)
        void getLikes(pathname, setLikes)
    }, [pathname])

    const items: SideMenuItem[] = [
        {
            icon: <HiShare />,
            label: 'Share',
            highlighted: shareMenuVisible,
            onClick: () => setShareMenuVisible((prev) => !prev),
        },
        {
            icon: <FaEye />,
            label: 'Views',
            badge: visits > 0 ? <span>{visits}</span> : undefined,
        },
        {
            icon: <AiFillHeart />,
            label: 'Like',
            highlighted: liked,
            badge: likes > 0 ? <span>{likes}</span> : undefined,
            onClick: () => {
                if (!liked) {
                    void postLike(pathname, () => {
                        setLikes((prev) => prev + 1)
                        setLiked(true)
                    })
                }
            },
        },
        {
            icon: <BiSolidUpArrowSquare />,
            label: 'Go to the Top of the Page',
            onClick: scrollToTop,
        },
    ]

    return (
        <div className="PageSideMenu">
            {shareMenuVisible && <ShareMenu path={pathname} />}
            <SideMenu items={items} visible={visible} onClose={() => setVisible(false)} />
        </div>
    )
}
