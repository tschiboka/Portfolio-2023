import { useAppContext } from "../../../context/AppContext";
import Nav from "../../sharedComponents/Nav/Nav";
import SubNav from "../../sharedComponents/SubNav/SubNav";
import Menu from "../../sharedComponents/Menu/Menu";
import BlogTimeStamp from "../../sharedComponents/BlogTimeStamp/BlogTimeStamp";
import Footer from "../../sharedComponents/Footer/Footer";
import { FiDownload } from "react-icons/fi";
import dissertation from "../../../assets/files/Dissertation_Online.pdf";
import buildGiutarStockImg from "../../../assets/images/RiffMaster/BuildGuitarStockPhoto.png";
import guitarImg from "../../../assets/images/about/RiffMaster.png";
import neckDistancesImg from "../../../assets/images/RiffMaster/NeckDistances.png";
import fretArrangementsImg from "../../../assets/images/RiffMaster/FretArrangements.png";
import neckDesignImg from "../../../assets/images/RiffMaster/NeckDesign.png";
import fretDesignImg from "../../../assets/images/RiffMaster/FretDesign.png";
import neckCoverDesignImg from "../../../assets/images/RiffMaster/NeckCoverDesign.png";
import keyBoardScanningImg from "../../../assets/images/RiffMaster/KeyboardScanning.png";
import fretBoardDevelopmentImg from "../../../assets/images/RiffMaster/FretBoardDevelopment.jpg";
import fretMatrixImg from "../../../assets/images/RiffMaster/FretMatrix.png";
import fretWiringImg from "../../../assets/images/RiffMaster/FretWiring.jpg";
import completeFretWiringImg from "../../../assets/images/RiffMaster/CompleteFretWiring.png";
import neckDevelopmentImg from "../../../assets/images/RiffMaster/NeckDevelopment_2.png";
import bodyDesignImg from "../../../assets/images/RiffMaster/BodyDesign.png";
import bodySupportImg from "../../../assets/images/RiffMaster/BodySupport.png";
import bodyFrontCoverImg from "../../../assets/images/RiffMaster/BodyFrontCover.jpg";
import bendingImg from "../../../assets/images/RiffMaster/Bending.jpg";
import supportElementsImg from "../../../assets/images/RiffMaster/SupportElements.jpg";
import neckCoverImg from "../../../assets/images/RiffMaster/NeckCovers.jpg";
import neckBodyJointImg from "../../../assets/images/RiffMaster/BodyNeckJoint.jpg";
import paintedImg from "../../../assets/images/RiffMaster/Pained.jpg";
import strumMechanismImg from "../../../assets/images/RiffMaster/StrumMechanism.png";
import strumComponentsImg from "../../../assets/images/RiffMaster/StrumComponents.png";
import strumAssemblyImg1 from "../../../assets/images/RiffMaster/StrumAssembly_1.png";
import strumAssemblyImg2 from "../../../assets/images/RiffMaster/StrumAssembly_3.png";
import strumAssemblyImg3 from "../../../assets/images/RiffMaster/StrumAssembly_2.png";
import strumWiring from "../../../assets/images/RiffMaster/StrumWiring.jpg";
import strumDesignImg from "../../../assets/images/RiffMaster/StrumDesign.png";
import toggleLEDsDesignImg from "../../../assets/images/RiffMaster/ToggleandLEDsDesign.png";
import arduinoWiringImg from "../../../assets/images/RiffMaster/ArduinoWiring.jpg";
import toggleImg from "../../../assets/images/RiffMaster/Toggle.jpg";
import assembledStrumImg from "../../../assets/images/RiffMaster/AssembledStrum.png";
import protocolImg from "../../../assets/images/RiffMaster/Protocol.png";
import debounceImg from "../../../assets/images/RiffMaster/Debounce.png";
import headStockDesignImg from "../../../assets/images/RiffMaster/HeadStock.png";
import headStockBackImg from "../../../assets/images/RiffMaster/HeadStockBack.jpg";
import headStockFrontImg from "../../../assets/images/RiffMaster/HeadStockFront.jpg";
import saddleImg from "../../../assets/images/RiffMaster/Saddle.jpg";
import controllerCode from "../../../assets/files/projects/controller.txt";
import codeSnippets from "./codeSnippets";
import "./RiffMaster.scss";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";
import Page from "../../sharedComponents/Page/Page";
import References, {
    Reference,
} from "../../sharedComponents/References/References";
import { Link } from "react-router-dom";
import LikeButton from "../../sharedComponents/LikeButton/LikeButton";
import { blogArticles } from "../../pages/Blog/blogs";

