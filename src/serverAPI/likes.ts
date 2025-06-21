import { getURL } from "./getURL";
import { LikeCount } from "../components/pages/Blog/Blog";

export const getLikes = async (
    path: string,
    callback: (likes: number) => void
) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${getURL()}/like?path=${path}`, options);
        const responseJSON = await response.json();
        if (responseJSON.success) {
            callback(responseJSON.likes);
        } else console.log("Error While Getting Like Data!", response);
    } catch (err) {
        console.log("Error While Getting Like Data!", err);
    }
};

export const getLikeSummary = async (callback: (likes: LikeCount) => void) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${getURL()}/like`, options);
        const responseJSON = await response.json();

        if (responseJSON.success) {
            callback(responseJSON.likes);
        } else console.log("Error While Getting Like Data!", response);
    } catch (err) {
        console.log("Error While Getting Like Data!", err);
    }
};

export const postLike = async (path: string, callback: () => void) => {
    //const URLLocal = "http://localhost:5000/like";
    const URLLive = "https://portfolio-2023-nf5z.onrender.com/like";
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
            callback();
        } else console.log("Error While Getting Like Data!", response);
    } catch (err) {
        console.log("Error While Getting Like Data!", err);
    }
};
