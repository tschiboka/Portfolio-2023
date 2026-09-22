// @ts-nocheck — skill example, outside the tsconfig include.

// The one host resolver. It reads the browser's own hostname, so the deployed
// bundle calls the deployed API with no build step. A third environment arrives
// as a branch here, never as a variable read elsewhere.
export const getURL = () => {
    const hostname = window.location.hostname

    if (hostname === 'localhost' || hostname === '127.0.0.1') return 'http://localhost:5000'
    return 'https://portfolio-2023.onrender.example'
}
