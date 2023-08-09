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
import bodyDesignImg from "../../assets/images/RiffMaster/BodyDesign.png";
import bodySupportImg from "../../assets/images/RiffMaster/BodySupport.png";
import bodyFrontCoverImg from "../../assets/images/RiffMaster/BodyFrontCover.jpg";
import bendingImg from "../../assets/images/RiffMaster/Bending.jpg";
import supportElementsImg from "../../assets/images/RiffMaster/SupportElements.jpg";
import neckCoverImg from "../../assets/images/RiffMaster/NeckCovers.jpg";
import neckBodyJointImg from "../../assets/images/RiffMaster/BodyNeckJoint.jpg";
import paintedImg from "../../assets/images/RiffMaster/Pained.jpg";
import strumMechanismImg from "../../assets/images/RiffMaster/StrumMechanism.png";
import strumComponentsImg from "../../assets/images/RiffMaster/StrumComponents.png";
import strumAssemblyImg1 from "../../assets/images/RiffMaster/StrumAssembly_1.png";
import strumAssemblyImg2 from "../../assets/images/RiffMaster/StrumAssembly_3.png";
import strumAssemblyImg3 from "../../assets/images/RiffMaster/StrumAssembly_2.png";
import strumWiring from "../../assets/images/RiffMaster/StrumWiring.jpg";
import strumDesignImg from "../../assets/images/RiffMaster/StrumDesign.png";
import assembledStrumImg from "../../assets/images/RiffMaster/AssembledStrum.png";
import protocolImg from "../../assets/images/RiffMaster/Protocol.png";
import debounceImg from "../../assets/images/RiffMaster/Debounce.png";
import controllerCode from "../../assets/files/projects/controller.txt";
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

const codeSnippetPinSetup = `void setup() {
    //  FRETS INIT 
    for (byte ci = 0; ci < COL_LEN; ci++) {                          // Cycle through Columns (Frets)
        pinMode(COLUMN_PINS[ci], INPUT_PULLUP);                      // Column Pull-Up Resistor ON   
    	  digitalWrite(COLUMN_PINS[ci], HIGH);                         // Set Voltage High
    }
    
    // STRING INIT
    for (byte ri = 0; ri < ROW_LEN; ri++){                           // Cycle Rows (Strings)
        pinMode(ROW_PINS[ri], OUTPUT);                               // Set Row as Output
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

const codeSnippetConstants = `// Global Variables
const byte COLUMN_PINS[20] = {                                       // Column PINs (Frets): Put Voltage Through
    16, 17, 18, 19, 20,                                              // PIN: 16 - 20  |  Fret:  1 - 5 
    21, 22, 23, 24, 25,                                              //      21 - 25  |  Fret:  6 - 10
    26, 27, 28, 29, 30,                                              //      26 - 30  |  Fret: 11 - 15
    31, 32, 33, 34, 35 };                                            // 
