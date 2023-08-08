import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import Nav from "../Nav/Nav";
import SubNav from "../SubNav/SubNav";
import { FiDownload } from "react-icons/fi";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import dissertation from "../../assets/files/Dissertation_Online.pdf";
import buildGiutarStockImg from "../../assets/images/RiffMaster/BuildGuitarStockPhoto.png";
import guitarImg from "../../assets/images/about/RiffMaster.png";
import neckDistancesImg from "../../assets/images/RiffMaster/NeckDistances.png";
import fretArrangementsImg from "../../assets/images/RiffMaster/FretArrangements.png";
import neckDesignImg from "../../assets/images/RiffMaster/NeckDesign.png";
import fretDesignImg from "../../assets/images/RiffMaster/FretDesign.png";
import neckCoverDesignImg from "../../assets/images/RiffMaster/NeckCoverDesign.png";
import keyBoardScanningImg from "../../assets/images/RiffMaster/KeyboardScanning.png";
import fretBoardDevelopmentImg from "../../assets/images/RiffMaster/FretBoardDevelopment.jpg";
import fretMatrixImg from "../../assets/images/RiffMaster/FretMatrix.png";
import fretWiringImg from "../../assets/images/RiffMaster/FretWiring.jpg";
import completeFretWiringImg from "../../assets/images/RiffMaster/CompleteFretWiring.png";
import neckDevelopmentImg from "../../assets/images/RiffMaster/NeckDevelopment_2.png";
import "./RiffMaster.scss";

interface Props {
    pageName: string;
    mobileMenuVisible: boolean;
    setMobileMenuVisible: (visible: boolean) => void;
    themeMode: string;
    setThemeMode: (mode: string) => void;
    subMenuVisible: boolean;
    setSubMenuVisible: (visible: boolean) => void;
}

const codeSnippetArduinoInitialisation = `// Left Hand Inputs
const byte ROW_PINS[6] = { 7, 6, 5, 4, 3, 2 };                       // Row PINs (Strings): Read Voltage on a Fret
const byte STRUM_PINS[6]  = {A0, A1, A2, A3, A4, A5};                // Analogue Pins as Digital Pins
const byte COL_LEN = sizeof(COLUMN_PINS);                            // Number of Frets
const byte ROW_LEN = sizeof(ROW_PINS);                               // Number of Strings
bool newFretState[ROW_LEN][COL_LEN] = {                              // State of Fret Positions Switches
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
};
bool oldFretState[ROW_LEN][COL_LEN] = {                              // Store Old State to Compare to New in Every Loop
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
    { 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 },
};
`;

const codeSnippetPinSetup = `// Run When USB Connected
void setup() {
    //  FRETS INIT 
    for (byte ci = 0; ci < COL_LEN; ci++) {                          // Cycle through Columns (Frets)
        pinMode(COLUMN_PINS[ci], INPUT_PULLUP);                      // Column Pull-Up Resistor ON
        digitalWrite(COLUMN_PINS[ci], HIGH);                         // Set Voltage High
    }
`;

const codeSnippetFretTest = `// Display the State on Serial Monitor | Use for Testing and Troubleshooting the Device
void printState(short frequency = 0) {
    for (byte ri = 0; ri < ROW_LEN; ri++) {                          // Traverse Rows (Strings)
        const char stringNames[6] = {'E', 'A', 'D', 'G', 'B', 'e'};  // From Lowest to Highest    
        Serial.print(stringNames[ri]);                               // Display String Name
        Serial.print(" |");                                       
        for (byte ci = 0; ci < COL_LEN; ci++) {                      // Traverse Columns (Frets)
            Serial.print(oldFretState[ri][ci]);                      // Display Old State
            Serial.print(newFretState[ri][ci]);                      // Display New State
            Serial.print("|");
        }

        Serial.println();                                            // New Line Between Rows
    }
    if (frequency) delay(frequency);                                 // Optionally Delay Frequency of Loop (Only for Testing Purposes)
}

`;

