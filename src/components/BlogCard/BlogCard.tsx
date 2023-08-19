import { BlogArticle } from "../Blog/blogs";
import { getColourName } from "../Projects/getProjects";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidTimeFive } from "react-icons/bi";
import { FaEye, FaCode } from "react-icons/fa";
import "./BlogCard.scss";
import { useState } from "react";

interface Props {
    blogArticle: BlogArticle;
    visits: number;
    readingTime?: string | undefined;
    codeTime?: string | undefined;
    likes: number;
    path: string;
}

const BlogCard = ({
    blogArticle,
    visits,
    readingTime,
    codeTime,
    likes,
    path,
}: Props) => {
    const navigate = useNavigate();
    const [articleLiked, setArticleLiked] = useState(false);

    const postLike = async (path: string) => {
        //const URLLocal = "http://localhost:5000/like";
        const URLLive = "https://drab-rose-wombat-shoe.cyclic.app/like";
        const URL = URLLive;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ path: path }),
        };

        try {
            const response = await fetch(`${URL}`, options);
            const responseJSON = await response.json();
            if (responseJSON.success) {
                setArticleLiked(true);
            } else console.log("Error While Getting Like Data!", response);
        } catch (err) {
            console.log("Error While Getting Like Data!", err);
        }
    };

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
                                if (!articleLiked) postLike(path);
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
                                {(!articleLiked ? likes : likes + 1) || "-"}
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
