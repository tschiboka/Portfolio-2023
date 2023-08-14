import { ReactNode, useEffect } from "react";

interface Props {
    children: ReactNode;
    title: string;
    path: string;
}

const recordVisit = async (path: string) => {
    // Skip Posting Localhost Visits
    const hostname = window.location.hostname; // Get the current hostname (domain) of the website
    if (hostname === "localhost" || hostname === "127.0.0.1") return;

    // Submit Form
    //const URLLocal = "http://localhost:5000/visit";
    const URLLive = "https://drab-rose-wombat-shoe.cyclic.app/visit";
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
        console.log("RESPONSE", responseJSON);
        if (responseJSON.success) {
            console.log("Visit Recorded");
        } else console.log("Error While Sending Visit!", response);
    } catch (err) {
        console.log("Error While Sending Message!", err);
    }
};

const Page = ({ children, title, path }: Props) => {
    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);
        recordVisit(path);
    });
    return <>{children}</>;
};

export default Page;
