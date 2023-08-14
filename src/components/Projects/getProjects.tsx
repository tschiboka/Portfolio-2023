import riffMasterImg from "../../assets/images/projects/RiffMaster.png";
import personalTrainerImg from "../../assets/images/projects/FrancescoLevo.png";
import gradientGeneratorImg from "../../assets/images/projects/GradientGenerator.png";
import rainCheckImg from "../../assets/images/projects/RainCheck.png";
import greenRooftopImg from "../../assets/images/projects/GreenRooftop.png";
import fruitsAndFlowersImg from "../../assets/images/projects/FruitsAndFlowers.png";
import pocketTutorImg from "../../assets/images/projects/PocketTutor.png";
import { Project } from "./Projects";

const projects: Project[] = [
    {
        title: "RiffMaster Guitar Studio",
        image: riffMasterImg,
        description:
            "My groundbreaking project aims to revolutionise how we learn and play the guitar. With a custom-designed digital guitar controller and an interactive web application, RiffMaster offers an entertaining and educative musical experience for both beginners and experienced guitarists. The platform provides comprehensive lessons and enables composing and playing real-time music games with RiffMaster's innovative hardware and software fusion.",
        badges: ["HTML", "CSS", "JavaScript", "Arduino", "NodeJs", "Mongodb"],
        url: "https://tschiboka.co.uk/projects/riffmaster/index.html",
        github: "https://github.com/tschiboka/RiffMaster",
        readMoreLink: "/blog/riffmaster",
    },
    {
        title: "Personal Trainer Website",
        image: personalTrainerImg,
        description:
            "I crafted a sleek portfolio website for my personal trainer client to expand his reach. This website features a minimalist dark web design, a powerful logo representing his brand identity, seamless multiple language support, testimonials, personal statements, health and nutritional recommendations, a user-friendly Google Calendar integration for easy bookings, and a contact form to communicate with potential clients.",
        badges: ["HTML", "CSS", "JavaScript", "NodeJs", "Mongodb"],
        url: "",
        github: "",
    },
    {
        title: "Gradient & Pattern Generator",
        image: gradientGeneratorImg,
        description:
            "Generating intricate CSS code becomes a breeze. With a comprehensive range of linear and radial gradient tools and pattern samples, you can easily adjust your designs using intuitive sliders, bypassing the need for lengthy vendor-specific CSS code. Creating captivating CSS patterns has never been more straightforward, featuring a custom colour picker, with palettes of websafe colours (rgba, hsl and hex), and support for various CSS units and angles.",
        badges: ["React", "CSS"],
        url: "https://tschiboka.co.uk/projects/pattern_generator/index.html",
        github: "",
    },
    {
        title: "Raincheck Mobile App",
        image: rainCheckImg,
        description:
            "RainCheck is a comprehensive tool designed to provide users with relevant weather information at their fingertips. Offering user-friendly time and location formatting and essential weather features such as temperature, wind speed, precipitation, and humidity. With hourly and daily breakdowns, users can confidently plan their activities. Additionally, the app boasts a settings screen for metric/imperial toggling and location selection, all wrapped in straightforward navigation for seamless usability.",
        badges: ["React Native"],
        url: "",
        github: "https://github.com/tschiboka/RainCheck",
    },
    {
        title: "Green Rooftop IoT Device & App",
        image: greenRooftopImg,
        description:
            "The GreenRoof project is dedicated to building a sustainable urban environment by offering an innovative IoT device that facilitates the monitoring and maintaining green rooftops. This cutting-edge technology allows rooftop owners and service providers to access real-time data on soil moisture, temperature, humidity, light, and rainwater tank status. The website complements the device by providing an intuitive interface for users to view their data effortlessly. GreenRoof is shaping a greener and more sustainable future for urban landscapes by promoting eco-awareness and natural living spaces.",
        badges: ["HTML", "CSS", "JavaScript", "Arduino", "NodeJs", "Mongodb"],
        url: "https://tschiboka.co.uk/projects/green-rooftop/index.html",
        github: "https://github.com/tschiboka/GreenRooftop",
    },
    {
        title: "Fruits & Flowers Game",
        image: fruitsAndFlowersImg,
        description:
            "Fruits and Flowers began as a personal challenge to test my JavaScript skills and evolved into a captivating game with over 100 levels. Unlike traditional match-three games, Fruits and Flowers offers unique challenges with special gems, adding extra layers of complexity. Players can earn in-game points to acquire unique gems that provide advantages at tougher levels. While this early project may not adhere to all programming best practices, it holds a special place in my heart as a significant milestone in my development journey.",
        badges: ["HTML", "Sass", "JavaScript"],
        url: "https://tschiboka.co.uk/projects/fruits_n_flowers_v2/fruits_n_flowers.html",
        github: "https://github.com/tschiboka/fruits_n_flowers_v2",
    },
    {
        title: "Pocket Tutor App",
        image: pocketTutorImg,
        description:
            "Pocket Tutor is a versatile app that facilitates autodidactic learning through interactive flashcards, perfect for on-the-go practice. With the ability to create custom topic badges and flashcards, users can quickly test their knowledge anytime, anywhere. The flashcards support code snippets with syntax highlighting for HTML, CSS, and JavaScript, making them ideal for aspiring developers. To tailor their learning experience, users can set test difficulties and track their progress using insightful performance diagrams. Pocket Tutor empowers learners to take charge of their education and deepen their understanding.",
        badges: ["HTML", "CSS", "React"],
        url: "https://tschiboka.co.uk/projects/pocket-tutor/index.html",
        github: "https://github.com/tschiboka/Pocket-Tutor",
    },
];

export function getColourName(str: string) {
    switch (str.toLowerCase()) {
        case "html":
            return "orange";
        case "css":
            return "blue";
        case "javascript":
            return "yellow";
        case "react":
            return "light-blue";
        case "react native":
            return "light-blue";
        case "typescript":
            return "blue";
        case "sass":
            return "pink";
        case "arduino":
            return "light-blue";
        case "nodejs":
            return "light-green";
        case "mongodb":
            return "green";
        case "photoshop":
            return "light-blue";
        case "illustrator":
            return "orange";
        default:
            return "white";
    }
}

export const getProjects = () => projects;
