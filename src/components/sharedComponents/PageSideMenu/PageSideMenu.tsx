import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { BiSolidUpArrowSquare } from 'react-icons/bi'
import { HiShare } from 'react-icons/hi'
import { FaEye } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { SideMenu } from '@common/ux/SideMenu'
import type { SideMenuItem } from '@common/ux/SideMenu'
import { useGetLikes, usePostLike } from '@common/queries/Likes.queries'
import { useGetVisits } from '@common/queries'
import { QueryKey } from '@common/utils'
import ShareMenu from '../ShareMenu/ShareMenu'
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
    const { data: likesData } = useGetLikes(pathname)
    const { data: visitsData } = useGetVisits(pathname)
    const { mutate: doPostLike } = usePostLike()

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
            badge: visits > 0 ? <span>{visits}</span> : undefined,
        },
        {
            icon: <AiFillHeart />,
            label: 'Like',
            highlighted: liked,
            badge: likes > 0 ? <span>{likes}</span> : undefined,
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
        </div>
    )
}
