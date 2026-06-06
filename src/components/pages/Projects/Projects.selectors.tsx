import riffMasterImg from '../../../assets/images/projects/RiffMaster.png'
import personalTrainerImg from '../../../assets/images/projects/FrancescoLevo.png'
import gradientGeneratorImg from '../../../assets/images/projects/GradientGenerator.png'
import rainCheckImg from '../../../assets/images/projects/RainCheck.png'
import greenRooftopImg from '../../../assets/images/projects/GreenRooftop.png'
import fruitsAndFlowersImg from '../../../assets/images/projects/FruitsAndFlowers.png'
import pocketTutorImg from '../../../assets/images/projects/PocketTutor.png'
import wordDuelArenaImg from '../../../assets/images/projects/wda.png'
import chordFinderImg from '../../../assets/images/projects/ChordFinder.png'
import uxStoriesImg from '../../../assets/images/projects/UxStories.png'
import typistImg from '../../../assets/images/projects/Typist.png'
import alienCharsImg from '../../../assets/images/projects/AlienChars.png'
import ticTacToeImg from '../../../assets/images/projects/TicTacToe.png'
import crayonsImg from '../../../assets/images/projects/Crayons.png'
import tschibokaDarkImg from '../../../assets/images/projects/TschibokaDark.png'
import adrikaClockImg from '../../../assets/images/projects/AdrikaClock.png'
import { Project } from './Projects'

