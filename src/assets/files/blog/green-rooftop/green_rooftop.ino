// GREEN ROOFTOP MONITORING SYSTEM - Tivadar Debnar 2023
// Libraries
#include <WiFiNINA.h>                                              // WiFi Connection
#include <DHT.h>                                                   // Digital Hunidity and Temperature

#include <ArduinoHttpClient.h>
#include <Wire.h>
#include <SPI.h>


#include <LiquidCrystal.h>                                         // LCD Library
#include <EEPROM.h>                                                // To Store Information After Disconnecting the Device
#define EEPROM_REPORT_TIMING_ADDRESS 0                             // Memory Address for Report Timing
#define EEPROM_SOUND_ADDRESS 1                                     // Memory Address for Sound



// PIN Layout
const byte MOISTURE = A0;                                          // Moisture Sensor
const byte LIGHT = A1;                                             // Light Sensor
#define DHT_PIN A2                                                 // Digital pin connected to the sensor
const byte TANK = 2;                                               // Watertank Sensor
const byte GREEN_LED = 3;                                          
const byte BLUE_LED = 13;                               
const byte BUZZ = A3;           
const byte LCD_RS = 12;                                            // LCD Reset
const byte LCD_EN = 11;                                            // LCD Enable
const byte LCD_D4 = 4;
const byte LCD_D5 = 5;
const byte LCD_D6 = 6;
const byte LCD_D7 = 7;
const byte BTN_LEFT = 8;
const byte BTN_RIGHT = 9;
const byte BTN_SELECT = 10;

// Hardware Setup
LiquidCrystal lcd(LCD_RS, LCD_EN, LCD_D4, LCD_D5, LCD_D6, LCD_D7);
#define DHT_TYPE DHT22                                             // Sensor type (DHT11 or DHT22)
DHT dht(DHT_PIN, DHT_TYPE);



// Global Variables
const String DEVICE_ID = "6432117858ec20e9ec99feb0";               // Device Registration ID in the Database
byte BUTTONSTATES[3] = { 1, 1, 1 };                                // LEFT RIGHT SELECT (Default 1 Because of Input Pullup Resistor)
int sensorReadingIntervalMS = 500;                                 // User May Set Custom Intervals of Sensor Reading
int moistureLevel = 0;                                             // MOISTURE
int lightLevel = 0;                                                // LIGHT
float humidity = 0;                                                // HUMIDITY
float temperature = 0;                                             // TEMPERATURE
bool tank = false;                                                 // WATER TANK LEVEL - Below Critical Level or Empty
int sound = 1;                                                     // TILT SENSOR
byte CURRENTMENU[2] = { 0, 0 };                                    // Menu Option Tree Indexing (Two Levels)
byte reportTiming = 0;                                             // 0 - 5 MIN, 1 - 1 HOUR, 2 - 12 HOURS, 3 - 1 DAY
int reportTimingInSec[4] = { 300, 3600, 43200, 86400 };            // Timing Values in Seconds
unsigned long startTime = 0;                                       // Measured the Elapsed Time from Device Start

// Communication
char SSID[] = "Tivadar's Galaxy A12";                              // WIFI NAME
char WIFI_PASSWORD[] = "Puncika123";                               // WIFI PASSWORD
int status = WL_IDLE_STATUS;                                       // WiFi Radio Status
char URL[] = "wild-plum-chipmunk-veil.cyclic.app";                 // Server URL the Device Sends POST Requests
int PORT = 443;                                                    // HTTP with SSL Uses Port 443
WiFiSSLClient wifi;                                                // Initialise the Ethernet Client
HttpClient client = HttpClient(wifi, URL, PORT);                   




void setup() {
  Serial.begin(9600);
  Serial.println("BOOTING...");
  startTime = millis();
  
  EEPROM.begin();
  loadSettings();
  Serial.println(reportTiming);
  Serial.println(sound);


  // Pin Setup
  pinMode(MOISTURE, INPUT);
  pinMode(LIGHT, INPUT);
  pinMode(TANK, INPUT);
  pinMode(BTN_LEFT, INPUT_PULLUP);
  pinMode(BTN_RIGHT, INPUT_PULLUP);
  pinMode(BTN_SELECT, INPUT_PULLUP);
  pinMode(GREEN_LED, OUTPUT);
  digitalWrite(GREEN_LED, LOW);
  digitalWrite(BLUE_LED, LOW);
  pinMode(BUZZ, OUTPUT);

  // DHT Setup
  dht.begin();                                                     // Initialise DHT

  // LCD Setup
  lcd.begin(16, 2);                                                // Number of Rows and Columns
  pinMode(A5, OUTPUT);
  analogWrite(A5, 50);                                             // Dim LCD
  printLCD(" GREEN ROOFTOP >", "    WELCOME!    ");                // Welcome Text
  connectWiFi();
}



