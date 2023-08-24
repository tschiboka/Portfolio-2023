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
};

export default codeSnippets;