const projects: Project[] = [
    {
        title: 'Word Duel Arena',
        year: 2026,
        type: 'featured',
        image: wordDuelArenaImg,
        description: (
            <>
                <span>
                    Word Duel Arena started as my first serious dive beyond REST APIs into real-time
                    WebSocket communication. I’ve always been into word games, so building my own
                    multiplayer version felt like the natural excuse to finally try it properly.
                </span>
                <br />
                <span>
                    The idea is simple: players challenge each other in real time, building words
                    from a shared set instead of playing against AI. I keep playing it with my
                    friends — winner gets bragging rights.
                </span>
            </>
        ),
        badges: ['React', 'TypeScript', 'NodeJs', 'Express', 'MongoDB', 'Jest', 'RTL'],

        url: '/projects/word-duel-arena',
    },
    {
        title: 'UX Library',
        year: 2026,
        type: 'featured',
        image: uxStoriesImg,
        description:
            'My evolving collection of interactive UX stories, built as an experiment in creating my own design system. I explore reusable components, layout primitives, and application patterns, while also experimenting with the balance between neumorphism and flat design. It acts as both a documentation hub and a development sandbox.',
        badges: ['React', 'TypeScript', 'Sass', 'Jest', 'RTL'],
        url: '/api/ux-stories',
    },
    {
        title: 'Typist',
        year: 2026,
        type: 'inProgress',
        image: typistImg,
        description: (
            <>
                <span>
                    Typist is an ongoing typing game project born out of frustration with how touch
                    typing is usually taught. It explores a different approach to lessons and
                    progression, aiming to make practice more engaging and intuitive.
                </span>
                <span>
                    Most importantly, it adapts to the user’s mistakes by generating the next level
                    based on their performance, helping them improve more effectively over time.
                </span>
            </>
        ),
        badges: ['React', 'TypeScript', 'NodeJs', 'Express', 'MongoDB'],
        url: '/projects/typist',
    },
    {
        title: 'RiffMaster Guitar Studio',
        year: 2023,
        type: 'featured',
        image: riffMasterImg,
        description: (
            <>
                <span>
                    RiffMaster is the project I’m most proud of — my dissertation work, where I
                    designed and built a custom digital guitar controller alongside an interactive
                    web app. It blends learning and gameplay, letting users play and learn guitar
                    through real-time interaction.
                </span>
                <br />
                <span>
                    It remains one of the most challenging engineering projects I’ve worked on to
                    date, but also one of the most rewarding and creative experiences I’ve ever had
                    in engineering, ultimately earning the highest grade for my dissertation.
                </span>
            </>
        ),
        badges: ['HTML', 'CSS', 'JavaScript', 'Arduino', 'NodeJs', 'Mongodb'],
        url: 'https://tschiboka.com/projects/riffmaster/index.html',
        github: 'https://github.com/tschiboka/RiffMaster',
        blog: '/blog/riffmaster',
    },
    {
        title: 'Chord Finder',
        year: 2022,
        type: 'complete',
        image: chordFinderImg,
        description: (
            <>
                <span>
                    A guitar chord exploration tool that generates all possible fretboard voicings
                    from a selected root note, bass note, and chord variation. It maps them across
                    the entire neck, making it easier to find alternative fingerings and inversions.
                </span>
                <br />
                <span>
                    It grew out of my RiffMaster project, but I still use it often myself — to the
                    point where I’m planning a full React rewrite with more advanced features.',
                </span>
            </>
        ),
        badges: ['HTML', 'CSS', 'JavaScript'],
        url: 'https://tschiboka.com/projects/riffmaster/src/pages/chords.html',
        blog: '/blog/sounds-with-howler',
    },
    {
        title: 'Tschiboka Dark VsCode Theme',
        year: 2026,
        type: 'complete',
        image: tschibokaDarkImg,
        description: (
            <>
                <span>
                    Tschiboka Dark is a custom VSCode theme I created for personal use. It’s built
                    around a restrained palette of vibrant accent colors designed to maintain
                    clarity while reducing visual noise during long coding sessions.
                </span>
                <br />
                <span>
                    It’s available on the VSCode Marketplace—feel free to download it and try it
                    out.
                </span>
            </>
        ),
        badges: ['Design'],
        url: 'https://marketplace.visualstudio.com/items?itemName=tschiboka.tschiboka-dark',
    },
    {
        title: 'Fruits & Flowers Game',
        year: 2019,
        type: 'complete',
        image: fruitsAndFlowersImg,
        description: (
            <>
                <span>
                    This game started as a JavaScript challenge and somehow turned into a fully
                    playable game with over 100 levels. It adds simple progression mechanics like
                    special gems and rewards to make gameplay more interesting.
                </span>
                <br />
                <span>
                    This entire thing lives in a single sprawling JS file — definitely reflecting my
                    ambition at the time more than my understanding of structure. But it works, and
                    it taught me a lot. I still keep it as a reference point — a snapshot of where I
                    was, and a reminder of what happens when you build first and figure out
                    architecture later.
                </span>
            </>
        ),
        badges: ['HTML', 'Sass', 'JavaScript'],
        url: 'https://tschiboka.com/projects/fruits_n_flowers/fruits_n_flowers.html',
        github: 'https://github.com/tschiboka/fruits_n_flowers_v2',
    },
    {
        title: 'Alien Typography',
        year: 2024,
        type: 'inProgress',
        image: alienCharsImg,
        description: (
            <>
                <span>
                    An experimental writing system inspired by how an alien civilization might
                    communicate through text. Built from a limited set of recurring shapes, the
                    script combines and connects multiple characters into larger glyphs.
                </span>
                <br />
                <span>
                    Part linguistic curiosity, part design exercise, it explores how an unfamiliar
                    writing system could remain learnable while feeling distinctly non-human. I
                    revisit it from time to time, refining character connections, visual rules, and
                    the logic that governs how symbols interact. The long-term goal is to develop it
                    into a complete typeface with ligatures—a functional font for creative projects
                    and encoded notes for your secret messages.
                </span>
            </>
        ),
        badges: ['HTML', 'CSS', 'JavaScript'],
        url: 'https://www.tschiboka.com/projects/alien_chars/index.html',
        github: 'https://github.com/tschiboka/Alien-Typography',
    },
    {
        title: 'Gradient & Pattern Generator',
        type: 'complete',
        year: 2018,
        image: gradientGeneratorImg,
        description: (
            <>
                <span>
                    This css code generator was one of my earliest serious projects, built before
                    university. It’s a visual tool for creating CSS gradients and patterns through
                    an interactive set of controls for colour, angle, and style adjustments.
                </span>
                <br />
                <span>
                    At the time, it felt like the peak of what I could build — a project that pushed
                    me into thinking more deeply about UI design, CSS, and interactive
                    experimentation.
                </span>
            </>
        ),
        badges: ['HTML', 'CSS', 'JavaScript'],
        url: 'https://tschiboka.com/projects/pattern_generator/index.html',
        github: '',
    },
    {
        title: 'Raincheck Mobile App',
        year: 2023,
        type: 'archived',
        image: rainCheckImg,
        description: (
            <>
                <span>
                    RainCheck is a university weather app project focused on mobile-first design and
                    core weather functionality. I kept it mainly as a design reference and for
                    nostalgia — I really liked how the mobile UI turned out. The colour choices and
                    basic design patterns still influence my work today.
                </span>
            </>
        ),
        badges: ['React Native', 'Photoshop', 'Illustrator'],
        github: 'https://github.com/tschiboka/RainCheck',
    },
    {
        title: 'Green Rooftop IoT Device & App',
        year: 2022,
        type: 'archived',
        image: greenRooftopImg,
        description: (
            <>
                <span>
                    GreenRoof is a university IoT project focused on monitoring green rooftops using
                    environmental sensors such as soil moisture, temperature, humidity, light, and
                    rainwater levels, visualised through a simple web interface. I keep it mainly as
                    an archived learning project for documentation and reference.
                </span>
            </>
        ),
        badges: ['HTML', 'CSS', 'JavaScript', 'Arduino', 'NodeJs', 'Mongodb'],
        github: 'https://github.com/tschiboka/GreenRooftop',
        blog: '/blog/green-rooftop',
    },
    {
        title: 'Personal Trainer Website',
        type: 'archived',
        year: 2019,
        image: personalTrainerImg,
        description: (
            <>
                <span>
                    I designed and built a portfolio website for a personal trainer as my first paid
                    programming work. The site used a minimalist dark aesthetic, included
                    multilingual support, testimonials, service information, and a booking flow via
                    Google Calendar integration, along with a contact form for enquiries.
                </span>
                <br />
                <span>
                    Although the site is no longer live, it marked my first real-world client
                    project and a key step into professional development work.
                </span>
            </>
        ),
        badges: ['HTML', 'CSS', 'JavaScript', 'NodeJs', 'Mongodb'],
        url: 'https://tschiboka.com/projects/Coach-Francesco-Levo/index.html',
        github: 'https://github.com/tschiboka/Coach-Francesco-Levo',
    },
    {
        title: 'Tic Tac Toe Game',
        year: 2017,
        type: 'archived',
        image: ticTacToeImg,
        description: (
            <span>
                One of my earliest attempts at building game logic. The opponent relies on a simple
                set of rules and decision-making algorithms rather than brute force, creating a
                surprisingly fair challenge. Looking back, it's a modest project, but it taught me
                that a handful of simple rules and a bit of logic can produce engaging behaviour —
                and an exuse to play tic-tac-toe.
            </span>
        ),
        badges: ['HTML', 'CSS', 'JavaScript'],
        url: 'https://tschiboka.com/projects/tictactoe/tictactoe.html',
    },
    {
        title: 'Pocket Tutor App',
        year: 2018,
        type: 'archived',
        image: pocketTutorImg,
        description:
            'Pocket Tutor is a flashcard learning app I built before I knew what a proper code parser was — an early experiment in structured learning tools and syntax highlighting.',
        badges: ['HTML', 'CSS', 'React'],
        url: 'https://tschiboka.com/projects/pocket-tutor/index.html',
        github: 'https://github.com/tschiboka/Pocket-Tutor',
    },
    {
        title: 'Crayons',
        year: 2017,
        type: 'archived',
        image: crayonsImg,
        description: (
            <span>
                A simple browser-based drawing app built as an experiment with the HTML canvas and
                user interaction. There's no grand idea behind it — it was created purely for the
                fun of making something creative and interactive. I keep it around mostly for
                nostalgic reasons.
            </span>
        ),
        badges: ['HTML', 'CSS', 'JavaScript'],
        url: 'https://tschiboka.com/projects/crayons/index.html',
        github: 'https://github.com/tschiboka/Crayons',
    },
    {
        title: 'Adrika Clock',
        year: 2016,
        type: 'archived',
        image: adrikaClockImg,
        description: (
            <>
                <span>
                    Adrika Clock is my earliest JavaScript widget and the first time I really
                    experimented with design in a more hands-on way. It originally started as a
                    website for a nail technician but was later repurposed as a standalone widget
                    when the original portfolio was no longer needed.
                </span>
                <br />
                <span>
                    It’s included here as a personal piece—partly as a record of early
                    experimentation, and partly in appreciation of my wife, as it contains small
                    details and references tied to family memories.
                </span>
            </>
        ),
        badges: ['HTML', 'CSS', 'JavaScript', 'Photoshop'],
        url: 'https://tschiboka.com/projects/adrika_clock/index.html',
    },
]

