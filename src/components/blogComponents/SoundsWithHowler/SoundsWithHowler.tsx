import { useAppContext } from "../../../context/AppContext";
import Footer from "../../Footer/Footer";
import Menu from "../../Menu/Menu";
import Nav from "../../Nav/Nav";
import Page from "../../Page/Page";
import References, { Reference } from "../../References/References";
import { Link } from "react-router-dom";
import SubNav from "../../SubNav/SubNav";
import BlogTimeStamp from "../../BlogTimeStamp/BlogTimeStamp";
import codeSnippets from "./codeSnipets";
import Figure from "../../Figure/Figure";
import Code from "../../Code/Code";
import { Howl } from "howler";
import { BsSoundwave } from "react-icons/bs";
import equalizerImg from "../../../assets/images/blog/soundsWithHowler/equalizer.jpg";
import E2MP3 from "../../../assets/files/guitar-sounds/E2.mp3";
import riffMasterHomeImg from "../../../assets/images/blog/soundsWithHowler/RiffmasterHomePage.png";
import fretboardNotes from "../../../assets/images/blog/soundsWithHowler/FretboardNotes.png";
import "../../References/References.scss";
import "../blogComponents.scss";
import "./SoundsWithHowler.scss";
import LikeButton from "../../LikeButton/LikeButton";

interface Props {
    pageName: string;
    path: string;
}

const SoundsWithHowler = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
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

    const audioE2 = new Howl({ src: E2MP3, html5: true });

    return (
        <Page title="Tivadar Debnar | Sounds with Howler" path={path}>
            <Nav pageName={pageName} />
            {mobileMenuVisible && <Menu pageName="pageName" />}
            {subMenuVisible && <SubNav />}
            <main className="blog-component">
                <article>
                    <h1>Creating Sounds with Howler</h1>
                    <Figure
                        image={equalizerImg}
                        className={"image--med bg--white"}
                        alt={"Equalizer"}
                        caption={"Create Sounds with Howler JS"}
                    />
                    <p>
                        This article continues my previous blog post, where I
                        provided a walkthrough on creating a digital guitar
                        instrument. This instrument communicates through USB as
                        a keyboard, and for simplicity, we translate individual
                        fretboard and strum events into four-digit messages.
                        Therefore, some of the code snippets I provide here are
                        in the context of the guitar project and may need your
                        refactoring if you want to use them in your application.
                        If you missed my blog or need references on how this
                        guitar works, click{" "}
                        <Link className="inline" to="/blog/riffmaster">
                            here
                        </Link>
                        .
                    </p>
                    <p>
                        Additionally, this article focuses on creating guitar
                        sounds according to user inputs on the guitar console,
                        and discussing the basic web app that I built for my
                        device would be a distraction. I will dedicate a
                        separate article to that.
                    </p>
                    <Figure
                        image={riffMasterHomeImg}
                        className={"image--med bg--white"}
                        alt={"Guitar App"}
                        caption={"RiffMaster Guitar App Home Page"}
                    />
                    <h3>What is Howler?</h3>
                    <p>
                        Howler.js is a popular JavaScript library for working
                        with audio in web applications. It provides an
                        easy-to-use API for playing and controlling audio files
                        in various formats, making it a versatile tool for
                        creating audio experiences on the web. It offers
                        cross-browser and mobile compatibility, supports many
                        audio formats (MP3, WAV, OGG), and features playback
                        controls (play, pause, stop), looping, positional audio
                        and fade effects.{" "}
                        <Link
                            className="Reference__Link"
                            to={references[0].source}
                        >
                            [ {references[0].author} ]
                        </Link>
                    </p>
                    <p>
                        To use Howler.js, you include the library in your
                        project, load audio files, and use the provided API to
                        control and manage audio playback. So after creating the
                        html boilerplate for our app, one of the first things we
                        need to do is to import the Howler JS script in our
                        header.
                    </p>
                    <Code
                        fileName="jam.html"
                        language="html"
                        content={codeSnippets.importHowler}
                    />
                    <h3>Audio Files</h3>
                    <p>
                        As our application simulates standard acoustic guitars,
                        and the fretboard supports 20 frets on six strings, we
                        must have an extensive range of audio sounds available
                        for each possible note, from the lower E2 to the upper
                        D6.
                    </p>
                    <Figure
                        image={fretboardNotes}
                        className={"image--lrg bg--white"}
                        alt={"Fret Board Notes"}
                        caption={"Fret Board Note Arrangement"}
                    />
                    <p>
                        You can create your own audio or download guitar sounds
                        from{" "}
                        <Link
                            className="Reference__Link"
                            to={references[1].source}
                        >
                            [ {references[1].author} ]
                        </Link>{" "}
                        or{" "}
                        <Link
                            className="Reference__Link"
                            to={references[2].source}
                        >
                            [ {references[2].author} ]
                        </Link>
                        . However, I found collecting the full range of notes
                        with the same instrument challenging, so I opted to
                        record my own guitar sounds. So if you want to spare a
                        couple of hours, feel free to use my audio library
                        <Link
                            className="Reference__Link"
                            to={references[3].source}
                        >
                            [ {references[3].author} ]
                        </Link>
                        !
                    </p>
                    <h3>Try them out!</h3>
                    <div className="sound-btn-wrapper">
                        <button onClick={() => audioE2.play()}>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                        <button>
                            <span>Guitar Note E2</span>
                            <BsSoundwave />
                        </button>
                    </div>
                    <h3>Reading Controller Messages</h3>
                </article>
                <LikeButton path={path} />
                <References references={references} />
                <BlogTimeStamp created="18.08.2023" updated="18.08.2023" />
            </main>
            <Footer pageName={pageName} path={path} />
        </Page>
    );
};

export default SoundsWithHowler;