const byte ROW_PINS[6] = { 7, 6, 5, 4, 3, 2 };                       // Row PINs (Strings): Read Voltage on a Fret
const byte STRUM_PINS[6]  = {A0, A1, A2, A3, A4, A5};                // Analogue Pins as Digital Pins
const byte COL_LEN = sizeof(COLUMN_PINS);                            // Number of Frets
const byte ROW_LEN = sizeof(ROW_PINS);                               // Number of Strings
const int BAUD = 9600;//2000000;                                     // Serial Base-Clock Frequency (Highest)
const byte BLU_LED = 13;                                             // Blue LED Pin (User Interaction: For Testing Purposes and for Fun)
const byte GRE_LED = 12;                                             // Green LED Pin (Toggle Switch On)
const byte RED_LED = 11;                                             // Red LED Pin (USB On)                                
const byte TOG_IN  = 10;                                             // Toggle Switch Input Pin
const byte TOG_OUT = 9;                                              // Toggle Switch Output Pin
const int maxAllowedDebounceTime = 20;                               // Set the Debounce Time to Prevent Uninitiated Button Presses
`;

const codeSnippetStrumSetup = `// STRUM INIT
for (byte i = 0; i < 6; i++) {                                   // Cycle Strum PINS
    pinMode(STRUM_PINS[i], INPUT_PULLUP);                        // Built In Pullup On
    digitalWrite(STRUM_PINS[i], HIGH);                           // Set Strum High as Default
}`;

const codeSnippetSetControllerState = `
// Set the Controller's State Variables (Global Vars) and Detect Fret and Strum Presses
void setState() {
    transactionState = false;
    for (byte ri = 0; ri < ROW_LEN; ri++) {                          // Traverse Rows (Strings)
        digitalWrite(ROW_PINS[ri], LOW);                             // Set Row Voltage LOW
        
        for (byte ci = 0; ci < COL_LEN; ci++) {                      // Traverse Columns (Frets)
            oldFretState[ri][ci] = newFretState[ri][ci];             // Store Previous State

            const byte COL_READ = digitalRead(COLUMN_PINS[ci]);      // Read Column Voltage
            newFretState[ri][ci] = COL_READ;                         // Set New Fret State

            if (COL_READ == 0) transactionState = true;              // Set Blue LED ON when User Interacts with Fret Board
        }
  
        digitalWrite(ROW_PINS[ri], HIGH);                            // Reset Row Voltage HIGH   
    }

    for (byte i = 0; i < 6; i++) {                                   // Traverse Strums
        oldStrumState[i] = newStrumState[i];                         // Store Previous State
        newStrumState[i] = digitalRead(STRUM_PINS[i]);               // Set New Strum State

        if (newStrumState[i] == 0) transactionState = true;          // Set Blue LED ON when User Interacts with Fret Board
    }
}
`;

const codeSnippetMainLoop = `    if (onState && (fretStateChanged || strumStateChanged)) {        // If Communication is On and Either Input Changed
    sendState();                                                   // Send Message Through USB Serial
    //printState();                                                // Display State on Serial Monitor
  }`;

const codeSnippetMessaging = `const unsigned long currentTime = millis();                      // Get the Current Time
// Read Fret State
for (byte ri = 0; ri < ROW_LEN; ri++) {                          // Iterate Rows (Strings)
    for (byte ci = 0; ci < COL_LEN; ci++) {                      // Iterate Columns (Frets)
        bool oldState = oldFretState[ri][ci];                    // Get Old Fret Position
        bool newState = newFretState[ri][ci];                    // Get New Fret Position
        const unsigned long lastPressed = debounceFret[ri][ci];  // Read Last Time a Particular Fret Has Been Pressed
        const unsigned long elapsedTime =  currentTime - lastPressed; // Calculate Elapsed Time   
        if (oldState != newState) {
            debounceFret[ri][ci] =  currentTime;                 // Register Fret Interaction Time for Debounce If State Changes
            if (elapsedTime > maxAllowedDebounceTime) {          // Send Keyboard Presses
            bool event = !newState;                              // Negate Pressed State to get HIGH = 1 and LOW = 0
            int fret = ci + 1;                                   // Add One as Frets are Numbered from 1 - 20
            int string = ri + 1;                                 // Add One as Strings are Numbered from 1 - 
            Keyboard.print(event);                               // Add Event
            if (fret < 10) Keyboard.print("0");                  // Pad Single Digits with a 0
              Keyboard.print(fret);                              // Add Fret Number
              Keyboard.println(string);                          // Add String Number
            }        
        }            
    }
}`;

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
                        className="image--med bg--white"
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
                        className="image--med bg--white"
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
                        className="image--med bg--white"
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
                        className="image--med bg--white"
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
                        className="image--med bg--white"
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
                        className="image--med bg--white"
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
                    We activate the column pins with each loop and read
                    individual row values, updating the previous and current
                    button states. We can test our buttons on the serial monitor
                    with the following code snippet:
                </p>
                <SyntaxHighlighter
                    className="code"
                    language="arduino"
                    style={atomOneDark}
                >
                    {codeSnippetFretTest}
                </SyntaxHighlighter>
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
                <figure>
                    <img
                        className="image--med bg--white"
                        src={bodyDesignImg}
                        alt="Guitar Body Design"
                    />
                    <figcaption>Guitar Body Design</figcaption>
                </figure>
                <p>
                    We cut two identical sheets for the guitar body's front and
                    back cover, and the front piece must be drilled for the
                    toggle switch and three LEDs.
                </p>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={bodyFrontCoverImg}
                        alt="Guitar Body Front Cover"
                    />
                    <figcaption>Guitar Body Front Cover</figcaption>
                </figure>
                <h3 className="riffmaster">Bending the Side Piece</h3>
                <p>
                    A wooden template body was created to bend the side walls to
                    the appropriate curvatures because several attempts of
                    free-handed bending resulted in broken pieces of already cut
                    material. Although the polystyrene side piece reacted to the
                    heat, I highly recommend using a hairdryer and proceeding
                    very slowly with the bending.
                </p>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={bendingImg}
                        alt="Bending the Side Piece"
                    />
                    <figcaption>Bending the Side Piece</figcaption>
                </figure>
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
                <figure>
                    <img
                        className="image--med bg--white"
                        src={bodySupportImg}
                        alt="Guitar Body Assembly Design"
                    />
                    <figcaption>Guitar Body Assembly Design</figcaption>
                </figure>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={supportElementsImg}
                        alt="Guitar Body Support Elements"
                    />
                    <figcaption>Guitar Body Support Elements</figcaption>
                </figure>
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
                <figure>
                    <img
                        className="image--med bg--white"
                        src={neckCoverImg}
                        alt="Neck Cover"
                    />
                    <figcaption>Guitar Body and Finalised Neck</figcaption>
                </figure>
                <h3 className="riffmaster">Neck Body Attachment</h3>
                <p>
                    The neck attachment was the riskiest part of the assembly.
                    Should the neck have failed to hold together precisely, the
                    whole project might have been endangered, as Gorilla glue
                    and CT1 cannot be removed without severe damage.
                </p>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={neckBodyJointImg}
                        alt="Body Neck Joint"
                    />
                    <figcaption>Joint Neck and Body</figcaption>
                </figure>
                <p>
                    We can finish our lovely guitar with a lick of matt black
                    paint.
                </p>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={paintedImg}
                        alt="Painted Guitar Console"
                    />
                    <figcaption>Painted Guitar Console</figcaption>
                </figure>
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
                <figure>
                    <img
                        className="image--med bg--white"
                        src={strumMechanismImg}
                        alt="Strum Mechanism"
                    />
                    <figcaption>Strum Mechanism</figcaption>
                </figure>
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
                <figure>
                    <img
                        className="image--med bg--white"
                        src={strumComponentsImg}
                        alt="Strum Components"
                    />
                    <figcaption>Strum Components</figcaption>
                </figure>
                <p>We can put our components together in the following way:</p>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={strumDesignImg}
                        alt="Strum Design"
                    />
                    <figcaption>Strum Design</figcaption>
                </figure>
                <h3 className="riffmaster">Strum Assembly</h3>
                <p>
                    The strum unit was reasonably straightforward to assemble;
                    however, the screws, levers, and string tension adjustments
                    were time-consuming.
                </p>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={strumAssemblyImg1}
                        alt="Strum Component Assembly"
                    />
                    <figcaption>Strum Component Assembly</figcaption>
                </figure>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={strumAssemblyImg2}
                        alt="Strum Switches"
                    />
                    <figcaption>Strum Switches</figcaption>
                </figure>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={strumAssemblyImg3}
                        alt="Strum Screws and Springs"
                    />
                    <figcaption>Strum Screws and Springs</figcaption>
                </figure>
                <p>
                    We can wire up our unit and connect it to the Arduino. I
                    used digital pins 16 to 35 for the column (fret) and 2 to 7
                    for the column (row) wires. As I mentioned, my pin layout is
                    affected by faulty digital pins.
                </p>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={strumWiring}
                        alt="Strum Wiring"
                    />
                    <figcaption>Strum Wiring</figcaption>
                </figure>
                <p>Finally, we can string up the device.</p>
                <figure>
                    <img
                        className="image--med bg--white"
                        src={assembledStrumImg}
                        alt="Assembled Strum Unit"
                    />
                    <figcaption>Assembled Strum Unit</figcaption>
                </figure>
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
                <SyntaxHighlighter
                    className="code"
                    language="arduino"
                    style={atomOneDark}
                >
                    {codeSnippetConstants}
                </SyntaxHighlighter>
                <p>
                    First, we need to initialise our pins in the setup function.
                </p>
                <SyntaxHighlighter
                    className="code"
                    language="arduino"
                    style={atomOneDark}
                >
                    {codeSnippetStrumSetup}
                </SyntaxHighlighter>
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
                <SyntaxHighlighter
                    className="code"
                    language="arduino"
                    style={atomOneDark}
                >
                    {codeSnippetSetControllerState}
                </SyntaxHighlighter>
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
                <figure>
                    <img
                        className="image--med bg--white"
                        src={protocolImg}
                        alt="Communication Protocol"
                    />
                    <figcaption>Communication Protocol</figcaption>
                </figure>
                <h3 className="riffmaster">Debounce Handling</h3>
                <p>
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
                <figure>
                    <img
                        className="image--med bg--white"
                        src={debounceImg}
                        alt="Debounce"
                    />
                    <figcaption>Debounce on Frets and Strums</figcaption>
                </figure>
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
                <SyntaxHighlighter
                    className="code"
                    language="arduino"
                    style={atomOneDark}
                >
                    {codeSnippetMessaging}
                </SyntaxHighlighter>
            </main>
            <Footer />
        </>
    );
};

export default RiffMaster;
