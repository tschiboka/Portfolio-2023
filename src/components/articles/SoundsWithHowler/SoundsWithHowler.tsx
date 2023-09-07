// Components
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";
import { Howl } from "howler";

// Images
import equalizerImg from "../../../assets/images/blog/soundsWithHowler/equalizer.jpg";
import fretBoardImg from "../../../assets/images/blog/soundsWithHowler/Fretboard.png";
import highlightImg from "../../../assets/images/blog/soundsWithHowler/Highlighted.png";

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
import { getReferenceList } from "../references";

// Styles
import "./SoundsWithHowler.scss";
import Article from "../../sharedComponents/Article/Article";
import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

interface Props {
    pageName: string;
    path: string;
}

const audioObject = () => {
    return {
        E2: new Howl({ src: E2MP3, html5: true }),
        F2: new Howl({ src: F2MP3, html5: true }),
        Fs2: new Howl({ src: Fs2MP3, html5: true }),
        G2: new Howl({ src: G2MP3, html5: true }),
        Gs2: new Howl({ src: Gs2MP3, html5: true }),
        A2: new Howl({ src: A2MP3, html5: true }),
        As2: new Howl({ src: As2MP3, html5: true }),
        B2: new Howl({ src: B2MP3, html5: true }),
        C3: new Howl({ src: C3MP3, html5: true }),
        Cs3: new Howl({ src: Cs3MP3, html5: true }),
        D3: new Howl({ src: D3MP3, html5: true }),
        Ds3: new Howl({ src: Ds3MP3, html5: true }),
        E3: new Howl({ src: E3MP3, html5: true }),
        G3: new Howl({ src: G3MP3, html5: true }),
        B3: new Howl({ src: B3MP3, html5: true }),
        E4: new Howl({ src: E4MP3, html5: true }),
        A3: new Howl({ src: A3MP3, html5: true }),
        C4: new Howl({ src: C4MP3, html5: true }),
        D4: new Howl({ src: D4MP3, html5: true }),
        Fs4: new Howl({ src: Fs4MP3, html5: true }),
        G4: new Howl({ src: G4MP3, html5: true }),
    };
};

