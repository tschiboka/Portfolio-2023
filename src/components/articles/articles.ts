import riffmasterHardwareImg from "../../assets/images/blog/riffmasterHardware.png";
import riffMasterJamImg from "../../assets/images/blog/riffmasterJam.png";
import calendarImg from "../../assets/images/blog/calendar.png";
import mcdonaldsImg from "../../assets/images/blog/mcdonaldsNeon.png";
import jsSortingImg from "../../assets/images/blog/jsSorting.png";
import greenRooftopImg from "../../assets/images/blog/grass.png";
import emailImg from "../../assets/images/blog/email.png";
import anatomyImg from "../../assets/images/blog/anatomy.png";

export interface BlogArticle {
    title: string;
    image: string;
    imageAlt: string;
    abstract: string;
    badges: string[];
    to: string;
    readingTime?: string;
    codeTime?: string;
    suggestedArticles?: string[];
    created?: string;
    updated?: string;
    upcoming?: boolean;
    upcomingDate?: string;
}

export const blogArticles: BlogArticle[] = [
    {
        title: "Digital Guitar - Hardware",
        image: riffmasterHardwareImg,
        imageAlt: "Guitar",
        abstract:
            "Let's create a guitar console with Arduino that sends data through a USB cable using a keyboard library to build a guitar web application. Discover matrix wiring and keyboard debounce handling.",
        badges: ["Arduino"],
        to: "/blog/riffmaster",
        readingTime: "13 mins",
        codeTime: "5 weeks",
        suggestedArticles: ["/blog/sounds-with-howler", "/blog/green-rooftop"],
        created: "06.08.2023",
        updated: "11.08.2023",
    },
    {
        title: "Digital Guitar - Make Guitar Sounds with Howler",
        image: riffMasterJamImg,
        imageAlt: "Music Sheet",
        abstract:
            "In this article, we create a keyboard listener for our digital guitar and translate our protocols into appropriate notes. We'll also build a digital interface for our guitar jam page that displays the guitar fretboard and user actions.",
        badges: ["JavaScript", "CSS"],
        to: "/blog/sounds-with-howler",
        readingTime: "10 mins",
        codeTime: "2 hours",
        suggestedArticles: ["/blog/riffmaster"],
        created: "13.08.2023",
        updated: "24.08.2023",
    },
    {
        title: "Validating Dates with JavaScript",
        image: calendarImg,
        imageAlt: "Calendar",
        abstract:
            "I bumped into a problem involving JavaScript date validation, formatting and leap years. Let's explore our options.",
        badges: ["JavaScript"],
        to: "/blog/js-date-validation",
        readingTime: "3 mins",
        codeTime: "15 mins",
        suggestedArticles: ["/blog/js-sorting"],
        created: "15.08.2023",
        updated: "18.08.2023",
    },
    {
        title: "JavaScript's Sorting - What's behind the Hood?",
        image: jsSortingImg,
        imageAlt: "Sorting",
        abstract:
            "Delve into the intricate inner workings of JavaScript's built-in sorting mechanism. Uncover the magic behind Array.sort() as we dissect the comparison functions, sorting stability, and optimisation strategies employed by the language.",
        badges: ["javascript"],
        to: "/blog/js-sorting",
        readingTime: "10 mins",
        suggestedArticles: ["/blog/js-date-validation"],
        codeTime: "",
        created: "05.09.2023",
    },
    {
        title: "Green Rooftop - An Arduino IoT Project",
        image: greenRooftopImg,
        imageAlt: "Grass",
        abstract:
            "An ideal IoT project for beginners. Learn how to measure temperature, humidity, moisture, light, and water tank levels while creating a UI with buttons for easy navigation. We'll also use NodeJS to show you how to build a simple API to access real-time and historical sensory data.",
        badges: ["Arduino", "NodeJs"],
        to: "/blog/green-rooftop",
        readingTime: "5 mins",
        codeTime: "4 hours",
        suggestedArticles: ["/blog/riffmaster"],
        created: "05.09.2023",
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
        upcomingDate: "10.11.2023",
    },
    {
        title: "Scheduling Emails with Cyclic",
        image: emailImg,
        imageAlt: "Email",
        abstract:
            "Discover a solution for scheduling emails with Node.js in unconventional hosting environments like Cyclic. Learn why traditional Node schedulers may not work and explore my workaround involving a separate post path for scheduling within your application and the Cron scheduler.",
        badges: ["NodeJs", "Express"],
        to: "/blog/cyclic-email-scheduling",
        readingTime: "3 min",
        codeTime: "15 min",
        suggestedArticles: ["/blog/js-sorting", "/blog/js-date-validation"],
        created: "11.09.2023"
    },
    {
        title: "Brief Anatomy of React",
        image: anatomyImg,
        imageAlt: "Anatomy",
        abstract:
            "My last interview questions drifted towards the exciting topics of how React works internally, so here is my brief research on this subject in hindsight. We'll cover virtual DOM, component architecture, JSX transformations, rendering processes, and more.",
        badges: ["React"],
        to: "/blog/brief-react-anatomy",
        readingTime: "5 min",
        codeTime: "",
        suggestedArticles: ["/blog/js-sorting", "/blog/js-date-validation"],
        created: "10.10.2023"
    },
];
