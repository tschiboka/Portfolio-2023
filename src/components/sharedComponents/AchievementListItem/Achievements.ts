// Icons
import FalmouthUniversityIcon from '@portfolio/assets/certificates/icons/falmouth_university_icon.png'
import IconCollegeIcon from '@portfolio/assets/certificates/icons/icon_college_icon.png'
import UdemiIcon from '@portfolio/assets/certificates/icons/udemi_icon.webp'
import MoshIcon from '@portfolio/assets/certificates/icons/mosh_icon.png'
import FCCIcon from '@portfolio/assets/certificates/icons/fcc_icon.webp'
// Certificates
import HNDImg from '@portfolio/assets/certificates/HND_Computing_Diploma_Part_1.png'
import ReacTestingImg from '@portfolio/assets/certificates/Udemi_React_Testing_Library and Jest_Certificate.png'
import TypeScriptImg from '@portfolio/assets/certificates/Mosh_TypeScript_Certificate.png'
import ReactImg from '@portfolio/assets/certificates/Mosh_React_18_Certificate_1.png'
import NodeJsImg from '@portfolio/assets/certificates/Mosh_NodeJS_Certificate.png'
import DataStructures3Img from '@portfolio/assets/certificates/Mosh_Data_Structures_Certificate_3.png'
import DataStructures1Img from '@portfolio/assets/certificates/Mosh_Data_Structures_Certificate_1.png'
import FCCImg from '@portfolio/assets/certificates/FCC_Frontend_Certificate.png'
import FCCAlgorithmsImg from '@portfolio/assets/certificates/FCC_Data_Structures_and_Algorithms.png'

export interface Achievement {
    title: string
    details?: string[]
    year: number
    image?: string
    image_alt?: string
    certificate_img?: string
}

export const academicAchievements: Achievement[] = [
    {
        title: 'BSc Hons Software Engineering',
        details: ['(First Class)', 'Falmouth University'],
        year: 2023,
        image: FalmouthUniversityIcon,
        image_alt: 'Falmouth University',
        certificate_img: '',
    },
    {
        title: 'HND Computing',
        details: ['(Distinction)', 'Icon College'],
        year: 2022,
        image: IconCollegeIcon,
        image_alt: '',
        certificate_img: HNDImg,
    },
]

export const certificateAchievements: Achievement[] = [
    {
        title: 'React Testing Library and Jest',
        details: ['[ Online - Udemi ]'],
        year: 2023,
        image: UdemiIcon,
        image_alt: '',
        certificate_img: ReacTestingImg,
    },
    {
        title: 'TypeScript Course',
        details: ['[ Online - Mosh ]'],
        year: 2023,
        image: MoshIcon,
        image_alt: '',
        certificate_img: TypeScriptImg,
    },
    {
        title: 'React Course',
        details: ['[ Online - Mosh ]'],
        year: 2023,
        image: MoshIcon,
        image_alt: '',
        certificate_img: ReactImg,
    },
    {
        title: 'NodeJs Course',
        details: ['[ Online - Mosh ]'],
        year: 2022,
        image: MoshIcon,
        image_alt: '',
        certificate_img: NodeJsImg,
    },
    {
        title: 'Data Structures and Algorithms 2',
        details: ['[ Online - Mosh ]'],
        year: 2021,
        image: MoshIcon,
        image_alt: '',
        certificate_img: DataStructures3Img,
    },
    {
        title: 'Data Structures and Algorithms 1',
        details: ['[ Online - Mosh ]'],
        year: 2021,
        image: MoshIcon,
        image_alt: '',
        certificate_img: DataStructures1Img,
    },
    {
        title: 'Frontend Development Certificate',
        details: ['[ Online - FreeCodeCamp ]'],
        year: 2018,
        image: FCCIcon,
        image_alt: '',
        certificate_img: FCCImg,
    },
    {
        title: 'Algorithms and Data Structures',
        details: ['Fundamentals', '[ Online - FreeCodeCamp ]'],
        year: 2018,
        image: FCCIcon,
        image_alt: '',
        certificate_img: FCCAlgorithmsImg,
    },
]

export default Achievement
