import { Link, useLocation } from 'react-router-dom'
import { BiChevronLeft, BiChevronRight, BiChevronsLeft } from 'react-icons/bi'
import { stories, STORIES_INDEX_PATH } from '../../stories'
import './StoryNav.styles.css'

export const StoryNav = () => {
    const { pathname } = useLocation()
    const currentIndex = stories.findIndex((s) => s.path === pathname)
    const prev = currentIndex > 0 ? stories[currentIndex - 1] : null
    const next = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null
    const isIndex = pathname === STORIES_INDEX_PATH

    if (isIndex) return null

    return (
        <nav className="StoryNav" aria-label="Story navigation">
            <Link to={STORIES_INDEX_PATH} className="StoryNav__back">
                <BiChevronsLeft /> All Stories
            </Link>
            <div className="StoryNav__pager">
                {prev ? (
                    <Link to={prev.path} className="StoryNav__link" title={prev.label}>
                        <BiChevronLeft /> {prev.label}
                    </Link>
                ) : (
                    <span />
                )}
                {next ? (
                    <Link to={next.path} className="StoryNav__link" title={next.label}>
                        {next.label} <BiChevronRight />
                    </Link>
                ) : (
                    <span />
                )}
            </div>
        </nav>
    )
}
