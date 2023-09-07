const codeSnippets = {
    readSensors: `int analogToPercentage(float input) {                                // Input Value Between 0 and 1023
    return (int)((input / 1023.00) * 100);                           // Get the Percentage Value
}


void readSensors() {
    moistureLevel = analogToPercentage(analogRead(MOISTURE));        // Read Analog Moisture Sensor
    lightLevel = analogToPercentage(analogRead(LIGHT));              // Read Analog Light Sensor
    temperature = dht.readTemperature();                             // Read DHT Temperature
    humidity = dht.readHumidity();                                   // Read DHT Humidity
    tank = digitalRead(TANK);                                        // Read Digital Water Level
}`,
    lcd: `void printLCD(String line1, String line2) {                          // Print a message to the LCD.
    lcd.setCursor(0, 0);                                             // Set Upper Row Cursor to the Beggining
    lcd.print(line1);                                                // Print Upper Line
    lcd.setCursor(0, 1);                                             // Set Lower Cursor to the Beggining
    lcd.print(line2);                                                // Print Lower Line
}
      
String padLCDContent(String str) {                                   // Centre a String into LCD Length
    const byte maxRowLength = 16;                                    // No Magic Numbers Here
    const byte length = str.length();                                // Get the Input Length
    const byte spaces = maxRowLength - length;                       // Get the Leftover Spaces
    const byte spacesLeft = spaces / 2;                              // Round Down (Floor) Left Padding
    const byte spacesRight = maxRowLength - length - spacesLeft;     // Odd String Length Will Adjust 1 Space Left

    if (spaces < 0) return "String Too Long!";                       // Do Not Display Strings Outside of the Boundaries

    const String result = "";                                        // Initialise with Empty String
    for (byte i = 0; i < spacesLeft; i++) { result += " "; }         // Add Left Padding
    result += str;                                                   // Concatinate Input String
    for (byte i = 0; i < spacesRight; i++) { result += " "; }        // Add Right Padding (May be Omitted)
    return result;
}`,
    handleBtnPress: `void handleLeftButtonPress(bool state) {
    byte currentMainMenuSelection = CURRENTMENU[0];
    byte currentSubMenuSelection = CURRENTMENU[1];
      
    // Shift Menu Left In Main Menu
    if (currentSubMenuSelection == 0) {
        // Finalise Main Menu Selection
        if (currentMainMenuSelection > 0) CURRENTMENU[0] = --currentMainMenuSelection;
    }
    if (currentSubMenuSelection == 7) {
        if (currentMainMenuSelection > 1) CURRENTMENU[0] = --currentMainMenuSelection;
    }
        
    makeNoise();
    displayMenu();
}
      
      
      
void handleRightButtonPress(bool state) {                            // RIGHT
    byte currentMainMenuSelection = CURRENTMENU[0];                  // Get Main Menu Index
    byte currentSubMenuSelection = CURRENTMENU[1];                   // Get Sub Menu Index
    
    if (currentSubMenuSelection == 0) {                              // Main Menu Left
        if (currentMainMenuSelection <= 7) CURRENTMENU[0] = ++currentMainMenuSelection; // Shift Left if Possible
    }
    if (currentSubMenuSelection == 7) {                              // Report Time Submenu
        if (currentMainMenuSelection < 5) CURRENTMENU[0] = ++currentMainMenuSelection; // Shift Left if Possible
    }
  
    makeNoise();                                                     // Beep
    displayMenu();                                                   // Voila
}
      
      
      
void handleSelectButtonPress(bool state) {
    if (CURRENTMENU[0] == 1 && CURRENTMENU[1] == 7) {                // Report Time Settings / 5 Min Option
        reportTiming = 0;                                            // Option 0 - 5 Mins
        saveSettings();                                              // Save Option on EEPROM
    }
    if (CURRENTMENU[0] == 2 && CURRENTMENU[1] == 7) {                // Report Time Settings / 1 Hour Option
        reportTiming = 1;                                            // Option 0 - 1 Hour
        saveSettings();
    }
    if (CURRENTMENU[0] == 3 && CURRENTMENU[1] == 7) {                // Report Time Settings / 12 Hours Option
        reportTiming = 2;                                            // Option 0 - 12 Hours
        saveSettings();
    }
    if (CURRENTMENU[0] == 4 && CURRENTMENU[1] == 7) {                // Report Time Settings / 1 Day Option
        reportTiming = 3;
        saveSettings();
    }
      
    if (CURRENTMENU[0] == 7) {                                       // Back to Main Menu Option
        CURRENTMENU[0] = 1;
        CURRENTMENU[1] = 7;
    }
    if (CURRENTMENU[0] == 5 && CURRENTMENU[1] == 7) {                 
        CURRENTMENU[0] = 7;
        CURRENTMENU[1] = 0;
    }
    if (CURRENTMENU[0] == 8) {
        postSensorData(true);
    }
      
    if (CURRENTMENU[0] == 6) {
        if (sound == 1) sound = 0;
        else sound = 1;
        saveSettings();
    }
    makeNoise();
    displayMenu();
    }`,
    intervals: `void loop() {
// Check if Autoreporting is Due
unsigned long elapsedTime = (millis() - startTime) / 1000;         // Get Elapsed Time from Switch On or Last Reporting
if (elapsedTime >= reportTimingInSec[reportTiming]) {              // If Time to Report
    postSensorData(false);                                         // Attempt Sending a Report
    startTime = millis();                                          // Reset Timer
}`,
    wifi: `void connectWiFi() {                                               // WIFI
    byte attempt = 1;                                              // Init Attempt Counter
    byte maxAttempts = 3;                                          // After 3 Attempt Return
    
    while (status != WL_CONNECTED && attempt <= maxAttempts) {     // Not Connected and Attempt Left
        status = WiFi.begin(SSID, WIFI_PASSWORD);                  // Attempt to Connect to WiFi Network
        String msgLine1 = " CONNECTING...  ";                      // LCD Display
        String msgLine2 = "   ATTEMPT: " + String(attempt);
        printLCD(msgLine1, msgLine2);
        delay(5000);  // wait 5 seconds before retrying            // Retry in 5 Sec
        attempt++;                                                     
    }
    if (status == WL_CONNECTED) {                                  // If Connected
        String msgLine1 = "   CONNECTED    ";                      // LCD Display Success
        String msgLine2 = "                ";
        printLCD(msgLine1, msgLine2);                                  
        delay(3000);
    } else {                                                       // LCD Display Failure
        String msgLine1 = " NOT CONNECTED  ";
        String msgLine2 = "                ";
        printLCD(msgLine1, msgLine2);
        delay(3000);
    }
    digitalWrite(GREEN_LED, HIGH);                                 // Green Led ON
    Serial.println("Connected to WiFi " + String(status));
    displayMenu();                                                 // Back to Menu
}`,
    post: `void postSensorData(bool userInitiated) {
    displaySensorsOnSerial();
    // Preparation
    if (status != WL_CONNECTED) connectWiFi();                     // If Not Connected to WiFi, Connect
    
    String msgLine1 = " AUTO REPORT... ";                          // Set Header Text
    if (userInitiated) msgLine1 = "   REPORT...    ";              // Set Alternative Header Text
    String msgLine2 = "                ";                          // Clear Second Line
    printLCD(msgLine1, msgLine2);                                  // Display
    digitalWrite(BLUE_LED, HIGH);                                  // Set Blue LED ON
    
    String PAYLOAD =                                               // Construct the POST data
        "id=" + DEVICE_ID + "&moisture=" + String(moistureLevel) + // Concatinate Key-Value Pairs with &
        "&light=" + String(lightLevel) + "&humidity=" + String(humidity) + 
        "&temperature=" + String(temperature) + "&tank=" + String(tank);
    
    if (client.connect(URL, 443)) {                                // Send the POST request to the server
        const String METHOD = "POST";                              // Make a HTTP request
        const String ROUTE = "/api/report/?" + PAYLOAD;
        const String PROTOCOL = "HTTP/1.1";
        const String request = METHOD + " " + ROUTE + " " + PROTOCOL;
        const String HOST = "Host: " + String(URL);
        client.println(request);                                   // Send Request
        client.println(HOST);
        client.println("Connection: close\\n");                    // Close Connection
        String msgLine2 = "  REPORT SENT   ";
        printLCD(msgLine1, msgLine2);
        delay(2000);
        displayMenu();              
        digitalWrite(BLUE_LED, LOW);                               // Blue LED Off
        makeNoise();
        makeNoise();                      
    }
}`,
    postRoute: `router.post("/", async (req, res) => {                                       
    let { id, moisture, light, humidity, temperature, tank } = { ...req.query }; // Extract Query Parameters with Object Destruction

    // Try Cast Device ID
    const isValidID = mongoose.Types.ObjectId.isValid(id);         // Is Valid Device ID
    if (!isValidID) return res.status(400).json({                  // Invalide ID
        success: false,                                            // Send Response Back
        message: "Invalid Device ID: " + id
    }); 
    
    // Find Device
    const device = await Device.findById(id);                      // Find Device in Our DB
    if (!device) return res.status(404).json({ success: false, message: "Could NOT Find Device with ID:" + id });
    
    const { error, value } = validateReport({ deviceID: id, moisture, light, humidity, temperature, tank });
    if (error) return res.status(400).json({ success: false, message: error.details[0].message }); // Response: Device Not Found

    const report = new Report({ deviceID: id, moisture, light, humidity, temperature, tank, created: Date.now() }); // Create Report Object
    await report.save();                                           // Save Report in our DB`,
    email: `if (Number(moisture) < 5 && Number(tank) === 0) {                  // Send Alert If Moisture Is Under 5% or Tank Empty
    const user = await User.findById(device.userID);               // Get User
    const email_address = process.env.EMAIL_ADDRESS;               // Get 
    const email_password = process.env.EMAIL_PASSWORD;
    const email_server = process.env.EMAIL_SERVER;
    console.log(email_address, email_password, email_server);
    
    const mailOptions = {                                          // Construct Email Object
        from: process.env.EMAIL_ADDRESS,                           // Email Process Environment
        to: user.email,                                            // Get Users Email Address
        subject: 'Green Rooftop | Device Alert',                   // From Request
        html: \`                                                    
            <h1>Your Green Rooftop Requires Attention</h1>
            <h2>The Current Moisture Level Is Critical and Water Tank Empty</h2>
            <p>
                The last report of the device returned the following readings:
                <ul>
                    <li>Moisture: \${ moisture }</li>
                    <li>Light: \${ light }</li>
                    <li>Humidity: \${ humidity }</li>
                    <li>Temperature: \${ temperature }</li>
                    <li>Water Tank: \${ Number(tank) === 0 ? "Empty" : "Full" }</li>
                </ul>
                <br />
                If you find your soil well hidrated or the rainwater tank is full, please make sure that all sensors are connected properly!
            </p>
            <h2>Green Rooftop Team</h2>\`
    };

    const transporter = nodemailer.createTransport({               // Nodemailer Transporter
        auth: {
            user: process.env.EMAIL_ADDRESS,                       // Safe Email Address from ENV
            pass: process.env.EMAIL_PASSWORD                       // Safe Password from ENV
        },
        secure: true,
        port: 465,                                                 // Default PORT for Google Servers
        tls: { rejectUnauthorized: false },                        
        host: 'smtp.gmail.com',
    });
    
    await transporter.sendMail(mailOptions);                       // Send Email`,
    fetch: `async function getData() {                                         // Async Server Call
    try {                                                          // Mandatory Try Clause for Errors
        const URL = "https://your_api_url/api/report";             // Backend Server
        const options = {
            method: "GET",                                         // Get Reports
            headers: {"Content-Type": "application/json"}          // Expect JSON
          };
        const response = await fetch(URL, options);                // Fetch Data from Server
        const responseJSON = await response.json();                // Transform Data into JSON Format
        return responseJSON;                                       
    }
    catch (ex) { return ({ success: false, message: ex })}         // On Error Set Success Flag False and Return the Full Error Msg
}`
}

export default codeSnippets;