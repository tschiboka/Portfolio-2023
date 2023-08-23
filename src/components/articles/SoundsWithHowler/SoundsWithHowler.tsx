// Components
import { Reference } from "../../sharedComponents/References/References";
import { Link } from "react-router-dom";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";
import { Howl } from "howler";

// Images
import equalizerImg from "../../../assets/images/blog/soundsWithHowler/equalizer.jpg";

// Icons
import { BsSoundwave } from "react-icons/bs";

// Audio
import E2MP3 from "../../../assets/files/guitar-sounds/E2.mp3";
import F2MP3 from "../../../assets/files/guitar-sounds/F2.mp3";
import Fs2MP3 from "../../../assets/files/guitar-sounds/Fs2.mp3";
import G2MP3 from "../../../assets/files/guitar-sounds/G2.mp3";
import Gs2MP3 from "../../../assets/files/guitar-sounds/Gs2.mp3";
import A2MP3 from "../../../assets/files/guitar-sounds/A2.mp3";
import As2MP3 from "../../../assets/files/guitar-sounds/As2.mp3";
import B2MP3 from "../../../assets/files/guitar-sounds/B2.mp3";
import C3MP3 from "../../../assets/files/guitar-sounds/C3.mp3";
import Cs3MP3 from "../../../assets/files/guitar-sounds/Cs3.mp3";
import D3MP3 from "../../../assets/files/guitar-sounds/D3.mp3";
import Ds3MP3 from "../../../assets/files/guitar-sounds/Ds3.mp3";
import E3MP3 from "../../../assets/files/guitar-sounds/E3.mp3";
import G3MP3 from "../../../assets/files/guitar-sounds/G3.mp3";
import A3MP3 from "../../../assets/files/guitar-sounds/A3.mp3";
import B3MP3 from "../../../assets/files/guitar-sounds/B3.mp3";
import E4MP3 from "../../../assets/files/guitar-sounds/E4.mp3";
import C4MP3 from "../../../assets/files/guitar-sounds/C4.mp3";
import D4MP3 from "../../../assets/files/guitar-sounds/D4.mp3";
import Fs4MP3 from "../../../assets/files/guitar-sounds/Fs4.mp3";
import G4MP3 from "../../../assets/files/guitar-sounds/G4.mp3";

// Images
import riffMasterHomeImg from "../../../assets/images/blog/soundsWithHowler/RiffmasterHomePage.png";
import fretboardNotesImg from "../../../assets/images/blog/soundsWithHowler/FretboardNotes.png";

// Other Assets
import codeSnippets from "./codeSnipets";

// Styles
import "./SoundsWithHowler.scss";
import Article from "../../sharedComponents/Article/Article";

// References
const references: Reference[] = [
    {
        title: "Howler Documentation",
        author: "Howler",
        source: "https://howlerjs.com/",
    },
    {
        title: "Splice Audio Library",
        author: "Splice",
        source: "https://splice.com/features/sounds",
    },
    {
        title: "MixKit Audio Library",
        author: "MixKit",
        source: "https://mixkit.co/free-sound-effects/guitar/",
    },
    {
        title: "Tschiboka Audio Library",
        author: "Tschiboka",
        source: "https://tschiboka.co.uk/files/guitar-sounds/guitar-sounds.zip",
    },
];

interface Props {
    pageName: string;
    path: string;
}

