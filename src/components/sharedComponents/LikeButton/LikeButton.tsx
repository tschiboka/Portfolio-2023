import { AiFillHeart } from "react-icons/ai";
import "./LikeButton.scss";
import { useEffect, useState } from "react";

interface Props {
    path: string;
}

const LikeButton = ({ path }: Props) => {
    const [articleLiked, setArticleLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [likesLoaded, setLikesLoaded] = useState(false);

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

    const getLikes = async (path: string) => {
        //const URLLocal = "http://localhost:5000/like";
        const URLLive = "https://drab-rose-wombat-shoe.cyclic.app/like";
        const URL = URLLive;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const response = await fetch(`${URL}?path=${path}`, options);
            const responseJSON = await response.json();
            if (responseJSON.success) {
                setLikesLoaded(true);
                const likes = responseJSON.likes;
                setLikes(likes);
            } else console.log("Error While Getting Like Data!", response);
        } catch (err) {
            console.log("Error While Getting Like Data!", err);
        }
    };

    useEffect(() => {
        if (!likesLoaded) getLikes(path);
    }, [likes]);

    return (
        <div className="LikeButton">
            <hr />
            <p>Like What You Read? Show Me Your Support!</p>
            <div
                className="LikeButton__button-wrapper"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!articleLiked) postLike(path);
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
