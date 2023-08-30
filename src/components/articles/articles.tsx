import riffmasterHardwareImg from "../../assets/images/blog/riffmasterHardware.png";
import riffMasterJamImg from "../../assets/images/blog/riffmasterJam.png";
import calendarImg from "../../assets/images/blog/calendar.png";
import mcdonaldsImg from "../../assets/images/blog/mcdonaldsNeon.png";
import jsSortingImg from "../../assets/images/blog/jsSorting.png";

export interface BlogArticle {
    title: string;
    image: string;
    imageAlt: string;
    abstract: string;
    badges: string[];
    to: string;
    readingTime?: string;
    codeTime?: string;
    created?: string;
    updated?: string;
    upcoming?: boolean;
    upcomingDate?: string;
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
        readingTime: "13 mins",
        codeTime: "5 weeks",
        created: "06.08.2023",
        updated: "11.08.2023",
    },
    {
        title: "Digital Guitar - Make Guitar Sounds with Howler",
        image: riffMasterJamImg,
        imageAlt: "guitar",
        abstract:
            "In this article, we create a keyboard listener for our digital guitar and translate our protocols into appropriate notes. We'll also build a digital interface for our guitar jam page that displays the guitar fretboard and user actions.",
        badges: ["JavaScript", "CSS"],
        to: "/blog/sounds-with-howler",
        readingTime: "10 mins",
        codeTime: "2 hours",
        created: "13.08.2023",
        updated: "24.08.2023",
    },
    {
        title: "Validating Dates with JavaScript",
        image: calendarImg,
        imageAlt: "guitar",
        abstract:
            "I bumped into a problem involving JavaScript date validation, formatting and leap years. Let's explore our options.",
        badges: ["JavaScript"],
        to: "/blog/js-date-validation",
        readingTime: "3 mins",
        codeTime: "15 mins",
        created: "15.08.2023",
        updated: "18.08.2023",
    },
    {
        title: "Recreating McDonald's Ordering Kiosk UI",
        image: mcdonaldsImg,
        imageAlt: "McDonalds",
        abstract:
            "Discover the secrets of user-friendly UI design as we recreate McDonald's ordering kiosk interface. Learn the techniques behind its user-friendly layout while learning the fundamentals of Flexbox.",
        badges: ["HTML", "CSS"],
        to: "",
        readingTime: "",
        codeTime: "",
        upcoming: true,
        upcomingDate: "05.09.2023",
    },
    {
        title: "JavaScript's Sorting - What's behind the Hood?",
        image: jsSortingImg,
        imageAlt: "McDonalds",
        abstract:
            "Delve into the intricate inner workings of JavaScript's built-in sorting mechanism. Uncover the magic behind Array.sort() as we dissect the comparison functions, sorting stability, and optimisation strategies employed by the language.",
        badges: ["javascript"],
        to: "",
        readingTime: "",
        codeTime: "",
        upcoming: true,
        upcomingDate: "18.09.2023",
    },
];