const SoundsWithHowler = ({ pageName, path }: Props) => {
    // Audio Howler
    const audioE2 = new Howl({ src: E2MP3, html5: true });
    const audioF2 = new Howl({ src: F2MP3, html5: true });
    const audioFs2 = new Howl({ src: Fs2MP3, html5: true });
    const audioG2 = new Howl({ src: G2MP3, html5: true });
    const audioGs2 = new Howl({ src: Gs2MP3, html5: true });
    const audioA2 = new Howl({ src: A2MP3, html5: true });
    const audioAs2 = new Howl({ src: As2MP3, html5: true });
    const audioB2 = new Howl({ src: B2MP3, html5: true });
    const audioC3 = new Howl({ src: C3MP3, html5: true });
    const audioCs3 = new Howl({ src: Cs3MP3, html5: true });
    const audioD3 = new Howl({ src: D3MP3, html5: true });
    const audioDs3 = new Howl({ src: Ds3MP3, html5: true });
    const audioE3 = new Howl({ src: E3MP3, html5: true });
    const audioG3 = new Howl({ src: G3MP3, html5: true });
    const audioB3 = new Howl({ src: B3MP3, html5: true });
    const audioE4 = new Howl({ src: E4MP3, html5: true });
    const audioA3 = new Howl({ src: A3MP3, html5: true });
    const audioC4 = new Howl({ src: C4MP3, html5: true });
    const audioD4 = new Howl({ src: D4MP3, html5: true });
    const audioFs4 = new Howl({ src: Fs4MP3, html5: true });
    const audioG4 = new Howl({ src: G4MP3, html5: true });

    return (
        <Article path={path} pageName={pageName} title="Sounds with Howler">
            <h1>Creating Sounds with Howler</h1>
            <Figure
                image={equalizerImg}
                className={"image--med bg--white"}
                alt={"Equalizer"}
                caption={"Create Sounds with Howler JS"}
            />
            <p>
                This article continues my previous blog post, where I provided a
                walkthrough on creating a digital guitar instrument. This
                instrument communicates through USB as a keyboard, and for
                simplicity, we translate individual fretboard and strum events
                into four-digit messages. Therefore, some of the code snippets I
                provide here are in the context of the guitar project and may
                need your refactoring if you want to use them in your
                application. If you missed my blog or need references on how
                this guitar works, click{" "}
                <Link className="inline" to="/blog/riffmaster">
                    here
                </Link>
                .
            </p>
            <p>
                Additionally, this article focuses on creating guitar sounds
                according to user inputs on the guitar console, and discussing
                the basic web app that I built for my device would be a
                distraction. I will dedicate a separate article to that.
            </p>
            <Figure
                image={riffMasterHomeImg}
                className={"image--med bg--white"}
                alt={"Guitar App"}
                caption={"RiffMaster Guitar App Home Page"}
            />
            <h3>What is Howler?</h3>
            <p>
                Howler.js is a popular JavaScript library for working with audio
                in web applications. It provides an easy-to-use API for playing
                and controlling audio files in various formats, making it a
                versatile tool for creating audio experiences on the web. It
                offers cross-browser and mobile compatibility, supports many
                audio formats (MP3, WAV, OGG), and features playback controls
                (play, pause, stop), looping, positional audio and fade effects.{" "}
                <Link className="Reference__Link" to={references[0].source}>
                    [ {references[0].author} ]
                </Link>
            </p>
            <p>
                To use Howler.js in your vanilla JS application, you include the
                library in your project, load audio files, and use the provided
                API to control and manage audio playback. So after creating the
                html boilerplate for our app, one of the first things we need to
                do is to import the Howler JS script in our header.
            </p>
            <Code
                fileName="jam.html"
                language="html"
                content={codeSnippets.importHowler}
            />
            <p>
                However, for React users, installing the package through NPM or
                Yarn is the best way. If the application is written with
                TypeScript, the type definitions must also be installed for the
                TypeScript compiler.
            </p>
            <Code
                fileName="Terminal"
                language="powershell"
                content={codeSnippets.npmHowler}
            />
            <h3>Audio Files</h3>
            <p>
                As our application simulates standard acoustic guitars, and the
                fretboard supports 20 frets on six strings, we must have an
                extensive range of audio sounds available for each possible
                note, from the lower E2 to the upper C6.
            </p>
            <Figure
                image={fretboardNotesImg}
                className={"image--lrg bg--white"}
                alt={"Fret Board Notes"}
                caption={"Fret Board Note Arrangement"}
            />
            <p>
                You can create your own audio or download guitar sounds from{" "}
                <Link className="Reference__Link" to={references[1].source}>
                    [ {references[1].author} ]
                </Link>{" "}
                or{" "}
                <Link className="Reference__Link" to={references[2].source}>
                    [ {references[2].author} ]
                </Link>
                . However, I found collecting the full range of notes with the
                same instrument challenging and rather time-consuming, so I
                opted to record my own set of guitar sounds. If you want to
                spare a few hours, please use my audio library
                <Link className="Reference__Link" to={references[3].source}>
                    [ {references[3].author} ]
                </Link>
                !{" "}
                <span className="sidenote">
                    (Please note my naming convention: uppercase note names,
                    optional "S" for sharp notes as # is an illegal filename
                    character, and respective note naming convention (2 - 6))
                </span>
            </p>
            <h3>Try them out!</h3>
            <div className="sound-btn-wrapper">
                <button onClick={() => audioE2.play()}>
                    <span>Guitar Note E2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioF2.play()}>
                    <span>Guitar Note F2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioFs2.play()}>
                    <span>Guitar Note F#2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioG2.play()}>
                    <span>Guitar Note G2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioGs2.play()}>
                    <span>Guitar Note G#2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioA2.play()}>
                    <span>Guitar Note A2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioAs2.play()}>
                    <span>Guitar Note A#2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioB2.play()}>
                    <span>Guitar Note B2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioC3.play()}>
                    <span>Guitar Note C3</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioCs3.play()}>
                    <span>Guitar Note C#3</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioD3.play()}>
                    <span>Guitar Note D3</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioDs3.play()}>
                    <span>Guitar Note D#3</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => audioE3.play()}>
                    <span>Guitar Note E3</span>
                    <BsSoundwave />
                </button>
            </div>
            <p>
                One of the great things about Howler JS is that it handles
                simultaneous audio playing easily, a crucial feature, as our
                digital guitar is a polyphonic instrument. Each string should
                provide its corresponding sound if activated; more often than
                not, guitarists play on multiple strings at one time. Let's see
                some basic chords.
            </p>
            <div className="sound-btn-wrapper">
                <button
                    onClick={() => {
                        audioE2.play();
                        audioB2.play();
                        audioE3.play();
                        audioG3.play();
                        audioB3.play();
                        audioE4.play();
                    }}
                >
                    <span>Guitar Chord Em</span>
                    <BsSoundwave />
                </button>
                <button
                    onClick={() => {
                        audioD3.play();
                        audioA3.play();
                        audioD4.play();
                        audioFs4.play();
                    }}
                >
                    <span>Guitar Chord D</span>
                    <BsSoundwave />
                </button>
                <button
                    onClick={() => {
                        audioC4.play();
                        audioG3.play();
                        audioE3.play();
                        audioC3.play();
                    }}
                >
                    <span>Guitar Chord C</span>
                    <BsSoundwave />
                </button>
                <button
                    onClick={() => {
                        audioG2.play();
                        audioB2.play();
                        audioD3.play();
                        audioG3.play();
                        audioB3.play();
                        audioG4.play();
                    }}
                >
                    <span>Guitar Chord G</span>
                    <BsSoundwave />
                </button>
                <button
                    onClick={() => {
                        audioB2.play();
                        audioDs3.play();
                        audioA3.play();
                        audioB3.play();
                        audioFs4.play();
                    }}
                >
                    <span>Guitar Chord B7</span>
                    <BsSoundwave />
                </button>
            </div>
            <p>
                And yes, anyone with a sharp pitch, this is the chord
                progression from Metallica – Nothing else matters, so you are
                welcome!
            </p>
            <h3>Reading Controller Messages</h3>
            <p>
                First, we need to be able to read keypresses from our
                instrument, and for that, we will create our controller listener
                function. This function is only responsible for listening to
                keypresses that are digits, and each message from our instrument
                consists of four digits. The first digit is the event, with
                possible values 0 and 1, released and pressed, respectively. The
                second and third digits represent our fret value, which may be
                between 0 and 20. The fourth digit is the string number (1 - 6).
                On each keypress, the key is appended to the final controller
                message until the fourth digit, where we can trigger an action.
                Additionally, any invalid keys or digits out of the boundary of
                our protocol must be discarded, and the message should be
                cleared.
            </p>
            <p>
                The controller state has two properties: the message and the
                highest fret position, an array of six numbers. We need to store
                these values because when the user activates a string, multiple
                fret positions may be started on that string simultaneously.
                Guitars always play the highest sound on a given string, and our
                digital guitar should not be an exception. One way should be to
                set these restrictions on the hardware level and let only the
                highest notes trigger a message sequence. However, this would
                also restrict any future endeavour for, let's say, displaying a
                visual guide or a graphical UI that shows activated notes.
                Lastly, separation of concerns: the guitar controller is not
                responsible for the logic of how the messages are used and
                interpreted, and they should be implemented on the application
                level.
            </p>
            <Code
                fileName="controller.js"
                language="javascript"
                content={codeSnippets.controller}
            />
            <p>
                Each four-digit message invokes our translate function, which
                keeps our highest fret positions state up to date and triggers
                either a strum or a fret activation function. These functions
                are declared when a page loads, so each page may have different
                functionalities. For instance, a Jam Session plays the activated
                notes, and a Play Session may have a Guitar Hero-like game that
                handles controller events differently.
            </p>
            <Code
                fileName="controller.js"
                language="javascript"
                content={codeSnippets.translateMessages}
            />
            <p>Now we can include our controller listener in the html file.</p>
            <Code
                fileName="jam.html"
                language="html"
                content={codeSnippets.loadController}
                highlightRow={[2]}
            />
            <h3>Reading the Fretboard</h3>
            <p>
                In our implementation, the guitar does not make any sound
                effects when a button on its fretboard is activated, as
                hammer-down or pull-up motions are out of the scope of this
                prototype. On the other hand, every fretboard event will update
                the guitar's state; namely, it sets the highest note position on
                a given string. One option might be to store the six strings as
                an array of numbers, and each activation or deactivation would
                compare and refresh the highest note. However, if the user
                interacts with multiple buttons on a string, any information
                about positions under the highest notes is lost.
            </p>
            <p>
                Alternatively, we can store individual string information as
                arrays of numbers and pop or push them on interaction. In this
                case, the default value of the string array would be [[0], [0],
                [0], [0], [0], [0]], where 0 means a guitar string without any
                notes registered. Similarly, reading the uppermost value can be
                done by either iterating through the individual strings and
                finding the highest number or saving a sorted array and
                referring to its last item.
            </p>
            <Code
                fileName="jam.html"
                language="javasrcipt"
                content={codeSnippets.fretCallback}
            />
        </Article>
    );
};

export default SoundsWithHowler;