void connectWiFi() {                                               // WIFI
  byte attempt = 1;                                                // Init Attempt Counter
  byte maxAttempts = 3;                                            // After 3 Attempt Return
  
  while (status != WL_CONNECTED && attempt <= maxAttempts) {       // Not Connected and Attempt Left
    status = WiFi.begin(SSID, WIFI_PASSWORD);                      // Attempt to Connect to WiFi Network
    String msgLine1 = " CONNECTING...  ";                          // LCD Display
    String msgLine2 = "   ATTEMPT: " + String(attempt);
    printLCD(msgLine1, msgLine2);
    delay(5000);  // wait 5 seconds before retrying                // Retry in 5 Sec
    attempt++;                                                     
  }
  if (status == WL_CONNECTED) {                                    // If Connected
    String msgLine1 = "   CONNECTED    ";                          // LCD Display Success
    String msgLine2 = "                ";
    printLCD(msgLine1, msgLine2);                                  
    delay(3000);
  } else {                                                         // LCD Display Failure
      String msgLine1 = " NOT CONNECTED  ";
      String msgLine2 = "                ";
      printLCD(msgLine1, msgLine2);
      delay(3000);
  }
  digitalWrite(GREEN_LED, HIGH);                                   // Green Led ON
  Serial.println("Connected to WiFi " + String(status));
  displayMenu();                                                   // Back to Menu
}



void saveSettings() {
  EEPROM.put(EEPROM_REPORT_TIMING_ADDRESS, reportTiming);
  EEPROM.put(EEPROM_SOUND_ADDRESS, sound);
}



void loadSettings() {
  EEPROM.get(EEPROM_REPORT_TIMING_ADDRESS, reportTiming);
  if (reportTiming > 4) {
    reportTiming = 0;
  }
  
  EEPROM.get(EEPROM_SOUND_ADDRESS, sound);
  if (sound != 0 && sound != 1) {
    sound = true;
  }
}


int analogToPercentage(float input) {                              // Input Value Between 0 and 1023
  return (int)((input / 1023.00) * 100);                           // Get the Percentage Value
}


void readSensors() {
  moistureLevel = analogToPercentage(analogRead(MOISTURE));        // Read Analog Moisture Sensor
  lightLevel = analogToPercentage(analogRead(LIGHT));              // Read Analog Light Sensor
  temperature = dht.readTemperature();                             // Read DHT Temperature
  humidity = dht.readHumidity();                                   // Read DHT Humidity
  tank = digitalRead(TANK);                                        // Read Digital Water Level
}


void displaySensorsOnSerial() {
  Serial.print("READ ");
  Serial.print("[ MOIST: ");
  Serial.print(moistureLevel);
  Serial.print(", LIGHT: ");
  Serial.print(lightLevel);
  Serial.print(", HUMIDITY: ");
  Serial.print(humidity);
  Serial.print(", TEMP: ");
  Serial.print(temperature);
  Serial.print(", TANK: ");
  Serial.print(tank);
  Serial.println("]");
}



void makeNoise() {
  if (sound) {
    digitalWrite(LED_BUILTIN, HIGH);
    tone(BUZZ, 50);
    delay(20);
    noTone(BUZZ);
  }
}



void printLCD(String line1, String line2) {                        // Print a message to the LCD.
  lcd.setCursor(0, 0);                                             // Set Upper Row Cursor to the Beggining
  lcd.print(line1);                                                // Print Upper Line
  lcd.setCursor(0, 1);                                             // Set Lower Cursor to the Beggining
  lcd.print(line2);                                                // Print Lower Line
}

String padLCDContent(String str) {                                 // Centre a String into LCD Length
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
}



