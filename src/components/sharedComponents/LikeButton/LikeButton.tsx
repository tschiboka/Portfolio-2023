import { AiFillHeart } from "react-icons/ai";
import "./LikeButton.scss";
import { postLike } from "../../../serverAPI/likes";

interface Props {
    path: string;
    likes: number;
    articleLiked: boolean;
    setArticleLiked: (liked: boolean) => void;
}

const LikeButton = ({ path, likes, articleLiked, setArticleLiked }: Props) => {
    return (
        <div className="LikeButton">
            <hr />
            <p>Like What You Read? Show Me Your Support!</p>
            <div
                className="LikeButton__button-wrapper"
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
                        "LikeButton__icon " + (articleLiked ? "disabled" : "")
                    }
                />
                <span>{(!articleLiked ? likes : likes + 1) || "-"}</span>
            </div>
        </div>
    );
};

export default LikeButton;
