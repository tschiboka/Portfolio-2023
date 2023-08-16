import riffmasterHardwareImg from "../../assets/images/blog/riffmasterHardware.png";
import riffMasterJamImg from "../../assets/images/blog/riffmasterJam.png";
import calendarImg from "../../assets/images/blog/calendar.png";

export interface BlogArticle {
    title: string;
    image: string;
    imageAlt: string;
    abstract: string;
    badges: string[];
    to: string;
}

export const blogArticles: BlogArticle[] = [
    {
        title: "Digital Guitar - Hardware",
        image: riffmasterHardwareImg,
        imageAlt: "guitar",
        abstract:
            "Let's create a guitar console with Arduino that sends data through a USB cable using a keyboard library to build a guitar web application. Discover matrix wiring and keyboard debounce handling.",
        badges: ["Arduino"],
        to: "/blog/riffmaster",
    },
    {
        title: "Digital Guitar - Make Guitar Sounds with Howler",
        image: riffMasterJamImg,
        imageAlt: "guitar",
        abstract:
            "In this article, we create a keyboard listener for our digital guitar and translate our protocols into appropriate notes. We'll also build a digital interface for our guitar jam page that displays the guitar fretboard and user actions.",
        badges: ["JavaScript", "CSS"],
        to: "/blog/jamsession",
    },
    {
        title: "Validating Dates with JavaScript",
        image: calendarImg,
        imageAlt: "guitar",
        abstract:
            "I bumped into a problem involving JavaScript date validation, formatting and leap years. Let's explore our options.",
        badges: ["JavaScript"],
        to: "/blog/js-date-validation",
    },
];