export type Technology = {
    name: string
    color: PillColor
    tech?: string
    groupName?: string
}

export const technologies: Technology[] = [
    {
        name: 'HTML',
        color: 'orange',
        tech: 'Frontend',
        groupName: 'Frontend',
    },
    {
        name: 'CSS',
        color: 'purple',
        tech: 'Frontend',
        groupName: 'Frontend',
    },
    {
        name: 'JavaScript',
        color: 'yellow',
        tech: 'Frontend',
        groupName: 'Frontend',
    },
    {
        name: 'React',
        color: 'accent',
        tech: 'Frontend',
        groupName: 'Frontend',
    },
    {
        name: 'React Native',
        color: 'accent',
        tech: 'Frontend',
        groupName: 'Frontend',
    },
    {
        name: 'TypeScript',
        color: 'accent',
        tech: 'Frontend',
        groupName: 'Frontend',
    },
    {
        name: 'Sass',
        color: 'error',
        tech: 'Frontend',
        groupName: 'Frontend',
    },
    {
        name: 'Arduino',
        color: 'accent',
        tech: 'Frontend',
        groupName: 'Backend',
    },
    {
        name: 'NodeJs',
        color: 'success',
        tech: 'Backend',
        groupName: 'Backend',
    },
    {
        name: 'Express',
        color: 'orange',
        tech: 'Backend',
        groupName: 'Backend',
    },
    {
        name: 'Python',
        color: 'success',
        tech: 'Backend',
        groupName: 'Backend',
    },
    {
        name: 'C#',
        color: 'purple',
        tech: 'Backend',
        groupName: 'Backend',
    },
    {
        name: 'MongoDB',
        color: 'success',
        tech: 'Backend',
        groupName: 'Backend',
    },
    {
        name: 'Photoshop',
        color: 'error',
        tech: 'Design',
        groupName: 'Testing & Design',
    },
    {
        name: 'Illustrator',
        color: 'orange',
        tech: 'Design',
        groupName: 'Testing & Design',
    },
    {
        name: 'Jest',
        color: 'error',
        tech: 'Testing',
        groupName: 'Testing & Design',
    },
    {
        name: 'RTL',
        color: 'purple',
        tech: 'Testing',
        groupName: 'Testing & Design',
    },
    {
        name: 'MySQL',
        color: 'orange',
        tech: 'Backend',
        groupName: 'Backend',
    },
    {
        name: 'Git',
        color: 'error',
        tech: 'Backend',
        groupName: 'Backend',
    },
]