const RiffMaster = ({
    pageName,
    mobileMenuVisible,
    setMobileMenuVisible,
    themeMode,
    setThemeMode,
    subMenuVisible,
    setSubMenuVisible,
}: Props) => {
    return (
        <>
            <Nav
                pageName={pageName}
                subMenuVisible={subMenuVisible}
                setSubMenuVisible={setSubMenuVisible}
                setMobileMenuVisible={setMobileMenuVisible}
                mobileMenuVisible={mobileMenuVisible}
                themeMode={themeMode}
            />
            {subMenuVisible && (
                <SubNav themeMode={themeMode} setThemeMode={setThemeMode} />
            )}
            {mobileMenuVisible && (
                <Menu
                    pageName="projects/riffmaster"
                    themeMode={themeMode}
                    setThemeMode={setThemeMode}
                    setMobileMenuVisible={setMobileMenuVisible}
                />
            )}
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
                <figure>
                    <img
                        className="image--lrg guitar riffmaster"
                        src={guitarImg}
                        alt="RiffMaster Guitar"
                    />
                    <figcaption>The Final Guitar Instrument</figcaption>
                </figure>

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
                <figure>
                    <img
                        className="image--lrg bg--white"
                        src={neckDistancesImg}
                        alt="Neck Distances"
                    />
                    <figcaption>Guitar Neck Distances</figcaption>
                </figure>
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
                <figure>
                    <img
                        className="image--lrg bg--white"
                        src={fretArrangementsImg}
                        alt="Fret Arrangements"
                    />
                    <figcaption>Fret Arrangements</figcaption>
                </figure>
                <p>
                    The drill holes will be evenly allocated alongside the
                    fret's axis, distributing the buttons comfortably with 0.7mm
                    wide switch legs in rectangular arrangements.
                </p>
                <figure>
                    <img
                        className="image--lrg bg--white"
                        src={neckDesignImg}
                        alt="Neck Design"
                    />
                    <figcaption>Neck Design</figcaption>
                </figure>
                <p>
                    We also need 20 fret pieces from the 2mm material, so our
                    frets may receive string supports with grooves, which offer
                    protection for tactile switches, provide guides to the
                    users' hands, and can keep actual strings in place for an
                    optional stringed solution.{" "}
                </p>
                <figure>
                    <img
                        className="image--lrg bg--white"
                        src={fretDesignImg}
                        alt="Fret Design"
                    />
                    <figcaption>Fret Design</figcaption>
                </figure>
                <figure>
                    <img
                        className="image--med"
                        src={fretBoardDevelopmentImg}
                        alt="Fretboard Development"
                    />
                    <figcaption>Fretboard Development</figcaption>
                </figure>
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
                <figure>
                    <img
                        className="image--lrg bg--white"
                        src={neckCoverDesignImg}
                        alt="Neck Cover Design"
                    />
                    <figcaption>Neck Cover Design</figcaption>
                </figure>
                <h3 className="riffmaster">Wiring the Neck</h3>
                <p>
                    As I mentioned, we will use mesh wiring for our buttons in a
                    6 x 20 matrix. Keyboards and keypads often use matrices to
                    consolidate greater numbers of switches to microcontroller
                    pins. When a key is pressed, a column wire contacts a row
                    wire and completes a circuit. The keyboard controller
                    detects this closed circuit and registers it as a key press.
                    For example, PC keyboards usually range from 63 to 105 keys
                    arranged in a matrix. Meshing the switch wires would result
                    in a drastically reduced digital pin requirement. Matrix
                    keyboards use scanning algorithms to detect button presses,
                    where rows and columns are individually read. After
                    reengineering different matrix examples, I boiled down the
                    algorithms to this simple version:
                </p>
                <figure>
                    <img
                        className="image--lrg bg--white"
                        src={keyBoardScanningImg}
                        alt="Keyboard Scanning"
                    />
                    <figcaption>Keyboard Scanning</figcaption>
                </figure>
                <p>
                    We may wire up our button matrix with any N1 range diode to
                    eliminate keypress ghosting and masking issues. (I used
                    N14007 diodes).
                </p>
                <figure>
                    <img
                        className="image--lrg bg--white"
                        src={fretMatrixImg}
                        alt="Fretboard Matrix"
                    />
                    <figcaption>Fretboard Button Matrix</figcaption>
                </figure>
                <p>
                    I used universal PCBs pasted on the backside of the
                    fretboard to simplify soldering. Additionally, I used six
                    stripped wires for the columns to reduce a substantial
                    amount of extra wiring. These stripped wires serve as buses
                    to the Arduino column digital pins.
                </p>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={fretWiringImg}
                        alt="Fret Wiring"
                    />
                    <figcaption>Fret Wiring</figcaption>
                </figure>
                <p>
                    Finally, we can connect the row and column wires to our
                    Arduino. Although the choice of digital pins may seem
                    arbitrary, the reason I used these pins is that some of my
                    digital pins were faulty. Ideally, I could use pins 22-52,
                    but the main point is that row, and column wires should be
                    close enough to tape them together. (Otherwise, there will
                    be a lot of messy wiring.)
                </p>
                <figure>
                    <img
                        className="image--lrg bg--white"
                        src={completeFretWiringImg}
                        alt="Complete Fret Wiring"
                    />
                    <figcaption>Complete Fret Wiring</figcaption>
                </figure>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={neckDevelopmentImg}
                        alt="Neck Development"
                    />
                    <figcaption>
                        Lost my smile after 40+ hours of soldering
                    </figcaption>
                </figure>
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
                <SyntaxHighlighter
                    className="code"
                    language="arduino"
                    style={atomOneDark}
                >
                    {codeSnippetArduinoInitialisation}
                </SyntaxHighlighter>
                <p>
                    Next, we need to initialise our digital pins. We may apply
                    Arduino's internal pull-up resistor because we did not use
                    resistors in our circuitry.
                </p>
                <SyntaxHighlighter
                    className="code"
                    language="arduino"
                    style={atomOneDark}
                >
                    {codeSnippetPinSetup}
                </SyntaxHighlighter>
                <p>
                    We can test our buttons with the following code snippet on
                    the serial monitor:
                </p>
                <SyntaxHighlighter
                    className="code"
                    language="arduino"
                    style={atomOneDark}
                >
                    {codeSnippetFretTest}
                </SyntaxHighlighter>
                <h3 className="riffmaster">Building the Guitar Body</h3>
            </main>
            <Footer />
        </>
    );
};

export default RiffMaster;
