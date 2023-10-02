// Icons
import FalmouthUniversityIcon from "../../../assets/images/certificates/icons/falmouth_university_icon.png";
import IconCollegeIcon from "../../../assets/images/certificates/icons/icon_college_icon.png";
import UdemiIcon from "../../../assets/images/certificates/icons/udemi_icon.webp";
import MoshIcon from "../../../assets/images/certificates/icons/mosh_icon.png";
import FCCIcon from "../../../assets/images/certificates/icons/fcc_icon.webp";

// Certificates
import HNDImg from "../../../assets/images/certificates/HND_Computing_Diploma_Part_1.pdf";
import ReacTestingImg from "../../../assets/images/certificates/Udemi_React_Testing_Library and Jest_Certificate.pdf";
import TypeScriptImg from "../../../assets/images/certificates/Mosh_TypeScript_Certificate.pdf";
import ReactImg from "../../../assets/images/certificates/Mosh_React_18_Certificate_1.pdf";
import NodeJsImg from "../../../assets/images/certificates/Mosh_NodeJS_Certificate.pdf";
import DataStructures3Img from "../../../assets/images/certificates/Mosh_Data_Structures_Certificate_3.pdf";
import DataStructures1Img from "../../../assets/images/certificates/Mosh_Data_Structures_Certificate_1.pdf";
import FCCImg from "../../../assets/images/certificates/FCC_Frontend_Certificate.png";
import FCCAlgorithmsImg from "../../../assets/images/certificates/FCC_Data_Structures_and_Algorithms.png";

export interface Achievement {
    title: string;
    details?: string[];
    year: number;
    image?: string;
    image_alt?: string; 
    certificate_img?: string;
}

export const academicAchievements:Achievement[] = [
    {
        title: "BSc Hons Software Engineering",
        details: ["(First Class)", "Falmouth University"],
        year: 2023,
        image: FalmouthUniversityIcon,
        image_alt: "Falmouth University",
        certificate_img: "",
    },
    {
        title: "HND Computing",
        details: ["(Distinction)", "Icon College"],
        year: 2022,
        image: IconCollegeIcon,
        image_alt: "",
        certificate_img: HNDImg,
    },
];

export const certificateAchievements:Achievement[] = [
    {
        title: "React Testing Library and Jest",
        details: ["[ Online - Udemi ]"],
        year: 2023,
        image: UdemiIcon,
        image_alt: "",
        certificate_img: ReacTestingImg,
    },
    {
        title: "TypeScript Course",
        details: ["[ Online - Mosh ]"],
        year: 2023,
        image: MoshIcon,
        image_alt: "",
        certificate_img: TypeScriptImg,
    },
    {
        title: "React Course",
        details: ["[ Online - Mosh ]"],
        year: 2023,
        image: MoshIcon,
        image_alt: "",
        certificate_img: ReactImg,
    },
    {
        title: "NodeJs Course",
        details: ["[ Online - Mosh ]"],
        year: 2022,
        image: MoshIcon,
        image_alt: "",
        certificate_img: NodeJsImg,
    },
    {
        title: "Data Structures and Algorithms 2",
        details: ["[ Online - Mosh ]"],
        year: 2021,
        image: MoshIcon,
        image_alt: "",
        certificate_img: DataStructures3Img,
    },
    {
        title: "Data Structures and Algorithms 1",
        details: ["[ Online - Mosh ]"],
        year: 2021,
        image: MoshIcon,
        image_alt: "",
        certificate_img: DataStructures1Img,
    },
    {
        title: "Frontend Development Certificate",
        details: ["[ Online - FreeCodeCamp ]"],
        year: 2018,
        image: FCCIcon,
        image_alt: "",
        certificate_img: FCCImg,
    },
    {
        title: "Algorithms and Data Structures",
        details: ["Fundamentals", "[ Online - FreeCodeCamp ]"],
        year: 2018,
        image: FCCIcon,
        image_alt: "",
        certificate_img: FCCAlgorithmsImg,
    },
];

export default Achievement;