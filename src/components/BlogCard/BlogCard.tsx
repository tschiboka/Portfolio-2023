import { BlogArticle } from "../Blog/blogs";
import { getColourName } from "../Projects/getProjects";
import { useNavigate } from "react-router-dom";
import "./BlogCard.scss";

interface Props {
    blogArticle: BlogArticle;
}

const BlogCard = ({ blogArticle }: Props) => {
    const navigate = useNavigate();
    return (
        <article className="BlogCard" onClick={() => navigate(blogArticle.to)}>
            <div className="BlogCard__img-wrapper">
                <div className="BlogCard__badge-box">
                    {blogArticle.badges.map((badge, index) => (
                        <span
                            key={badge + index}
                            className={"badge " + getColourName(badge)}
                        >
                            {badge}
                        </span>
                    ))}
                </div>

                <img src={blogArticle.image} alt={blogArticle.imageAlt} />
            </div>
            <div className="BlogCard__text-wrapper">
                <header className="BlogCard__title">{blogArticle.title}</header>

                <p className="BlogCard__abstract">{blogArticle.abstract}</p>
            </div>
        </article>
    );
};

export default BlogCard;
