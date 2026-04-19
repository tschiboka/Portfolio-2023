const codeSnippets = {
    importHowler: `<script 
    src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" 
    integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==" 
    crossorigin="anonymous" 
    referrerpolicy="no-referrer"></script>`,
    npmHowler: `npm install howler           # Install Howler with NPM
yarn add howler              # Install Howler with Yarn
npm install -D @types/howler # Import TypeScript Types`,
    controller: `// Initialise App with an Empty Controller State
function initialiseAppControllerState() {
    const controllerState = {
        message: "",
        highestFretPositions: [[0], [0], [0], [0], [0], [0]],
    }
    
    return controllerState;
}



// Read a Print Line from Console or a Sequence of Keyboard Events
function controllerListener(event) {
    if (!app.musicAgreement) return;
    
    // Listen to Only Key Downs as Message is Passed as a Sequence of KeyStrokes
    if (event.type !== "keydown") {                                                     
        // If Key is Digit
        if (event.key >= "0" && event.key <= "9") {                                      // If Digit
            app.controllerState.message += event.key;                                    // Concatinate Message

            if (app.controllerState.message.length === 4) {                              // Attempt to Decode Every 4 Digit
                translateConsoleMessage(app.controllerState.message);                    // Call Decode
            }
        }
        else app.controllerState.message = "";                                           // Otherwise Clear Message
    }
}`,
    translateMessages: `// Translate a Keypress Message Containing 4 Digits
function translateConsoleMessage(message) {
    const event = parseInt(message[0]);                                                   // Pressed or Released
    const fret =  parseInt(message[1] + message[2]);                                      // Fret 0 - 20
    const string = parseInt(message[3]);                                                  // String 0 - 6
    
    if (event > 1 || string > 6 || string === 0 || fret > 20) return app.controllerState.message = ""; // Reset
    
    // Strum
    if (fret === 0) {
        handleStrumActivated(event, string);                                               // Strum Event
    }
    
    // Fret Position
    else {                                                                                 // Fret Event
        let positionsOnString = app.controllerState.highestFretPositions[string - 1];      // Get Finger Positions on String
        // If Fret Pressed
        if (event === 1) {
            positionsOnString.push(fret);                                                  // Append Current Positions
            positionsString = positionsOnString.sort((a, b) => a - b);                     // Sort Ascending
            positionsOnString = [ ...(new Set(positionsOnString)) ];                       // Disallow Repeatition
            app.controllerState.highestFretPositions[string - 1] = positionsOnString;      // Save Position
        }
        // Fret Released
        else {
            const index = positionsOnString.indexOf(fret);                                 // Find Index of Removable Position
            positionsOnString.splice(index, 1);                                            // Remove Position
            app.controllerState.highestFretPositions[string - 1] = positionsOnString;
        }
        
        handleFretActivated(event, fret, string);
    }
        
    app.controllerState.message = "";
}`,
    loadController: `<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="../script/jam.js"></script>
    
<!-- Add Controller Functionalities -->
<script>
    const body = document.getElementsByTagName("body")[0];
    window.addEventListener("keydown", controllerListener);
    window.addEventListener("keyup", controllerListener);
</script>`,
    fretCallback: `function handleFretActivated(event, fret, string) {
    if (fret === undefined || string === undefined) return;

    displayActionOnBoard(fret, string, -1, !event);
    
    if (event === 0) {                                                      // If Finger is Off Position 
        const note = guitarNotes[strumOffsets[string - 1] + fret];          // Find Note
        stopNote(note);                                                     // Stop the Note Playing
    }
    else {                                                                  // If Finger Presses Position
        const positions = app.controllerState.highestFretPositions[string - 1];      // Find Positions Pressed on the String
        const notes = positions.map(p => guitarNotes[strumOffsets[string - 1] + p]); // Corresponding Notes for Finger Positions
        const playing = notes.filter(note => app.audio[note].playing());    // Find Playing Note
        playing.forEach(pl => stopNote(pl));                                // Stop Note                
    }
}`,
    guitarNotes: `const guitarNotes = ["E2", "F2", "Fs2", "G2", "Gs2", "A2", "As2", "B2", "C3", "Cs3", "D3", "Ds3", "E3", "F3", "Fs3", "G3", "Gs3", "A3", "As3", "B3", "C4", "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", "Gs4", "A4", "As4", "B4", "C5", "Cs5", "D5", "Ds5", "E5", "F5", "Fs5", "G5", "Gs5", "A5", "As5", "B5", "C6"];
const strumOffsets = [0, 5, 10, 15, 19, 24];`,
    strumCallback: `function handleStrumActivated(event, strum) {
    const positions = app.controllerState.highestFretPositions[strum - 1];  // Finger Positions on a String Row
    const upperMost =  positions[positions.length - 1];                     // Topmost Pressed Position
    
    const note = guitarNotes[strumOffsets[strum - 1] + upperMost];          // Note Name that Plays
    
    if (event !== 0) {                                                      // Strum Pressed  
        const notesOnString = positions                                     // Find Strings Currently Playing
            .map(position => guitarNotes[strumOffsets[strum - 1] + position]);   
        const notesPlaying = notesOnString                                  // Find Notes Currently Playing
            .filter(note => app.audio[note].playing());
        notesPlaying.forEach(note => stopNote(note));
        
        displayActionOnBoard(upperMost, strum, strum, !event);              // Highlight Played Note and String
    }
    else {                                                                  // Strum Released
        if (upperMost === undefined) return;
        playNote(note, strum);
        if (upperMost !== 0) {                                              // If Finger Position is Not 0
            displayActionOnBoard(upperMost, strum, -1, false);              // Put Back Semi Highlight
        }
        else {
            displayActionOnBoard(upperMost, strum, strum, !event);          // Clear Highlight
        }
    }
}`,
    playStopNotes: `function playNote(note, string) { 
    app.audio[note].play(); 
    displayActionOnEqualizer(note, true, string); 
}

function stopNote(note) { 
    app.audio[note].stop(); 
    displayActionOnEqualizer(note, false); 
}
    `,
    audioObject: `// Audio Functions
function getAudio() {
    const audio = {};
    const guitarNotes = [
        "E2", "F2", "Fs2", "G2", "Gs2", "A2", "As2", 
        "B2", "C3", "Cs3", "D3", "Ds3", "E3", "F3", 
        "Fs3", "G3", "Gs3", "A3", "As3", "B3", "C4", 
        "Cs4", "D4", "Ds4", "E4", "F4", "Fs4", "G4", 
        "Gs4", "A4", "As4", "B4", "C5", "Cs5", "D5", 
        "Ds5", "E5", "F5", "Fs5", "G5", "Gs5", "A5", 
        "As5", "B5", "C6"];
    guitarNotes.forEach(note => {
        audio[note] = new Howl({ 
            src: ["../../sounds/"+  note + ".mp3"], 
            html5: true,
            buffer: true
        });
    });
    return audio;
}`,
    domStorage: `function getDOMElements() {
    app.DOM.board_LI = [...$all("#guitar li.fret-note")];                   // List Element (Note)
    app.DOM.board_SPAN = [...$all("#guitar span.fret-note")];               // Span Element (Note's Text)
    app.DOM.board_BTN = [...$all("#guitar button")];                        // String Buttons
    app.DOM.boardStrings = [...$all(".guitar__string")];                    // Strings
}
`,
    createGuitar: `// Create the Guitar Body that Interacts with the User
function createGuitar() {
    const guitarDOM = $("#guitar");                                 // Get Guitar Element
    const fretWidth = guitarDOM.offsetWidth - 400                   // Display Frets and Strings (40 is for the String Name)
    const fretDistances = calculateFretDistances(fretWidth);        // Get an Int[20] of Fret Widths
    const stringNames = ["e", "B", "G", "D", "A", "E", ""];         // From Highest to Lowest
    const stringStarts = [24, 19, 15, 10, 5, 0];                    // Adjust Strings Starting Note to Notes
    const ROWS = 7;                                                 // 7  Rows: 6 Strings and a Fret Numbering Element
    const COLS = 22;                                                // 21 Columns: 20 Frets and Strings

    // FRET ROWS
    for (let row = 0; row < ROWS; row++) {                          // Iterate Rows
        const rowDOM = $append({ tag: "ul", parent: guitarDOM });   // Create Row Element
        // FRET COLUMNS
        for (let col = 0; col < COLS; col++) {                      // Iterate Columns of a Row
            const colDOM = $append({ tag: "li", parent: rowDOM });  // Create Row Element
            colDOM.style.width = fretDistances[col - 1] + "px";
            // LAST ROW TEXT
            if (row === 6) colDOM.innerHTML = col === 21 ? "Strings": col; // Add Bottom Text
            // OTHER ROWS FRET
            else {                                                  // If Not Last Row
                // STRING                                           
                if (col == 21) {                                    // Last Column
                    const stringBtn = $append({ tag: "button", parent: colDOM }); // Create String Button
                    stringBtn.innerHTML = stringNames[row] + " String"; // Add String Name as the First Column
                }
                // FRET NOTE
                else {                                              // If Fret Note
                    const noteSpan = $append({ tag: "span", className: "fret-note", parent: colDOM });
                    const note = guitarNotes[stringStarts[row] + col]; // Get the Note Name
                    noteSpan.innerHTML = note.replace(/s/g, "#");   // Append Note Text
                    colDOM.classList.add("fret-note");
                }
            }
        }
        if (row < 6) {                                               // Apart from Last Row
            $append({ tag: "div", className: "guitar__string", parent: rowDOM }); // Create String Element
        }
    }
}
`,
    fretDistances: `function calculateFretDistances(totalDistance) {
    let distance = totalDistance;                                   // Initial Distance is the Total Distance
    const RATIO = 17.817;                                           // Golden Ratio Used in Electric and Acounstic Guitars
    const frets = 20;                                               // Total of 20 Frets
    const fretDistances = [];                                       // Initial Result Array

    for (let fret = 0; fret < frets; fret++) {                      // Iterate Frets
        const prevDistance = distance;                              // Store Previous Distance
        distance -= distance / RATIO;                               // Update Distance by Taking Off Golden Ratio
        fretDistances.push(parseInt(prevDistance - distance));      // Append the Result Array
    }
    
    fretDistances.push(parseInt(distance));                         // Last Item is the Leftover
    return fretDistances;
}
`,
    displayGuitar: `// Display Action on Board: Function Highlights Active Controller Inputs on the Guitar Board
//     Fret:            Finger Position on the Fretboard (1 - 20)
//     String:          String on Fret Board (0 - 5)
//     Strum:           Which Strum is Activated (-1: No Strum Action, 0 - 5: Strummed String)
//     RemoveHighLight: Resets DOM to Inactive Status
function displayActionOnBoard(fret, string, strum, removeHighlight = false) {
    const COLS = 21;                                                // 20 Frets in a Row Plus Fret 0
    const TOT_STRINGS = 6;                                          // Total Number of Highlightable Rows 
    const index = (TOT_STRINGS - string) * COLS + fret;             // Index in the List of DOM Elements
    const fret_LI = app.DOM.board_LI[index];                        // Get Elements
    const fret_SPAN = app.DOM.board_SPAN[index];
    const fret_BTN = app.DOM.board_BTN[TOT_STRINGS - string];
    const strings = app.DOM.boardStrings[TOT_STRINGS - string];
    
    fret_LI.classList.remove(...fret_LI.classList);                 // Remove ALL Classes as There are Multiple States (None, Semi-Highlight, Highlight)
    fret_SPAN.classList.remove(...fret_SPAN.classList);
    fret_BTN.classList.remove(...fret_BTN.classList);               
    strings.classList.remove(...strings.classList);
    strings.classList.add("guitar__string");               

    if (!removeHighlight) {
        if (strum == -1) {                                          // If Fret Board Action
            fret_LI.classList.add("fret-note", "semi-highlight");   // Soft Highlight
            fret_SPAN.classList.add("fret-note", "semi-highlight");
        }
        else {
            fret_LI.classList.add("fret-note", "highlight");        // Bright Highlight
            fret_SPAN.classList.add("fret-note", "highlight");

            fret_BTN.classList.add("highlight");                    // Highlight Strum Button
            strings.classList.add("highlight");                     // Highlight String
        }
    }

    if (fret > 0) {                                                 // Remove Highlight from String 0 Fret
        const baseStringIndex = (TOT_STRINGS - string) * COLS;      // Index in the List of DOM Elements
        const baseString_LI = app.DOM.board_LI[baseStringIndex];    // Get Base DOM Element
        //const baseString_SPAN = 
        baseString_LI.classList.remove(...baseString_LI.classList); // Remove Highlight
        baseString_LI.classList.add("fret-note");                   // Place Back Original Class
    }
}
`,
    utilityAppend: `// DOM Selection
const $ = selector => document.querySelector(selector);                            // Select a Single DOM Element
const $all = selector => document.querySelectorAll(selector);                      // Select ALL DOM Elements

// Append a Child Element
// Expect an Object as Parameter { tag: STR, className: STR, id: STR, parent: DOM, NS: bool }
const $append = (props) => {
    const { tag, className, id, parent, ns } = { ...props };                       // Deconstruct Parameters
    const isDomElement = (e) => e instanceof Element || e instanceof HTMLDocument;
    
    if (!tag) throw Error("No TAG argument was given to create function.");        // Missing Tag
    if (!parent) throw Error("No PARENT argument was given to create function.");  // Missing Parent
    if (!isDomElement(parent)) throw Error("Parent is not a DOM Element.");        // Parent is NOT a DOM Element

    const elem = ns                                                                // Has Different Name Space                                                          
        ? document.createElementNS('http://www.w3.org/2000/svg', tag)              // Create SVG Elements (svg, circle, line...)
        : document.createElement(tag);                                             // Create Standard HTML DOM Element

    if (id) elem.id = id;                                                          // Add Id
    if (className) elem.classList.add(className);                                  // Add Class
    parent.appendChild(elem);                                                      // Append the Parent Element

    return elem;                                                                   // Return with the Created DOM Element
}`,
    guitarCSS: `/* Guitar */
#guitar {
    min-width: 100%;
    min-height: 280px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);   
    font-style: normal;
    border-top: 1px solid #333;
}

#guitar ul {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

#guitar ul:first-child {
    border-top: 2px solid #333;
}

#guitar ul:nth-child(6) {
    border-bottom: 2px solid #333;
}

#guitar ul li {
    position: relative;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    color: #555;
    font-family: monospace;
    font-size: 18px;
    border-right: 2px solid #333;

}

#guitar ul li.semi-highlight, #guitar ul li.highlight {
    color: white;
    border: 2px solid transparent;
    z-index: 10;
}

#guitar ul:nth-child(1) li.semi-highlight { background-color: rgb(116, 116, 0); border-color: yellow; }
#guitar ul:nth-child(2) li.semi-highlight { background-color: rgb(121, 74, 0); border-color: #fa9b00; }
#guitar ul:nth-child(3) li.semi-highlight { background-color: rgb(127, 20, 77); border-color: #ff1493 ;}
#guitar ul:nth-child(4) li.semi-highlight { background-color: rgb(96, 49, 108); border-color: #ba55d3; }
#guitar ul:nth-child(5) li.semi-highlight { background-color: rgb(0, 85, 85); border-color: #00ffff; }
#guitar ul:nth-child(6) li.semi-highlight { background-color: rgb(0, 89, 45); border-color: #00ff7f; }

#guitar ul:nth-child(1) li.highlight { background-color: yellow; }
#guitar ul:nth-child(2) li.highlight { background-color: rgb(250, 155, 0); }
#guitar ul:nth-child(3) li.highlight { background-color: deeppink ;}
#guitar ul:nth-child(4) li.highlight { background-color: mediumorchid; }
#guitar ul:nth-child(5) li.highlight { background-color: aqua; }
#guitar ul:nth-child(6) li.highlight { background-color: springgreen; }

#guitar ul li span {
    position: absolute;
    width: 34px;
    right: 2px;
    padding: 0 2px;
    background-color: rgba(0, 0, 0, 0.4);
    border: 2px solid rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    cursor: pointer;
    text-align: center;
    z-index: 10;
}

#guitar ul li span.semi-highlight, #guitar ul li span.highlight {
    background-color: transparent;
    border-color: transparent;
}

#guitar ul li span.semi-highlight {
    color: white;
}

#guitar ul li span.highlight {
    color: black;
}


#guitar ul li:first-child {
    color: #999;
}

#guitar ul li:nth-child(22) {
    color: #999;
    border: none;
}

#guitar ul li:hover {
    color: #999;
}

#guitar ul li button {
    width: 60%;
    background-color: transparent;
    font-family: monospace;
    color: #000;
    font-size: 18px;
    font-weight: bolder;
    z-index: 10;
    cursor: pointer;
}

#guitar ul:nth-child(1) li button { background-color: rgb(116, 116, 0); border-color: yellow; }
#guitar ul:nth-child(2) li button { background-color: rgb(121, 74, 0); border-color: rgb(250, 155, 0); }
#guitar ul:nth-child(3) li button { background-color: rgb(127, 20, 77); border-color: deeppink ;}
#guitar ul:nth-child(4) li button { background-color: rgb(96, 49, 108); border-color: mediumorchid; }
#guitar ul:nth-child(5) li button { background-color: rgb(0, 85, 85); border-color: aqua; }
#guitar ul:nth-child(6) li button { background-color: rgb(0, 89, 45); border-color: springgreen; }

#guitar ul:nth-child(1) li button:hover, #guitar ul:nth-child(1) li button.highlight { background-color: yellow; }
#guitar ul:nth-child(2) li button:hover, #guitar ul:nth-child(2) li button.highlight { background-color: rgb(250, 155, 0); }
#guitar ul:nth-child(3) li button:hover, #guitar ul:nth-child(3) li button.highlight { background-color: deeppink ;}
#guitar ul:nth-child(4) li button:hover, #guitar ul:nth-child(4) li button.highlight { background-color: mediumorchid; }
#guitar ul:nth-child(5) li button:hover, #guitar ul:nth-child(5) li button.highlight { background-color: aqua; }
#guitar ul:nth-child(6) li button:hover, #guitar ul:nth-child(6) li button.highlight { background-color: springgreen; }


#guitar ul .guitar__string {
    position: absolute;
    left: 0;
    width: 100%;
    height: 3px;
    opacity: 0.5;
}

#guitar ul:nth-child(1) .guitar__string { background-color: rgb(116, 116, 0); }
#guitar ul:nth-child(2) .guitar__string { background-color: rgb(121, 74, 0); }
#guitar ul:nth-child(3) .guitar__string { background-color: rgb(127, 20, 77); }
#guitar ul:nth-child(4) .guitar__string { background-color: rgb(96, 49, 108); }
#guitar ul:nth-child(5) .guitar__string { background-color: rgb(0, 85, 85); }
#guitar ul:nth-child(6) .guitar__string { background-color: rgb(0, 89, 45); }


#guitar ul:nth-child(1) .guitar__string.highlight { background-color: yellow; }
#guitar ul:nth-child(2) .guitar__string.highlight { background-color: rgb(250, 155, 0); }
#guitar ul:nth-child(3) .guitar__string.highlight { background-color: deeppink ;}
#guitar ul:nth-child(4) .guitar__string.highlight { background-color: mediumorchid; }
#guitar ul:nth-child(5) .guitar__string.highlight { background-color: aqua; }
#guitar ul:nth-child(6) .guitar__string.highlight { background-color: springgreen; }
`,
};

export default codeSnippets;
