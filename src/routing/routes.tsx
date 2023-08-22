import { createHashRouter } from "react-router-dom";
import Home from "../components/pages/Home/Home";
import About from "../components/pages/About/About";
import Projects from "../components/pages/Projects/Projects";
import Contact from "../components/pages/Contact/Contact";
import PrivacyPolicy from "../components/pages/PrivacyPolicy/PrivacyPolicy";
import RiffMaster from "../components/articles/RiffMaster/RiffMaster";
import RouteError from "../components/sharedComponents/RouteError/RouteError";
import Blog from "../components/pages/Blog/Blog";
import JsDateValidation from "../components/articles/JsDateValidation/JsDateValidation";
import SoundsWithHowler from "../components/articles/SoundsWithHowler/SoundsWithHowler";

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
        path: "/blog/sounds-with-howler",
        element: (
            <SoundsWithHowler
                pageName="sounds-with-howler"
                path="/blog/sounds-with-howler"
            />
        ),
    },
    {
        path: "/blog/js-date-validation",
        element: (
            <JsDateValidation
                pageName="js-date-validation"
                path="/blog/js-date-validation"
            />
        ),
    },
    {
        path: "/*",
        element: <RouteError />,
    },
];

const router = createHashRouter(routes);

export default router;
