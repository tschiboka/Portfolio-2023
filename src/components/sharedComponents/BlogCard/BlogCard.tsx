import { BlogArticle } from "../../articles/artiles";
import { getColourName } from "../../pages/Projects/getProjects";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaEye, FaCode } from "react-icons/fa";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { useState } from "react";
import { postLike } from "../../../serverAPI/likes";
import "./BlogCard.scss";

interface Props {
    blogArticle: BlogArticle;
    visits: number;
    readingTime?: string | undefined;
    codeTime?: string | undefined;
    likes: number;
    path: string;
    upcoming?: boolean;
    newest: boolean;
}

const BlogCard = ({
    blogArticle,
    visits,
    readingTime,
    codeTime,
    likes,
    path,
    newest,
}: Props) => {
    const navigate = useNavigate();
    const [articleLiked, setArticleLiked] = useState(false);

    return (
        <article className="BlogCard" onClick={() => navigate(blogArticle.to)}>
            <div className="BlogCard__img-wrapper">
                {blogArticle.upcoming && (
                    <div className="BlogCard__upcoming-overlay">
                        <BsFillCalendar2DateFill className="BlogCard__overlay-icon" />
                        <span className="BlogCard__upcoming-date">
                            {blogArticle.upcomingDate}
                        </span>
                    </div>
                )}
                {newest && (
                    <div className="BlogCard__new-overlay">
                        <AiFillStar className="BlogCard__overlay-icon--new" />
                        <span className="BlogCard__new-text">New</span>
                    </div>
                )}
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
                            <span className="BlogCard__info-text">
                                {readingTime || "-"}
                            </span>
                            <span className="BlogCard__hint-text">
                                Reading&nbsp;Time
                            </span>
                        </span>
                        <span className="BlogCard__info-datablock">
                            <FaCode className="BlogCard__info-icon" />
                            <span className="BlogCard__info-text">
                                {codeTime || "-"}
                            </span>
                            <span className="BlogCard__hint-text">
                                Code&nbsp;Time
                            </span>
                        </span>

                        <span
                            className="BlogCard__info-datablock like"
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                if (!articleLiked)
                                    postLike(path, () => setArticleLiked(true));
                                return false;
                            }}
                        >
                            <AiFillHeart
                                className={
                                    "BlogCard__info-icon " +
                                    (articleLiked ? "disabled" : "")
                                }
                            />
                            <span className="BlogCard__info-text">
                                {(!articleLiked ? likes : (likes || 0) + 1) ||
                                    "-"}
                            </span>
                            <span className="BlogCard__hint-text">
                                Likes&nbsp;Given
                            </span>
                        </span>
                        <span className="BlogCard__info-datablock">
                            <FaEye className="BlogCard__info-icon" />
                            <span className="BlogCard__info-text">
                                {visits || "-"}
                            </span>
                            <span className="BlogCard__hint-text">
                                Times&nbsp;Read
                            </span>
                        </span>
                    </span>
                </header>
                <p className="BlogCard__abstract">{blogArticle.abstract}</p>
            </div>
        </article>
    );
};

export default BlogCard;
