import { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'
import { HiShare } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { useLocation } from 'react-router-dom'
import { BiSolidUpArrowSquare } from 'react-icons/bi'
import { useQueryClient } from '@tanstack/react-query'
import { Button, CounterBadge, SideMenu } from '@common-ux'
import { LikeQueries, VisitQueries } from '@shared-queries'
import { QueryKey } from '@common-utils'
import { ShareMenu } from '../ShareMenu/ShareMenu'
import type { SideMenuItem } from '@common-ux'
import './PageSideMenu.css'

const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

export const PageSideMenu = () => {
    const [visible, setVisible] = useState(true)
    const [shareMenuVisible, setShareMenuVisible] = useState(false)
    const [liked, setLiked] = useState(false)

    const { pathname } = useLocation()
    const queryClient = useQueryClient()
    const { data: likesData } = LikeQueries.useGet(pathname)
    const { data: visitsData } = VisitQueries.useGet(pathname)
    const { mutate: doPostLike } = LikeQueries.usePost()

    const visits = visitsData?.visits ?? 0
    const likes = likesData?.likes ?? 0

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
            badge: visits > 0 ? <CounterBadge count={visits} /> : undefined,
        },
        {
            icon: <AiFillHeart />,
            label: 'Like',
            highlighted: liked,
            badge: likes > 0 ? <CounterBadge count={likes} /> : undefined,
            onClick: () => {
                if (!liked) {
                    doPostLike(
                        { path: pathname },
                        {
                            onSuccess: () => {
                                setLiked(true)
                                void queryClient.invalidateQueries({
                                    queryKey: QueryKey.Likes.byFilters({ path: pathname }).build(),
                                })
                            },
                        },
                    )
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
            {!visible && (
                <Button
                    className="PageSideMenu__reopen"
                    ariaLabel="Open Menu"
                    onClick={() => setVisible(true)}
                >
                    <IoMdClose style={{ transform: 'rotate(45deg)' }} />
                </Button>
            )}
        </div>
    )
}