import type { PillColor } from '@common/ux'

export const getTechnologies = (technology: string) => {
    return technologies.find((tech) => tech.name.toLowerCase() === technology.toLowerCase())
}

export function getColourName(str: string): PillColor {
    switch (str.toLowerCase()) {
        case 'html':
            return 'orange'
        case 'css':
            return 'purple'
        case 'javascript':
            return 'yellow'
        case 'react':
            return 'accent'
        case 'react native':
            return 'accent'
        case 'typescript':
            return 'accent'
        case 'sass':
            return 'error'
        case 'arduino':
            return 'accent'
        case 'nodejs':
            return 'success'
        case 'express':
            return 'orange'
        case 'python':
            return 'success'
        case 'c#':
            return 'purple'
        case 'mongodb':
            return 'success'
        case 'photoshop':
            return 'error'
        case 'illustrator':
            return 'orange'
        case 'jest':
            return 'error'
        case 'rtl':
            return 'purple'
        case 'mysql':
            return 'orange'
        case 'git':
            return 'error'
        case 'design':
            return 'error'
        case 'featured':
            return 'accent'
        case 'complete':
            return 'success'
        case 'inprogress':
            return 'yellow'
        case 'archived':
            return 'error'
        default:
            return 'gray'
    }
}

export const getProjects = () => projects
