const codeSnippets = {
    arduinoInitialisation: `// Left Hand Inputs
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
`,

    pinSetup: `void setup() {
    //  FRETS INIT 
    for (byte ci = 0; ci < COL_LEN; ci++) {                          // Cycle through Columns (Frets)
        pinMode(COLUMN_PINS[ci], INPUT_PULLUP);                      // Column Pull-Up Resistor ON   
    	  digitalWrite(COLUMN_PINS[ci], HIGH);                         // Set Voltage High
    }
    
    // STRING INIT
    for (byte ri = 0; ri < ROW_LEN; ri++){                           // Cycle Rows (Strings)
        pinMode(ROW_PINS[ri], OUTPUT);                               // Set Row as Output
    }
`,

    fretTest: `// Display the State on Serial Monitor | Use for Testing and Troubleshooting the Device
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
`,

    constants: `// Global Variables
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
`,

    strumSetup: `// STRUM INIT
for (byte i = 0; i < 6; i++) {                                   // Cycle Strum PINS
    pinMode(STRUM_PINS[i], INPUT_PULLUP);                        // Built In Pullup On
    digitalWrite(STRUM_PINS[i], HIGH);                           // Set Strum High as Default
}`,

    setControllerState: `
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
`,

    messaging: `const unsigned long currentTime = millis();                      // Get the Current Time
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
}`,
};
export default codeSnippets;
