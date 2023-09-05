import BlogCard from "../BlogCard/BlogCard";
import { blogArticles } from "../../articles/articles";
import "./SuggestedArticle.scss";
import { useEffect, useState } from "react";
import { getVisitSummary } from "../../../serverAPI/visits";
import { getLikeSummary } from "../../../serverAPI/likes";
import { LikeCount, VisitCount } from "../../pages/Blog/Blog";

interface Props {
    articles?: string[];
}

const SuggestedArticles = ({ articles }: Props) => {
    const [visits, setVisits] = useState<VisitCount | null>(null);
    const [visitsLoaded, setVisitsLoaded] = useState(false);
    const [likes, setLikes] = useState<LikeCount | null>(null);
    const [likesLoaded, setLikesLoaded] = useState(false);

    useEffect(() => {
        if (!visitsLoaded)
            getVisitSummary((visits: VisitCount | null) => {
                setVisitsLoaded(true);
                setVisits(visits);
            });
        if (!likesLoaded) {
            getLikeSummary((likes: LikeCount | null) => {
                setLikesLoaded(true);
                setLikes(likes);
            });
        }
    }, [visits, likes]);
    const getBlogArticle = (path: string) => {
        const article = blogArticles.find((article) => article.to === path);
        if (article?.title)
            return (
                <BlogCard
                    key={article.title}
                    blogArticle={article}
                    visits={visits ? visits[article.to] : 0}
                    readingTime={article?.readingTime}
                    codeTime={article?.codeTime}
                    likes={likes ? likes[article.to] : 0}
                    path={article.to}
                    newest={false}
                />
            );
    };

    if (articles)
        return (
            <div className="SuggestedArticles">
                <h3>Suggested Articles</h3>
                {articles.map((article) => getBlogArticle(article))}
            </div>
        );
};

export default SuggestedArticles;
