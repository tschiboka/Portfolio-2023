import { ReactNode, useEffect, useState } from 'react'

// Components
import { Screen } from '../Screen/Screen'
import LikeButton from '../../sharedComponents/LikeButton/LikeButton'
import References from '../References/References'
import { getReferenceList } from '../../../articles/references'
import BlogTimeStamp from '../../sharedComponents/BlogTimeStamp/BlogTimeStamp'
import Disclaimer from '../Disclaimer/Disclaimer'

// Other Assets
import { blogArticles } from '../../../articles/articles'

// Styles
import './Articles.scss'
import { getLikes } from '../../../serverAPI/likes'
import { getVisits } from '../../../serverAPI/visits'
import SuggestedArticles from '../SuggestedArticles/SuggestedArticles'
import { PageSideMenu } from '../PageSideMenu/PageSideMenu'

interface Props {
    pageName: string
    path: string
    title: string
    children: ReactNode
    hasContentNavigator?: boolean
}

const Article = ({ pageName, path, title, children, hasContentNavigator = true }: Props) => {
    const article = blogArticles.find((article) => article.to === path)
    const [visitsLoaded, setVisitsLoaded] = useState(false)
    const [visits, setVisits] = useState(0)
    const [likesLoaded, setLikesLoaded] = useState(false)
    const [likes, setLikes] = useState(0)
    const [articleLiked, setArticleLiked] = useState(false)
    const references = getReferenceList(path)
    useEffect(() => {
        if (!visitsLoaded) {
            void getVisits(path, (visits: number) => {
                setVisitsLoaded(true)
                setVisits(visits)
            })
        }
        if (!likesLoaded)
            void getLikes(path, (likes: number) => {
                setLikesLoaded(true)
                setLikes(likes)
            })
    }, [likes, visits, likesLoaded, visitsLoaded, path])

    return (
        <Screen
            title={'Tivadar Debnar | ' + title}
            path={path}
            variant="portfolio"
            pageName={pageName}
            sideMenu={<PageSideMenu />}
            hasContentNavigator={hasContentNavigator}
        >
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
                    <BlogTimeStamp created={article.created} updated={article.updated} />
                )}
                <Disclaimer />
                <SuggestedArticles articles={article?.suggestedArticles} />
            </main>
        </Screen>
    )
}

export default Article