interface Props {
    pageName: string;
    path: string;
}

const RiffMaster = ({ pageName, path }: Props) => {
    const article = blogArticles.find((article) => article.to === path);
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    const references: Reference[] = [
        {
            title: "Keyboard Matrix, 2000",
            author: "Dribin",
            source: "https://www.dribin.org/dave/keyboard/one_html/",
        },
        {
            title: "Exploring the Raspberry Pi 2 with C++. Springer, 2015",
            author: "Warren",
            source: "https://link.springer.com/book/10.1007/978-1-4842-1739-9",
        },
        {
            title: "Gibson Les Paul Guitar Templates",
            author: "Electric Herald",
            source: "https://www.electricherald.com/gibson-les-paul-guitar-templates/",
        },
    ];

    return (
        <Page title="Tivadar Debnar | Guitar Console" path={path}>
            <Nav pageName={pageName} />
            {subMenuVisible && <SubNav />}
            {mobileMenuVisible && <Menu pageName={pageName} />}
            <main>
                <h1>Project RiffMaster</h1>
                <h2 className="riffmaster">
                    Building a Digital Guitar Instrument with a Web App
                </h2>
                <img
                    className="image--lrg"
                    src={buildGiutarStockImg}
                    alt="Guitar Building"
                />
                <p>
                    We all know the pain when it comes to choosing a
                    dissertation topic, and it is exponentially more
                    excruciating when our project must also be implemented for
                    more practical disciplines, such as computer science and
                    software engineering. While originality is encouraged,
                    graduates must also consider the feasibility and the
                    relatively short deadline. This digital guitar project idea
                    was born in my internal struggle to be innovative and create
                    a project that might contribute to the greater good with
                    some educational and entertainment aspects.
                </p>
                <a className="button" href={dissertation} download>
                    Documentation
                    <FiDownload />
                </a>
                <h3 className="riffmaster">Project Outline</h3>
                <p>
                    Create a bespoke music experience by developing a hardware
                    device and accompanying software that offers a naturalistic
                    guitar layout for learning and playing. The device's
                    minimalistic design ensures affordability while connecting
                    via USB to an online platform. This comprehensive solution
                    aims to enhance guitar skill development through playful
                    learning of riffs, chords, and songs.
                </p>
                <h3 className="riffmaster">The Guitar</h3>
                <p>
                    First, we need to build a digital guitar with the following
                    features: realistic guitar dimensions and shape, USB
                    connection, 20 fret buttons in six rows, strum bar switches,
                    three LEDs and a power toggle. Our instrument will feature
                    an Arduino board to detect and communicate user interactions
                    through USB; therefore, an Arduino Due will be used, as it
                    has plenty of digital pins and has bidirectional USB
                    communication (can act as an external keyboard).
                    Alternatively, Arduino Leonardo or Mega can also be used.
                </p>
                <Figure
                    image={guitarImg}
                    className="image--lrg guitar riffmaster"
                    alt="The Final Guitar Instrument"
                    caption="The Final Guitar Instrument"
                />
                <p>
                    I used a{" "}
                    <a
                        className="inline"
                        href="https://www.electricherald.com/gibson-les-paul-guitar-templates/"
                    >
                        Gibson Les Paul template
                    </a>{" "}
                    to ensure the instrument had appropriate dimensions and
                    shape. Although Les Paul is designed for electric guitars,
                    we can build it semi-acoustic to fit the electric components
                    in the body cavity.
                </p>

                <h3 className="riffmaster">Building the Neck</h3>
                <p>
                    The user will interact with a range of buttons in a mesh
                    arrangement to communicate which string has active finger
                    press positions associated. Hence, the neck width and depth
                    must be small enough that all six buttons on a fret may be
                    pressed simultaneously with an index finger for barre
                    chords. However, the neck must be wide enough to leave
                    sufficient space for the electronics (42-57mm for Les Paul).
                    Our console's neck will have a constant width to simplify
                    the hardware development, and 50mm is a compromise that
                    satisfies usability requirements while sufficient for
                    allocating all electrical components. The length of the neck
                    is the standard 460mm, and the fret distances are calculated
                    with the golden ratio.
                </p>
                <Figure
                    image={neckDistancesImg}
                    className="image--lrg bg--white"
                    alt="Guitar Neck Distances"
                    caption="Guitar Neck Distances"
                />
                <p>
                    We will use polystyrene sheets for the prototype in two
                    thickness sizes: 2mm for bending and 3mm for structure.
                    Polystyrene sheets are available in most hardware shops;
                    they are cheap (£30-50), bend on heat well, are relatively
                    light, can be cut without specialised tools, and are
                    excellent electrical insulators. The guitar neck requires no
                    bending, but we can use the 2mm plastic to cut our template
                    to reduce the thickness of the neck.
                </p>
                <Figure
                    image={fretArrangementsImg}
                    className="image--lrg bg--white"
                    alt="Fret Arrangements"
                    caption="Fret Arrangements"
                />
                <p>
                    The drill holes will be evenly allocated alongside the
                    fret's axis, distributing the buttons comfortably with 0.7mm
                    wide switch legs in rectangular arrangements.
                </p>
                <Figure
                    image={neckDesignImg}
                    className="image--lrg bg--white"
                    alt="Neck Design"
                    caption="Neck Design"
                />
                <p>
                    We also need 20 fret pieces from the 2mm material, so our
                    frets may receive string supports with grooves, which offer
                    protection for tactile switches, provide guides to the
                    users' hands, and can keep actual strings in place for an
                    optional stringed solution.{" "}
                </p>
                <Figure
                    image={fretDesignImg}
                    className="image--med bg--white"
                    alt="Fret Design"
                    caption="Fret Design"
                />
                <Figure
                    image={fretBoardDevelopmentImg}
                    className="image--med"
                    alt="Fretboard Development"
                    caption="Fretboard Development"
                />
                <p>
                    The buttons will face towards the user's fingers; therefore,
                    no electronic components may be allocated to the otherwise
                    compressed interface. The switch legs must lead through the
                    drill holes by wire extensions to reach the backside
                    circuit. The electronics must be protected from physical
                    impacts; therefore, a back cover and side protection are
                    required. Moreover, the neck length must be extended to hold
                    the neck in the instrument body securely.
                </p>
                <Figure
                    image={neckCoverDesignImg}
                    className="image--med bg--white"
                    alt="Neck Cover Design"
                    caption="Neck Cover Design"
                />
                <h3 className="riffmaster">Wiring the Neck</h3>
                <p>
                    As I mentioned, we will use mesh wiring for our buttons in a
                    6 x 20 matrix. Keyboards and keypads often use matrices to
                    consolidate greater numbers of switches to microcontroller
                    pins. When a key is pressed, a column wire contacts a row
                    wire and completes a circuit. The keyboard controller
                    detects this closed circuit and registers it as a key press.{" "}
                    <Link className="Reference__Link" to={references[0].source}>
                        ({references[0].author})
                    </Link>{" "}
                    For example, PC keyboards usually range from 63 to 105 keys
                    arranged in a matrix. Meshing the switch wires would result
                    in a drastically reduced digital pin requirement. Matrix
                    keyboards use scanning algorithms to detect button presses,
                    where rows and columns are individually read. After
                    reengineering different matrix examples, I boiled down the
                    algorithms to this simple version:
                </p>
                <Figure
                    image={keyBoardScanningImg}
                    className="image--med bg--white"
                    alt="Keyboard Scanning"
                    caption="Keyboard Scanning"
                />
                <p>
                    We may wire up our button matrix with any N1 range diode to
                    eliminate keypress ghosting and masking issues. (I used
                    N14007 diodes).
                </p>
                <Figure
                    image={fretMatrixImg}
                    className="image--med bg--white"
                    alt="Fretboard Matrix"
                    caption="Fretboard Matrix"
                />
                <p>
                    I used universal PCBs pasted on the backside of the
                    fretboard to simplify soldering. Additionally, I used six
                    stripped wires for the columns to reduce a substantial
                    amount of extra wiring. These stripped wires serve as buses
                    to the Arduino column digital pins.
                </p>
                <Figure
                    image={fretWiringImg}
                    className="image--med bg--white"
                    alt="Fret Wiring"
                    caption="Fret Wiring"
                />
                <p>
                    Finally, we can connect the row and column wires to our
                    Arduino. Although the choice of digital pins may seem
                    arbitrary, the reason I used these pins is that some of my
                    digital pins were faulty. Ideally, I could use pins 22-52,
                    but the main point is that row, and column wires should be
                    close enough to tape them together. (Otherwise, there will
                    be a lot of messy wiring.)
                </p>
                <Figure
                    image={completeFretWiringImg}
                    className="image--med bg--white"
                    alt="Complete Fret Wiring"
                    caption="Complete Fret Wiring"
                />
                <Figure
                    image={neckDevelopmentImg}
                    className="image--med bg--white"
                    alt="Neck Development"
                    caption="Neck Development"
                />
                <h3 className="riffmaster">Testing the Fretboard</h3>
                <p>
                    Our first milestone is to read the device's state. When
                    state change happens, they are communicated through USB as
                    sequences of emulated keyboard presses. We may use
                    simplified state machines to determine currently activated
                    switches. We must differentiate previous and current
                    conditions for frets/strums. We allocate a pair of 6/20 2D
                    matrices and length-six arrays for the frets and strums. The
                    initial values are reversed as we used pull-up resistors:
                    zero means pressed, and one means released.
                </p>
                <Code
                    fileName="controller.ino"
                    language="arduino"
                    content={codeSnippets.arduinoInitialisation}
                />

                <p>
                    Next, we need to initialise our digital pins. We may apply
                    Arduino's internal pull-up resistor because we did not use
                    resistors in our circuitry.
                </p>
                <Code
                    fileName="controller.ino"
                    language="arduino"
                    content={codeSnippets.pinSetup}
                />
                <p>
                    We activate the column pins with each loop and read
                    individual row values, updating the previous and current
                    button states. We can test our buttons on the serial monitor
                    with the following code snippet:
                </p>
                <Code
                    fileName="controller.ino"
                    language="arduino"
                    content={codeSnippets.fretTest}
                />
                <h3 className="riffmaster">Building the Guitar Body</h3>
                <p>
                    The main right-hand component is the strum unit, which
                    triggers events that produce sound effects or gameplay
                    actions. But beyond the strum, the instrument's body must
                    allocate a standard-size on/off toggle, LEDs, USB
                    connection, and support elements to attach the neck, cover,
                    and body. Hand manufacturing constraints the range of
                    executable solutions, like bending perfect curves from
                    plastic or creating parts that fit surgically together, and
                    our design must consider an acceptable tolerance of ±1mm.
                </p>
                <Figure
                    image={bodyDesignImg}
                    className="image--med bg--white"
                    alt="Guitar Body Design"
                    caption="Guitar Body Design"
                />
                <p>
                    We cut two identical sheets for the guitar body's front and
                    back cover, and the front piece must be drilled for the
                    toggle switch and three LEDs.
                </p>
                <Figure
                    image={bodyFrontCoverImg}
                    className="image--med bg--white"
                    alt="Guitar Body Front Cover"
                    caption="Guitar Body Front Cover"
                />
                <h3 className="riffmaster">Bending the Side Piece</h3>
                <p>
                    A wooden template body was created to bend the side walls to
                    the appropriate curvatures because several attempts of
                    free-handed bending resulted in broken pieces of already cut
                    material. Although the polystyrene side piece reacted to the
                    heat, I highly recommend using a hairdryer and proceeding
                    very slowly with the bending.
                </p>
                <Figure
                    image={bendingImg}
                    className="image--med bg--white"
                    alt="Bending the Side Piece"
                    caption="Bending the Side Piece"
                />
                <h3 className="riffmaster">Support Elements</h3>
                <p>
                    The body must be assembled in a way to allow disassembly for
                    servicing. Support units with embedded nuts and screws will
                    hold the body and cover together. These connectors reinforce
                    the device's structural integrity, as the body may be under
                    more stress than other electrical handheld devices. The body
                    must withstand the pressure of the user's right arm's weight
                    without damaging the open-cavity structure. One typical
                    guitar design failure is the weak neck-body connection,
                    resulting in bent or damaged guitar necks. Substantial
                    pulling or pushing forces generate leverage that may easily
                    deform or break the controller apart, and additional
                    components will reinforce the neck to endure reasonable use.
                </p>
                <Figure
                    image={bodySupportImg}
                    className="image--med bg--white"
                    alt="Guitar Body Assembly Design"
                    caption="Guitar Body Assembly Design"
                />
                <Figure
                    image={supportElementsImg}
                    className="image--med bg--white"
                    alt="Guitar Body Support Elements"
                    caption="Guitar Body Support Elements"
                />
                <h3 className="riffmaster">Finalising the Neck Cover</h3>
                <p>
                    Assuming that we tested the fretboard buttons (and button
                    press combinations), we can finalise the guitar neck with
                    side walls and a removable cover. Not doing it right after
                    the fretboard development and waiting to finish the body
                    first gave me enough time to test the fretboard thoroughly.
                    With the sidewalls, correcting wiring or replacing
                    components in this tight circuit would be a nightmare.
                </p>
                <Figure
                    image={neckCoverImg}
                    className="image--med bg--white"
                    alt="Neck Cover"
                    caption="Neck Cover"
                />
                <h3 className="riffmaster">Neck Body Attachment</h3>
                <p>
                    The neck attachment was the riskiest part of the assembly.
                    Should the neck have failed to hold together precisely, the
                    whole project might have been endangered, as Gorilla glue
                    and CT1 cannot be removed without severe damage.
                </p>
                <Figure
                    image={neckBodyJointImg}
                    className="image--med bg--white"
                    alt="Body Neck Joint"
                    caption="Body Neck Joint"
                />
                <p>
                    We can finish our lovely guitar with a lick of matt black
                    paint.
                </p>
                <Figure
                    image={paintedImg}
                    className="image--med bg--white"
                    alt="Painted Guitar Console"
                    caption="Painted Guitar Console"
                />
                <h3 className="riffmaster">Strum Unit</h3>
                <p>
                    Guitars are polyphonic instruments, and strings can be
                    strummed simultaneously. Additionally, guitars produce sound
                    when they are strummed, except hammer-on and pull-up sounds,
                    which are beyond our project's scope. We need to find a
                    straightforward solution to trigger a strum event. For
                    authenticity, we can go one step ahead of Guitar Hero
                    consoles that use swinging mechanical toggle switches for
                    strums and equip our instrument with actual strings. The
                    console strings are attached to fixed points, and one end
                    features a momentary tactile switch, and the other may be
                    set to a screw that adjusts the tension. The switch side can
                    also apply a lever with adjustable tension.
                </p>
                <Figure
                    image={strumMechanismImg}
                    className="image--med bg--white"
                    alt="Strum Mechanism"
                    caption="Strum Mechanism"
                />
                <p>
                    Some of the other feasible solutions are vibration or
                    pressure sensors, ideal for improved versions of the strum
                    mechanism. These could be used as analogue inputs, and some
                    additional features could be implemented, such as muting and
                    strum force. In the future, I intend to experiment with
                    these and create a working analogue solution.
                </p>
                <h3 className="riffmaster">Strum Unit Design</h3>
                <p>
                    The strum component is a separate serviceable unit that can
                    be easily removed; therefore, we may create a frame
                    scaffolding for our strings and a hull that hollows in the
                    guitar body. This design assembles the unit from flat
                    plastic pieces that can be pasted together:
                </p>
                <Figure
                    image={strumComponentsImg}
                    className="image--med bg--white"
                    alt="Strum Components"
                    caption="Strum Components"
                />
                <p>We can put our components together in the following way:</p>
                <Figure
                    image={strumDesignImg}
                    className="image--med bg--white"
                    alt="Strum Design"
                    caption="Strum Design"
                />
                <h3 className="riffmaster">Strum Assembly</h3>
                <p>
                    The strum unit was reasonably straightforward to assemble;
                    however, the screws, levers, and string tension adjustments
                    were time-consuming.
                </p>
                <Figure
                    image={strumAssemblyImg1}
                    className="image--med bg--white"
                    alt="Strum Component Assembly"
                    caption="Strum Component Assembly"
                />
                <Figure
                    image={strumAssemblyImg2}
                    className="image--med bg--white"
                    alt="Strum Switches"
                    caption="Strum Switches"
                />
                <Figure
                    image={strumAssemblyImg3}
                    className="image--med bg--white"
                    alt="Strum Screws and Springs"
                    caption="Strum Screws and Springs"
                />
                <p>
                    We can wire up our unit and connect it to the Arduino. I
                    used digital pins 16 to 35 for the column (fret) and 2 to 7
                    for the column (row) wires. As I mentioned, my pin layout is
                    affected by faulty digital pins.
                </p>
                <Figure
                    image={strumWiring}
                    className="image--med bg--white"
                    alt="Strum Wiring"
                    caption="Strum Wiring"
                />
                <h3 className="riffmaster">Toggle and LEDs</h3>
                <p>
                    Users should interact with the device without disrupting
                    traditional inputs, and USB keyboard communication may
                    depend on the final communication protocol. The device must
                    have an ON/OFF switch that disables any serial communication
                    towards the computer. Additionally, three LEDs will provide
                    further information about the device's state:
                </p>
                <ul className="ul--riffmaster-leds">
                    <li>
                        <div className="circle">
                            <i className="red"></i>
                        </div>
                        <strong>Red</strong>: Device connected to USB,
                    </li>
                    <li>
                        <div className="circle">
                            <i className="green"></i>
                        </div>
                        <strong>Green</strong>: USB communication is ON,
                    </li>
                    <li>
                        <div className="circle">
                            <i className="blue"></i>
                        </div>
                        <strong>Blue</strong>: USB data transfer.
                    </li>
                </ul>
                <br />
                <Figure
                    image={toggleLEDsDesignImg}
                    className="image--med bg--white"
                    alt="Toggle and Leds Wiring Design"
                    caption="Toggle and Leds Wiring Design"
                />
                <Figure
                    image={arduinoWiringImg}
                    className="image--med bg--white"
                    alt="Arduino Wiring"
                    caption="Arduino Wiring"
                />
                <Figure
                    image={toggleImg}
                    className="image--med bg--white"
                    alt="Toggle and Leds Wiring"
                    caption="Toggle and Leds Wiring"
                />
                <p>Finally, we can string up the device.</p>
                <Figure
                    image={assembledStrumImg}
                    className="image--med bg--white"
                    alt="Assembled Strum Unit"
                    caption="Assembled Strum Unit"
                />
                <h3 className="riffmaster">Registering Strums</h3>
                <p>
                    For completeness and common ground, let me include my pin
                    layout and variables that may appear in the upcoming code
                    snippets. Alternatively, you can download the complete
                    controller code{" "}
                    <a className="inline" href={controllerCode} download>
                        here
                    </a>
                    .
                </p>
                <Code
                    fileName="controller.ino"
                    language="arduino"
                    content={codeSnippets.constants}
                />
                <p>
                    First, we need to initialise our pins in the setup function.
                </p>
                <Code
                    fileName="controller.ino"
                    language="arduino"
                    content={codeSnippets.strumSetup}
                />
                <p>
                    We can flag cycles where a state change happens by setting a
                    transaction variable false at the beginning of each cycle
                    and flipping it to true whenever a fret change or a state
                    change occurs. The possible state changes are the following:
                    fretboard buttons are pressed/released, or strings are
                    activated or in their default stationary position. These
                    state changes must trigger a controller event by setting the
                    device's transaction state to true.
                </p>
                <Code
                    fileName="controller.ino"
                    language="arduino"
                    content={codeSnippets.setControllerState}
                />
                <h3 className="riffmaster">Communication Protocol</h3>
                <p>
                    There are multiple ways to design device communication, such
                    as MIDI or binary protocols; however, I sought an
                    easy-to-implement version in this scenario. Our Arduino will
                    be used as an external keyboard to communicate with our
                    computer, transferring textual information. But there are
                    over 252 possible state combinations and just 62
                    alphanumeric values that can be safely used if we use both
                    upper and lower case letters and digits. This means that we
                    will send multiple keypress events. The fewer events are
                    used, the more performant the communication will be, and we
                    may easily fit an event into a two-character combination
                    (3844). On the other hand, creating a logical mapping
                    between character pairs and events is cumbersome, and I
                    would rather see a solution with some relation to the
                    physical state of the device. A more straightforward
                    protocol could compromise with four characters using only
                    digits. A flag for the event, a fret number, and a strum
                    string number.
                </p>
                <Figure
                    image={protocolImg}
                    className="image--med bg--white"
                    alt="Communication Protocol"
                    caption="Communication Protocol"
                />
                <h3 className="riffmaster">Debounce Handling</h3>
                <p>
                    The physical action of pushing a button might require a
                    half-second or so, so we tend to think in those terms. On
                    the other hand, a digital circuit can react to a million of
                    events in the same time frame.{" "}
                    <Link className="Reference__Link" to={references[1].source}>
                        ({references[1].author})
                    </Link>{" "}
                    Momentary tactile switches are not guaranteed to be immune
                    to physical bouncing and may trigger unsolicited actions
                    from the controller. Furthermore, our device has two types
                    of inputs with directly opposing behaviour.
                    <br />
                    <strong className="bold">Fret Buttons </strong> From the
                    traditional perspective, inputs register events when
                    pressed, just like our fret switches. When activation
                    happens, we assume that state changes are intentional after
                    a particular interval, typically ~50-100ms.
                    <br />
                    <strong className="bold">Strum Switches</strong> Unlike
                    frets, strum switches are activated after strings are put
                    under pressure and released. We may also expect extra noise,
                    as our switches use strings, levers and springs that may
                    oscillate. After the first release, we measure the interval
                    of state changes and register if the last change happened
                    after the debounce time allowance.
                </p>
                <Figure
                    image={debounceImg}
                    className="image--med bg--white"
                    alt="Debounce"
                    caption="Debounce"
                />
                <h3 className="riffmaster">Sending an Event Message</h3>
                <p>
                    Now that we have our communication protocol and are aware of
                    the debounce issues, we can send a message from our device
                    through keyboard presses. First, we must initialise a
                    debounce array for strums and a 2D array for frets and
                    measure time with the millis function. Then we traverse both
                    the fret and strum states separately, and any change
                    detected outside the debounce timing will send a four-digit
                    keyboard sequence with the event, fret and strum information
                    using the standard Keyboard library.
                </p>
                <Code
                    fileName="controller.ino"
                    language="arduino"
                    content={codeSnippets.messaging}
                />
                <h3 className="riffmaster">Head Stock</h3>
                <p>
                    Although users can interact with the fret by buttons and use
                    chord patterns on the left-hand side, controls may not feel
                    authentic enough. After testing the device for more complex
                    chords and finger patterns, I came to the conclusion that
                    finding the exact locations of fret positions is more
                    problematic, even after equipping my buttons with button
                    caps. Therefore, setting up our instrument with strings
                    would hopefully help guide the user's hand naturally as
                    guitar strings do. To set up the six strings on the
                    fretboard, we have to create a headstock, which provides
                    fixed positions to attach strings as guidelines. The
                    headstock unit is an optional accessory and must be
                    attachable/detachable to the neck.
                </p>
                <Figure
                    image={headStockDesignImg}
                    className="image--med bg--white"
                    alt="Head Stock Design"
                    caption="Head Stock Design"
                />
                <p>
                    Now that we have our headstock, we can set up our strings.
                    Depending on the type of button caps used, modifications may
                    be needed; the caps I ordered made the strings slip off from
                    their place when pressed, so I grooved all 120 individually.
                </p>
                <Figure
                    image={headStockBackImg}
                    className="image--med bg--white"
                    alt="Head Stock from the Back"
                    caption="Head Stock from the Back"
                />
                <Figure
                    image={headStockFrontImg}
                    className="image--med bg--white"
                    alt="Head Stock from the Front"
                    caption="Head Stock from the Front"
                />
                <p>
                    Lastly, similar to our fret design at the beginning of this
                    post, we may create a saddle to hold our string in place.
                </p>
                <Figure
                    image={saddleImg}
                    className="image--med bg--white"
                    alt="Saddle"
                    caption="Saddle"
                />
                <p>
                    Now that our guitar console is up and running, we are ready
                    to develop our own guitar application. You can read my
                    article about how to build your own guitar hero game
                    prototype by clicking the link below.
                    <br />
                    <a className="inline" href="/#/blog/sounds-with-howler">
                        How to build your guitar console application.
                    </a>
                </p>
                <LikeButton path={path} />
                <References references={references} />
                {article && article.created && (
                    <BlogTimeStamp
                        created={article.created}
                        updated={article.updated}
                    />
                )}
            </main>
            <Footer path={path} />
        </Page>
    );
};

export default RiffMaster;