const SoundsWithHowler = ({ pageName, path }: Props) => {
    const [audio, setAudio] = useState<Record<string, Howl> | null>(null);
    const [firstAudio, setFirstAudio] = useState(""); // First Audio will Play After useEffect[audio]
    const references = getReferenceList(path);
    const playAudio = (audioName: string) => {
        if (!audio) {
            setAudio(audioObject);
            setFirstAudio(audioName);
        } else audio[audioName].play();
    };

    useEffect(() => {
        if (audio) audio[firstAudio].play();
    }, [audio]);

    // Audio Howler
    return (
        <Article path={path} pageName={pageName} title="Sounds with Howler">
            <h1>Creating Sounds with Howler</h1>
            <Figure
                image={equalizerImg}
                className={"image--med"}
                alt={"Equalizer"}
                zoomAllowed={false}
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
                className={"image--med"}
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
                (play, pause, stop), looping, positional audio and fade effects.
                <InlineReference reference={references[0]} />
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
                className={"image--lrg"}
                alt={"Fret Board Notes"}
                caption={"Fret Board Note Arrangement"}
            />
            <p>
                You can create your own audio or download guitar sounds from
                <InlineReference reference={references[1]} />
                or
                <InlineReference reference={references[2]} />
                . However, I found collecting the full range of notes with the
                same instrument challenging and rather time-consuming, so I
                opted to record my own set of guitar sounds. If you want to
                spare a few hours, please use my audio library
                <InlineReference reference={references[3]} />!{" "}
                <span className="sidenote">
                    (Please note my naming convention: uppercase note names,
                    optional "S" for sharp notes as # is an illegal filename
                    character, and respective note naming convention (2 - 6))
                </span>
            </p>
            <h3>Try them out!</h3>
            <div className="sound-btn-wrapper">
                <button onClick={() => playAudio("E2")}>
                    <span>Guitar Note E2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("F2")}>
                    <span>Guitar Note F2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("Fs2")}>
                    <span>Guitar Note F#2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("G2")}>
                    <span>Guitar Note G2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("Gs2")}>
                    <span>Guitar Note G#2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("A2")}>
                    <span>Guitar Note A2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("As2")}>
                    <span>Guitar Note A#2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("B2")}>
                    <span>Guitar Note B2</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("C3")}>
                    <span>Guitar Note C3</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("Cs3")}>
                    <span>Guitar Note C#3</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("D3")}>
                    <span>Guitar Note D3</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("Ds3")}>
                    <span>Guitar Note D#3</span>
                    <BsSoundwave />
                </button>
                <button onClick={() => playAudio("E3")}>
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
                        playAudio("E2");
                        playAudio("B2");
                        playAudio("E3");
                        playAudio("G3");
                        playAudio("B3");
                        playAudio("E4");
                    }}
                >
                    <span>Guitar Chord Em</span>
                    <BsSoundwave />
                </button>
                <button
                    onClick={() => {
                        playAudio("D3");
                        playAudio("A3");
                        playAudio("D4");
                        playAudio("Fs4");
                    }}
                >
                    <span>Guitar Chord D</span>
                    <BsSoundwave />
                </button>
                <button
                    onClick={() => {
                        playAudio("C4");
                        playAudio("G3");
                        playAudio("E3");
                        playAudio("C3");
                    }}
                >
                    <span>Guitar Chord C</span>
                    <BsSoundwave />
                </button>
                <button
                    onClick={() => {
                        playAudio("G2");
                        playAudio("B2");
                        playAudio("D3");
                        playAudio("G3");
                        playAudio("B3");
                        playAudio("G4");
                    }}
                >
                    <span>Guitar Chord G</span>
                    <BsSoundwave />
                </button>
                <button
                    onClick={() => {
                        playAudio("B2");
                        playAudio("Ds3");
                        playAudio("A3");
                        playAudio("B3");
                        playAudio("Fs4");
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
            <p>
                Lastly, we can initialise a display action on board function
                that takes the fret, string and the event as arguments. This
                function will be implemented when displaying our virtual guitar
                board on the screen. The guitar note names will be calculated
                relative to the lower E2 string, and each string has an offset
                to adjust the fret number.
            </p>
            <Code
                fileName="jam.js"
                language="javascript"
                content={codeSnippets.guitarNotes}
            />
            <br />
            <Code
                fileName="jam.js"
                language="javascript"
                content={codeSnippets.fretCallback}
            />
            <h3>Reading the Strums</h3>
            <p>
                Unlike the fretboard inputs, strum events activate audio, so
                they must first find the uppermost activated note position on
                the fretboard. In the case of a strum press, all notes on the
                string must be stopped; otherwise, they must be played. The
                highest note search is similar to the fretboard's; however, I
                provided some extra branches for different displaying cases,
                which will later be discussed.
            </p>
            <Code
                fileName="jam.js"
                language="javascript"
                content={codeSnippets.strumCallback}
            />
            <h3>Creating Sounds</h3>
            <p>
                As we need to deal with many Howl objects, it is reasonable to
                structure them into an audio object, where the key is the audio
                name and the value is the How object itself. The most important
                properties that Howler accepts are the source (src) path, volume
                (default 1), HTML5, and preload. HTML5 property should be used
                for large audio files so you don't have to wait for the complete
                file to be downloaded and decoded before playing. Preload
                property automatically begins downloading the audio file when
                the Howl is defined. If using HTML5 Audio, you can set this to
                'metadata' to only preload the file's metadata (to get its
                duration without downloading the entire file, for example). For
                the complete list of properties, see
                <InlineReference reference={references[4]} />.
            </p>
            <Code
                fileName="jam.js"
                language="javascript"
                content={codeSnippets.audioObject}
            />
            <p>
                One of the things that we must be careful of is that the
                function preloading Howler audio needs to be user-initiated. The
                reason is the current autoplay policy in most major browsers.
                Web browsers are moving towards stricter autoplay policies to
                improve the user experience, minimise incentives to install ad
                blockers, and reduce data consumption on expensive and
                constrained networks. These changes are intended to provide
                further playback control to users and benefit publishers with
                legitimate use cases.
                <InlineReference reference={references[5]} />
                Therefore, if you want to preload your audio variables, do it
                after a click event.
            </p>
            <Code
                fileName="jam.js"
                language="javascript"
                content={codeSnippets.playStopNotes}
            />
            <p>
                You can manipulate audio play by simply calling play or stop
                functions.
            </p>
            <h3>Guitar Interface</h3>
            <p>
                I wanted to create a simple user interface for the digital
                guitar so users could visually confirm every interaction, and
                let's be honest, while the audio experience is fun, some visual
                aid is necessary for these types of applications. The guitar UI
                must have all the frets in a six by 20 matrix, with six strings
                representing our physical guitar. Also, we must ensure that our
                approach is user-friendly; hence, all notes, fret numbers, and
                strings will also be textually represented. As the DOM
                representation of a guitar requires hundreds of elements, and
                these elements must be referred to for highlighting, we could
                either use specific IDs for references or store our DOM elements
                in arrays and refer them by the index.
            </p>
            <Code
                fileName="jam.js"
                language="javascript"
                content={codeSnippets.domStorage}
            />
            <p>
                If we want to create a more authentic guitar fretboard, we need
                to be able to calculate the distances on the frets, just like
                for the real instrument, where the spaces between frets decrease
                from the neck to the saddle. These distances are calculated
                iteratively. If we divide any scale length by the constant
                17.817, we will get the distance from the front edge of the nut
                to the first fret. <InlineReference reference={references[6]} />
                We can subtract this fret distance from the total and move to
                the next fret until we reach the last one (20).
            </p>
            <Code
                fileName="jam.js"
                language="javascript"
                content={codeSnippets.fretDistances}
            />
            <p>
                We will create our guitar component with several different types
                of DOM elements. The usual steps for appending an element are
                straightforward. Create a child DOM element with an HTML tag
                name, set its ID, class name or other attributes, get the parent
                element, and append the child element to the parent. As this
                step will heavily feature our guitar-building process, I made it
                a one-liner utility function so that we can focus on the main
                task.
            </p>
            <Code
                fileName="util.js"
                language="javascript"
                content={codeSnippets.utilityAppend}
            />
            <p>
                Now, we can create the guitar component by traversing seven rows
                (the last row is for the fret numbering) and 21 fret columns
                (again, the last one is the string component).
            </p>
            <Code
                fileName="jam.js"
                language="javascript"
                content={codeSnippets.createGuitar}
            />
            <p>You can copy the following CSS code to have the same result.</p>
            <Code
                fileName="jam.css"
                language="css"
                content={codeSnippets.guitarCSS}
            />
            <p>The result is this simple GUI for our guitar.</p>
            <Figure
                image={fretBoardImg}
                className={"image--lrg"}
                alt={"Fret Board"}
                caption={"Guitar GUI"}
            />
            <p>
                Finally, we need to display the user interactions on the
                fretboard. Our displayActionOnBoard function manages the visual
                highlighting of the fret and string elements in the digital
                guitar interface. Given inputs are finger position, string, and
                strum activation and highlight. We can adjust the appearance of
                corresponding elements to create different levels of highlights
                (actively playing, just pressed). The remove highlight parameter
                can reset the components to their normal state.
            </p>
            <Code
                fileName="jam.js"
                language="javascript"
                content={codeSnippets.displayGuitar}
            />
            <p>
                Let's test out our Guitar interface. The screenshot below shows
                when the guitar is played on a barre D minor chord.
            </p>
            <Figure
                image={highlightImg}
                className={"image--lrg"}
                alt={"Fret Board Highlights"}
                caption={"Fret Board Highlights (D minor)"}
            />
            <p>Feel free to share your thoughts on potential improvements.</p>
        </Article>
    );
};

export default SoundsWithHowler;
