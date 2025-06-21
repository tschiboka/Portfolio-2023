export const getURL = () => {
    // Skip Posting Localhost Visits
    const hostname = window.location.hostname; // Get the current hostname (domain) of the website

    if (hostname === "localhost" || hostname === "127.0.0.1")
        return "http://localhost:5000";
    return "https://portfolio-2023-nf5z.onrender.com";
};