void handleLeftButtonPress(bool state) {
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



void handleRightButtonPress(bool state) {                          // RIGHT
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
    reportTiming = 0;                                              // Option 0 - 5 Mins
    saveSettings();                                                // Save Option on EEPROM
  }
  if (CURRENTMENU[0] == 2 && CURRENTMENU[1] == 7) {                // Report Time Settings / 1 Hour Option
    reportTiming = 1;                                              // Option 0 - 1 Hour
    saveSettings();
  }
  if (CURRENTMENU[0] == 3 && CURRENTMENU[1] == 7) {                // Report Time Settings / 12 Hours Option
    reportTiming = 2;                                              // Option 0 - 12 Hours
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
}



void postSensorData(bool userInitiated) {
  displaySensorsOnSerial();
  // Preparation
  if (status != WL_CONNECTED) connectWiFi();                       // If Not Connected to WiFi, Connect

  String msgLine1 = " AUTO REPORT... ";                            // Set Header Text
  if (userInitiated) msgLine1 = "   REPORT...    ";                // Set Alternative Header Text
  String msgLine2 = "                ";                            // Clear Second Line
  printLCD(msgLine1, msgLine2);                                    // Display
  digitalWrite(BLUE_LED, HIGH);                                    // Set Blue LED ON

  String PAYLOAD =                                                 // Construct the POST data
    "id=" + DEVICE_ID + "&moisture=" + String(moistureLevel) +     // Concatinate Key-Value Pairs with &
    "&light=" + String(lightLevel) + "&humidity=" + String(humidity) + 
    "&temperature=" + String(temperature) + "&tank=" + String(tank);

  if (client.connect(URL, 443)) {                                  // Send the POST request to the server
    const String METHOD = "POST";                                  // Make a HTTP request
    const String ROUTE = "/api/report/?" + PAYLOAD;
    const String PROTOCOL = "HTTP/1.1";
    const String request = METHOD + " " + ROUTE + " " + PROTOCOL;
    const String HOST = "Host: " + String(URL);
    client.println(request);                                       // Send Request
    client.println(HOST);
    client.println("Connection: close\n");                         // Close Connection
    String msgLine2 = "  REPORT SENT   ";
    printLCD(msgLine1, msgLine2);
    delay(2000);
    displayMenu();              
    digitalWrite(BLUE_LED, LOW);                                   // Blue LED Off
    makeNoise();
    makeNoise();                      
  }
}



void displayMenu() {
  byte currentMainMenuSelection = CURRENTMENU[0];
  byte currentSubMenuSelection = CURRENTMENU[1];
  String msgLine1 = "";
  String msgLine2 = "";

  if (currentSubMenuSelection == 0)
  switch (currentMainMenuSelection) {
    case 0:
      msgLine1 = " GREEN ROOFTOP >";
      msgLine2 = "    WELCOME!    ";
      break;
    case 1:
      msgLine1 = "<   MOISTURE   >";
      readSensors();
      msgLine2 = padLCDContent(String(moistureLevel) + "%");
      break;
    case 2:
      readSensors();
      msgLine1 = "<     LIGHT    >";
      msgLine2 = padLCDContent(String(lightLevel) + "%");
      break;
    case 3:
      readSensors();
      msgLine1 = "<   HUMIDITY   >";
      msgLine2 = padLCDContent(String(humidity));
      break;
    case 4:
      readSensors();
      msgLine1 = "<  TEMPERATURE >";
      msgLine2 = padLCDContent(String(temperature) + " C");
      break;
    case 5:
      readSensors();
      msgLine1 = "<   WATERTANK  >";
      if (tank == 0) msgLine2 = "     EMPTY      ";
      else msgLine2 = "      FULL      ";
      break;
    case 6:
      readSensors();
      msgLine1 = "<    SOUND     >";
      if (sound == 1) msgLine2 = "       ON       ";
      else msgLine2 = "      OFF       ";
      break;
    case 7:
        msgLine1 = "<  AUTO REPORT >";
        if (reportTiming == 0) msgLine2 = "     5 MINS     ";
        if (reportTiming == 1) msgLine2 = "     1 HOUR     ";
        if (reportTiming == 2) msgLine2 = "    12 HOURS    ";
        if (reportTiming == 3) msgLine2 = "     1 DAY      ";
        break;
      break;
    case 8:
      msgLine1 = "<   REPORT NOW  ";
      msgLine2 = "                ";
    break;
  }
  else {
    switch (currentMainMenuSelection) {
        case 1:
          msgLine1 = "     5 MINS    >";
          if (reportTiming == 0) msgLine2 = "    SELECTED    ";
          else msgLine2 = "                ";
          break;
        case 2:
          msgLine1 = "<    1 HOUR    >";
          if (reportTiming == 1) msgLine2 = "    SELECTED    ";
          else msgLine2 = "                ";
          break;
        case 3:
          msgLine1 = "<   12 HOURS   >";
          if (reportTiming == 2) msgLine2 = "    SELECTED    ";
          else msgLine2 = "                ";
          break;
        case 4:
          msgLine1 = "<    1 DAY     >";
          if (reportTiming == 3) msgLine2 = "    SELECTED    ";
          else msgLine2 = "                ";
          break;
        case 5:
          msgLine1 = "<     BACK      ";
          msgLine2 = "                ";
          break;
      }
  }
  
  printLCD(msgLine1, msgLine2);
}



void loop() {
  // Check if Autoreporting is Due
  unsigned long elapsedTime = (millis() - startTime) / 1000;       // Get Elapsed Time from Switch On or Last Reporting
  if (elapsedTime >= reportTimingInSec[reportTiming]) {            // If Time to Report
    postSensorData(false);                                         // Attempt Sending a Report
    startTime = millis();                                          // Reset Timer
  }


  // Read Left Button
  const bool leftButtonState = digitalRead(BTN_LEFT);
  if (BUTTONSTATES[0] != leftButtonState) {
    BUTTONSTATES[0] = leftButtonState;
    if (BUTTONSTATES[0] == 0) handleLeftButtonPress(leftButtonState);
  }
  
  // Read Right Button
  const bool rightButtonState = digitalRead(BTN_RIGHT);
  if (BUTTONSTATES[1] != rightButtonState) {
    BUTTONSTATES[1] = rightButtonState;
    if (BUTTONSTATES[1] == 0) handleRightButtonPress(rightButtonState);
  }

  // Read Select Button
  const bool selectButtonState = digitalRead(BTN_SELECT);
  if (BUTTONSTATES[2] != selectButtonState) {
    BUTTONSTATES[2] = selectButtonState;
    if (BUTTONSTATES[2] == 0) handleSelectButtonPress(selectButtonState);
  }
}
