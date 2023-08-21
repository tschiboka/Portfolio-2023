const codeSnippets = {
    importHowler: `<script 
    src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" 
    integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==" 
    crossorigin="anonymous" 
    referrerpolicy="no-referrer"></script>`,
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
    }
    `,
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
};

export default codeSnippets;
