import { getURL } from "./getURL";
import { VisitCount } from "../components/pages/Blog/Blog";

export const getVisits = async (
    path: string,
    callback: (visits: number) => void
) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${getURL()}/visit?path=${path}`, options);
        const responseJSON = await response.json();
        if (responseJSON.success) callback(responseJSON.visits)
    } catch (err) {
        console.log("Error While Sending Message!", err);
    }
};

export const getVisitSummary = async (
    callback: (visits: VisitCount) => void
) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(`${getURL()}/visit`, options);
        const responseJSON = await response.json();
        if (responseJSON.success) callback(responseJSON.visits);
    } catch (err) {
        console.log("Error While Getting Visits Data!", err);
    }
};

export const postVisit = async (path: string) => {
    // Skip Posting Localhost Visits
    const hostname = window.location.hostname; // Get the current hostname (domain) of the website
    if (hostname === "localhost" || hostname === "127.0.0.1") return;

    // Submit Form
    //const URLLocal = "http://localhost:5000/visit";
    const URLLive = "https://portfolio-2023-nf5z.onrender.com/visit";
    const URL = URLLive;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ path: path }),
    };

    try {
        const response = await fetch(URL, options);
        const responseJSON = await response.json();
        if (responseJSON.success) console.log("Visit Recorded");
    } catch (err) {
        console.log("Error While Sending Message!", err);
    }
};
