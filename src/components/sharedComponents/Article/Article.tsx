import { ReactNode, useEffect, useState } from 'react'
import { useAppContext } from '../../../context/AppContext'

// Components
import Page from '../../sharedComponents/Page/Page'
import Menu from '../../sharedComponents/Menu/Menu'
import Nav from '../../sharedComponents/Nav/Nav'
import SubNav from '../../sharedComponents/SubNav/SubNav'
import LikeButton from '../../sharedComponents/LikeButton/LikeButton'
import References from '../References/References'
import { getReferenceList } from '../../articles/references'
import BlogTimeStamp from '../../sharedComponents/BlogTimeStamp/BlogTimeStamp'
import Disclaimer from '../Disclaimer/Disclaimer'
import Footer from '../../sharedComponents/Footer/Footer'

// Icons
import { BiSolidUpArrowSquare } from 'react-icons/bi'
import { FaEye } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { HiShare } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'

// Other Assets
import { blogArticles } from '../../articles/articles'

// Styles
import './Articles.scss'
import ShareMenu from '../ShareMenu/ShareMenu'
import { getLikes, postLike } from '../../../serverAPI/likes'
import { getVisits } from '../../../serverAPI/visits'
import SuggestedArticles from '../SuggestedArticles/SuggestedArticles'

// Functions
const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

interface Props {
    pageName: string
    path: string
    title: string
    children: ReactNode
}

const Article = ({ pageName, path, title, children }: Props) => {
    const article = blogArticles.find((article) => article.to === path)
    const { mobileMenuVisible, subMenuVisible } = useAppContext()
    const [sideMenuVisible, setSideMenuVisible] = useState(true)
    const [shareMenuVisible, setShareMenuVisible] = useState(false)
    const [visitsLoaded, setVisitsLoaded] = useState(false)
    const [visits, setVisits] = useState(0)
    const [likesLoaded, setLikesLoaded] = useState(false)
    const [likes, setLikes] = useState(0)
    const [articleLiked, setArticleLiked] = useState(false)
    const references = getReferenceList(path)
    useEffect(() => {
        if (!visitsLoaded) {
            getVisits(path, (visits: number) => {
                setVisitsLoaded(true)
                setVisits(visits)
            })
        }
        if (!likesLoaded)
            getLikes(path, (likes: number) => {
                setLikesLoaded(true)
                setLikes(likes)
            })
    }, [likes, visits])

    return (
        <Page title={'Tivadar Debnar | ' + title} path={path}>
            <Nav pageName={pageName} path={path} />
            {mobileMenuVisible && <Menu pageName="js-date-validation" />}
            {subMenuVisible && <SubNav />}
            {sideMenuVisible && (
                <aside className="blog-component--article">
                    <HiShare
                        className={
                            'aside-icon ' +
                            (shareMenuVisible ? 'highlighted' : '')
                        }
                        title="Share"
                        onClick={() => setShareMenuVisible(!shareMenuVisible)}
                    />
                    <div
                        className="Article__icon-box"
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            if (!articleLiked)
                                postLike(path, () => setArticleLiked(true))
                            return false
                        }}
                    >
                        <FaEye className="aside-icon" title="Times Visited" />
                        <span>{visits !== 0 ? visits : '-'}</span>
                    </div>
                    <div
                        className="Article__icon-box"
                        onClick={(event) => {
                            event.preventDefault()
                            event.stopPropagation()
                            if (!articleLiked)
                                postLike(path, () => setArticleLiked(true))
                            return false
                        }}
                    >
                        <AiFillHeart
                            className={
                                'aside-icon ' +
                                (articleLiked ? 'highlighted' : '')
                            }
                            title="Likes"
                        />
                        <span>
                            {(!articleLiked ? likes : likes + 1) || '-'}
                        </span>
                    </div>
                    <BiSolidUpArrowSquare
                        className="aside-icon"
                        title="Go to the Top of the Page"
                        onClick={() => scrollToTop()}
                    />
                    <IoMdClose
                        className="aside-icon"
                        title="Close Menu"
                        onClick={() => setSideMenuVisible(false)}
                    />
                    <div className="line"></div>
                    {shareMenuVisible && <ShareMenu path={path} />}
                </aside>
            )}

            <main className="blog-component">
                <article>{children}</article>

                <LikeButton
                    path={path}
                    likes={likes}
                    articleLiked={articleLiked}
                    setArticleLiked={setArticleLiked}
                />
                <References references={references} />
                {article && article.created && (
                    <BlogTimeStamp
                        created={article.created}
                        updated={article.updated}
                    />
                )}
                <Disclaimer />
                <SuggestedArticles articles={article?.suggestedArticles} />
            </main>
            <Footer
                pageName={pageName}
                path={path}
                visitsPreLoaded={true}
                visitCount={visits}
            />
        </Page>
    )
}

export default Article
