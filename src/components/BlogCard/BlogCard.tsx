import { BlogArticle } from "../Blog/blogs";
import { getColourName } from "../Projects/getProjects";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaEye, FaCode } from "react-icons/fa";
import "./BlogCard.scss";

interface Props {
    blogArticle: BlogArticle;
}

const BlogCard = ({ blogArticle }: Props) => {
    const visits = 0;
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
                <header className="BlogCard__title">
                    <span className="BlogCard__title-text">
                        {blogArticle.title}
                    </span>
                    <span className="BlogCard__info">
                        <span className="BlogCard__info-datablock">
                            <BiSolidTimeFive className="BlogCard__info-icon" />
                            <span className="BlogCard__info-text">5 min</span>
                            <span className="BlogCard__hint-text">
                                Reading&nbsp;Time
                            </span>
                        </span>
                        <span className="BlogCard__info-datablock">
                            <FaCode className="BlogCard__info-icon" />
                            <span className="BlogCard__info-text">2 hour</span>
                            <span className="BlogCard__hint-text">
                                Code&nbsp;Time
                            </span>
                        </span>

                        <span className="BlogCard__info-datablock">
                            <AiFillHeart className="BlogCard__info-icon" />
                            <span className="BlogCard__info-text">10102</span>
                            <span className="BlogCard__hint-text">Liked</span>
                        </span>
                        <span className="BlogCard__info-datablock">
                            <FaEye className="BlogCard__info-icon" />
                            <span className="BlogCard__info-text">
                                {visits || "133484"}
                            </span>
                            <span className="BlogCard__hint-text">Read</span>
                        </span>
                    </span>
                </header>
                <p className="BlogCard__abstract">{blogArticle.abstract}</p>
            </div>
        </article>
    );
};

export default BlogCard;
