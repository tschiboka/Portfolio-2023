import { createHashRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import About from "../components/About/About";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";
import PrivacyPolicy from "../components/PrivacyPolicy/PrivacyPolicy";
import RiffMaster from "../components/RiffMaster/RiffMaster";
import RouteError from "../components/RouteError/RouteError";
import Blog from "../components/Blog/Blog";

export const routes = [
    {
        path: "/",
        element: <Home pageName="home" path="/" />,
    },
    {
        path: "/about",
        element: <About pageName="about" path="/about" />,
    },
    {
        path: "/projects",
        element: <Projects pageName="projects" path="/projects" />,
    },
    {
        path: "/contact",
        element: <Contact pageName="contact" path="/contact" />,
    },
    {
        path: "/privacy-policy",
        element: (
            <PrivacyPolicy pageName="privacy-policy" path="/privacy-policy" />
        ),
    },
    {
        path: "/blog",
        element: <Blog pageName="blog" path="/blog" />,
    },
    {
        path: "/blog/riffmaster",
        element: <RiffMaster pageName="riffmaster" path="/blog/riffmaster" />,
    },
    {
        path: "/*",
        element: <RouteError />,
    },
];

const router = createHashRouter(routes);

export default router;
