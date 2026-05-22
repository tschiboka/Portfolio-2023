// Components
import Article from '../../components/sharedComponents/Article/Article'
import Figure from '../../components/sharedComponents/Figure/Figure'
import { Code, Heading, Link, Paragraph, Section } from '@common/ux'
import InlineReference from '../../components/sharedComponents/InlineReference/InlineReference'

// Images
import introImg from '../../assets/images/blog/greenRooftop/intro.png'
import conceptImg from '../../assets/images/blog/greenRooftop/concept_sketch.png'
import microcontrollerImg from '../../assets/images/blog/greenRooftop/microcontroller_selection.png'
import moistureSensorImg from '../../assets/images/blog/greenRooftop/moisture_sensor.png'
import lightSensorImg from '../../assets/images/blog/greenRooftop/light_sensor.png'
import dhtImg from '../../assets/images/blog/greenRooftop/dht.png'
import liquidLevelSensorImg from '../../assets/images/blog/greenRooftop/liquid_level_sensor.png'
import userIOImg from '../../assets/images/blog/greenRooftop/user_io.png'
import ledsImg from '../../assets/images/blog/greenRooftop/leds.png'
import lcdImg from '../../assets/images/blog/greenRooftop/lcd.png'
import buzzerImg from '../../assets/images/blog/greenRooftop/buzzer.png'
import protocolsImg from '../../assets/images/blog/greenRooftop/protocols.png'
import useCaseImg from '../../assets/images/blog/greenRooftop/use_case.png'
import sequenceImg from '../../assets/images/blog/greenRooftop/sequence.png'
import activityImg from '../../assets/images/blog/greenRooftop/activity.png'
import electricDesignImg from '../../assets/images/blog/greenRooftop/electric_design.png'
import projectionDiagramImg from '../../assets/images/blog/greenRooftop/projection_diagram.png'
import menuImg from '../../assets/images/blog/greenRooftop/menu.png'
import restfulImg from '../../assets/images/blog/greenRooftop/routes.png'
import erImg from '../../assets/images/blog/greenRooftop/er.png'
import wireframesImg from '../../assets/images/blog/greenRooftop/wireframes.png'
import plasticComponentsImg from '../../assets/images/blog/greenRooftop/plastic_components.png'
import electricHousingImg from '../../assets/images/blog/greenRooftop/electric_housing.png'
import assembly1Img from '../../assets/images/blog/greenRooftop/assembly_1.png'
import assembly2Img from '../../assets/images/blog/greenRooftop/assembly_2.png'
import assembly3Img from '../../assets/images/blog/greenRooftop/assembly_3.png'
import assembly4Img from '../../assets/images/blog/greenRooftop/assembly_4.png'
import finalProductImg from '../../assets/images/blog/greenRooftop/final_product.png'

// Other Assets
import { getReferenceList } from '../references'
import codeSnippets from './codeSnippets'
import greenRooftopCode from '../../assets/files/blog/green-rooftop/green_rooftop.txt'

// Styles

interface Props {
    pageName: string
    path: string
}

const GreenRooftop = ({ pageName, path }: Props) => {
    const references = getReferenceList(path)
    return (
        <Article pageName={pageName} path={path} title="Green Rooftop">
            <Heading as="h1">Green Rooftop - An Arduino IoT Project</Heading>
            <Section>
                <Figure
                    image={introImg}
                    size="md"
                    bgColor="white"
                    alt={'Green Plant'}
                    zoomAllowed={false}
                />
                <Paragraph>
                    In this hands-on tutorial, you'll embark on a journey to design and create an
                    intelligent rooftop garden system that can monitor environmental parameters such
                    as temperature, humidity, moisture, and light. We will create a user-friendly
                    interface featuring buttons, LCD, and a buzzer for easy interaction. This
                    project offers an ideal learning experience for those looking to combine Arduino
                    with an API, as we will also create a simple NodeJs server and a website. Let's
                    begin this educational adventure with a greener, more sustainable future in
                    mind.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Green Rooftops and IoT</Heading>
                <Paragraph>
                    IoT has the potential to play a significant role in helping to address
                    environmental challenges. By leveraging IoT devices and technologies, it is
                    possible to gather data about various environmental factors such as air and
                    water quality, weather patterns, and biodiversity. This data can then inform and
                    improve conservation efforts, monitor and mitigate pollution, and support
                    sustainable agriculture and energy practices. Through the collection and
                    analysis of real-time data, IoT can help optimise resource use, reduce waste and
                    pollution, and support the transition to a more sustainable and circular
                    economy.
                    <InlineReference reference={references[0]} />
                </Paragraph>
                <Paragraph>
                    One of the main benefits of our application is that we empower urban environment
                    maintenance services to monitor and maintain their contractors' green roofs or
                    terraces centrally. Monitoring may help better organise their workforce,
                    predicting foreseeable labour and material requirements, and combined with
                    meteorological data, can fine-tune the whole operation of environmental
                    businesses.
                </Paragraph>
                <Figure
                    image={conceptImg}
                    size="md"
                    bgColor="white"
                    alt={'Conceptual Drawing'}
                    zoomAllowed={true}
                    caption="Conceptual Drawing"
                />
            </Section>
            <Section>
                <Heading as="h2">Microcontroller Selection</Heading>
                <Paragraph>
                    Although reading analogue and digital sensors can be done with a basic Arduino
                    Uno, it may not be suitable for this project because most basic microcontroller
                    devices do not have a built-in WiFi module. Even if WiFi modules can be
                    purchased separately, built-in WiFi connectivity is one of the most significant
                    factors in our microcontroller selection. It reduces complexity and frees up
                    physical space, which may be a deal breaker, considering the number of input and
                    output components we use.
                    <br />
                    Several microcontroller options are available with built-in WiFi capabilities,
                    like the Arduino MKR WiFi-1000 and WiFi Rev-2, Ublox Nina-W10 and W13 modules or
                    the ESP8266 and ESP32. However, the Arduino-based boards will enjoy preference
                    over other options because of extensive Arduino documentation and support. For
                    example, the Arduino Rev-2 is an ideal choice as it has a header pinout that
                    supports jumper cables. And because we might need to experiment extensively to
                    make every component work according to specs, header pinouts make circuit design
                    and tests comfortable.
                </Paragraph>
                <Figure
                    image={microcontrollerImg}
                    size="md"
                    bgColor="white"
                    alt={'Arduino Rev 2 Wifi'}
                    zoomAllowed={true}
                    caption="Arduino Rev 2 Wifi"
                    reference={references[1]}
                />
            </Section>
            <Section>
                <Heading as="h2">Inputs</Heading>
                <Paragraph>
                    <strong>Grove Soil Moisture Sensor (SKU-101020008)</strong> is a capacitive
                    sensor that evaluates the soil moisture level by measuring resistance. It
                    "consists of two probes that allow the current to pass through the soil and then
                    obtain resistance values to measure soil moisture content".
                    <InlineReference reference={references[2]} />
                    However, it is essential to notice that the values read by these sensors are not
                    proportional to the full range of analogue inputs (0-1023) as the output of the
                    component voltage is limited to 1-3V.
                </Paragraph>
                <Figure
                    image={moistureSensorImg}
                    size="sm"
                    bgColor="white"
                    alt={'Grove Moisture Sensor'}
                    zoomAllowed={true}
                    caption="Grove Moisture Sensor"
                />
                <Paragraph>
                    <strong>Grove Light Sensor</strong> is an analogue module that reads light
                    levels with high accuracy, using a highly sensitive photo-triode.
                </Paragraph>
                <Figure
                    image={lightSensorImg}
                    size="sm"
                    bgColor="white"
                    alt={'Light Sensor'}
                    zoomAllowed={true}
                    caption="Light Sensor"
                />
                <Paragraph>
                    <strong>Grove Humidity and Temperature Sensor Pro</strong> can simultaneously
                    measure the temperature and humidity of the surrounding environment. It is a
                    digital sensor that utilises a single-wire communication protocol and is
                    designed to be highly compatible. The sensor is based on the DHT-22 sensor, a
                    high-performance, reliable sensor for measuring temperature and humidity. The
                    sensor has a temperature measurement range of -40-80°C and 0-99% for humidity.
                    Additionally, DHT-22 has a high accuracy of ±2°C for temperature and ±0.5% for
                    humidity.
                </Paragraph>
                <Figure
                    image={dhtImg}
                    size="sm"
                    bgColor="white"
                    alt={'DHT Sensor'}
                    zoomAllowed={true}
                    caption="DHT Sensor"
                />
                <Paragraph>
                    <strong>Gravity Photoelectric Water/Liquid Level Sensor:</strong> Most
                    liquid-level sensors must be submerged into the liquid to work, unlike Gravity,
                    as it operates on optical principles and lacks mechanical parts that need
                    calibration or maintenance. As a result, it is well suited to applications with
                    an exposal of high pressures or volatile temperatures and can be fitted in
                    several ways.
                </Paragraph>
                <Figure
                    image={liquidLevelSensorImg}
                    size="sm"
                    bgColor="white"
                    alt={'Liquid Level Sensor'}
                    zoomAllowed={true}
                    caption="Liquid Level Sensor"
                />
                <Paragraph>
                    Lastly, three momentary tactile switches will be used for the device user
                    inputs. The left and right buttons will step between menu options, and the
                    select button will either activate a menu option or enter a submenu.
                </Paragraph>
                <Figure
                    image={userIOImg}
                    size="lg"
                    bgColor="white"
                    alt={'User IO'}
                    zoomAllowed={true}
                    caption="UserIO"
                />
            </Section>
            <Section>
                <Heading as="h2">Outputs</Heading>
                <Paragraph>
                    <strong>LED:</strong> Two Light Emitting Diodes will be used, one indicating a
                    successful WiFi connection and one when the device communicates with the server;
                    as a good practice, resistors will be connected to the anode to extend the LEDs'
                    lifetime.
                </Paragraph>
                <Figure
                    image={ledsImg}
                    size="sm"
                    bgColor="white"
                    alt={'LEDs'}
                    zoomAllowed={true}
                    caption="LEDs"
                />
                <Paragraph>
                    <strong>LCD Display (HD-44780):</strong> This Liquid Crystal Display is a
                    fundamental part of many Arduino sets, as these are relatively easy to integrate
                    into any project. The display has two rows, each with 16 characters of display
                    space. In addition, the backlight of the component can be set through its V0
                    pin, which will come in handy for adjusting the display's contrast through an
                    analogue pin.
                </Paragraph>
                <Figure
                    image={lcdImg}
                    size="sm"
                    bgColor="white"
                    alt={'LCD'}
                    zoomAllowed={true}
                    caption="LCD"
                />
                <Paragraph>
                    Buzzers are great economical ways to extend our user interface, providing
                    additional feedback about actions for our customers. The only complexity of
                    applying audio feedback is to make it optional, as no UI should be delivered
                    with compulsory audio functionality. The Piezo buzzer is a multi-tone audio
                    signalling device that vibrates piezoelectric crystals to produce audio output.
                </Paragraph>
                <Figure
                    image={buzzerImg}
                    size="sm"
                    bgColor="white"
                    alt={'Buzzer'}
                    zoomAllowed={true}
                    caption="Buzzer"
                />
            </Section>
            <Section>
                <Heading as="h2">Protocols</Heading>
                <Paragraph>
                    We will use WiFi to connect our devices to the network, as it may cover
                    sufficient area (using 2.5GHz may reach about 50 meters). Alternatively, GSM
                    cellular connection may be used for longer distances, which is not essential for
                    our prototype implementation. We will use HTTPS for secure communication with
                    our backend server, and our RESTful NodeJS API will listen to the HTTP requests.
                    In exchange, every request will return a response in JSON (JavaScript Object
                    Notation), including errors. The benefits of using JSON over plain text requests
                    are that it is well structured, ready to use after parsing, and
                    platform-independent. Additionally, Restful APIs offer a standardised way of
                    communicating with our server using simple HTML verbs (methods).
                </Paragraph>
                <Paragraph>
                    Our server has to be able to send notification emails to our clients, so we will
                    use SMTP to send our emails using NodeMailer (naturally, our client will use
                    POP3 to retrieve our emails). Lastly, internal Arduino components may use
                    protocols abstracted by libraries, like DHT22 uses I2C communication.
                </Paragraph>
                <Figure
                    image={protocolsImg}
                    size="lg"
                    bgColor="white"
                    alt={'Protocols'}
                    zoomAllowed={true}
                    caption="Protocols"
                />
            </Section>
            <Section>
                <Heading as="h2">Design</Heading>
                <Paragraph>
                    In our scenario, the design must be approached from multiple angles, as the
                    project incorporates the IoT device's physical arrangement, communication to the
                    server, and a software platform. Our main goal is for users to read specific
                    device values in person or online and for the service team to monitor device
                    activity through the application to make decisions about maintenance.
                </Paragraph>
                <Figure
                    image={useCaseImg}
                    size="lg"
                    bgColor="white"
                    alt={'Use Case Diagram'}
                    zoomAllowed={true}
                    caption="Use Case Diagram"
                />
                <Paragraph>
                    The prototype will not include login procedures as we have one device; however,
                    in the commercial product, we must ensure that users can access only their data
                    while the maintenance team can read all devices' information.
                </Paragraph>
                <Paragraph>
                    When the device is on, it continuously reads the elapsed time and sends reports
                    to our API if a WiFi connection is available. Our backend will check the
                    reported values, and if any of them is out of the minimum acceptable range, our
                    user (or maintenance team) will receive an alert email.
                </Paragraph>
                <Figure
                    image={sequenceImg}
                    size="lg"
                    bgColor="white"
                    alt={'Sequence Diagram'}
                    zoomAllowed={true}
                    caption="Sequence Diagram"
                />
                <Paragraph>
                    Our IoT device has four main steps to achieve a successful reporting
                    functionality. First, we boot our device by loading saved settings, initialising
                    our pin layout and connecting to WiFi. Then, the main loop only checks the
                    elapsed time and calls a reporting procedure. At the same time, the LCD and the
                    connection/report LEDs continuously inform the user about the ongoing processes.
                </Paragraph>
                <Figure
                    image={activityImg}
                    size="lg"
                    bgColor="white"
                    alt={'Activity Diagram'}
                    zoomAllowed={true}
                    caption="Activity Diagram"
                />
                <Paragraph>
                    As most of our sensors work with analogue pins, we have just enough digital pins
                    to accommodate our LCD, LEDs and buttons without additional support. The
                    electrical layout of the device can be divided into four different units: the
                    microcontroller, control panel components with LEDs and input buttons, outputs,
                    such as LCD and speaker, and sensors.
                </Paragraph>
                <Figure
                    image={electricDesignImg}
                    size="lg"
                    bgColor="white"
                    alt={'Electric Design'}
                    zoomAllowed={true}
                    caption="Electric Design"
                />
            </Section>
            <Section>
                <Heading as="h2">Modelling</Heading>
                <Paragraph>
                    Our project is an outdoor device, so we must create an enclosure to protect the
                    electronic components from the elements. We will use Polystyrene sheets as our
                    building materials, as they are suitable for outdoor use; however, our
                    commercial devices should be manufactured with more eco-friendly materials such
                    as carbon fibre sheets. Our design must be compact yet provide enough space for
                    our components, and removing the bottom screws should make it serviceable.
                </Paragraph>
                <Figure
                    image={projectionDiagramImg}
                    size="lg"
                    bgColor="white"
                    alt={'Projection Diagram'}
                    zoomAllowed={true}
                    caption="Projection Diagram"
                />
            </Section>
            <Section>
                <Heading as="h2">User Interface</Heading>
                <Paragraph>
                    The users can communicate through the menu by manipulating three buttons (Left,
                    Right, and Select). The menu is non-iterative; pressing right on the last item
                    will not go to the first item. The select button can refresh a sensor reading or
                    enter a submenu. The following is the design of our device's interface:
                </Paragraph>
                <Figure
                    image={menuImg}
                    size="lg"
                    bgColor="white"
                    alt={'Menu'}
                    zoomAllowed={true}
                    caption="Menu"
                />
            </Section>
            <Section>
                <Heading as="h2">Backend Design</Heading>
                <Paragraph>
                    Even though only one prototype will be built, we may design our API to be
                    scalable because the commercial solution will have multiple users and devices.
                    Therefore, apart from the reporting API routes, we'll have an index route for
                    checking connectivity, a device route for registering instruments, and users for
                    the application. We'll use HTML methods aligning RESTful conventions:
                </Paragraph>
                <Figure
                    image={restfulImg}
                    size="lg"
                    bgColor="white"
                    alt={'Routes'}
                    zoomAllowed={true}
                    caption="Routes"
                />
                <Paragraph>
                    Following our route plan, we can create a simple database schema with three
                    tables: Users, Devices and Reports. Then, we can work with an initial schema
                    using MongoDB. Adding properties is not restricted in NoSQL databases, and a
                    commercial version may extend it by adding login and profile details.
                </Paragraph>
                <Figure
                    image={erImg}
                    size="lg"
                    bgColor="white"
                    alt={'Entity Diagram'}
                    zoomAllowed={true}
                    caption="Entity Diagram"
                />
            </Section>
            <Section>
                <Heading as="h2">Frontend Design</Heading>
                <Paragraph>
                    Lastly, we may create our application design with mobile devices in focus.
                    Because responsive design is out of our current scope, only mobile sizes will be
                    developed (&lt;720 pixels). Our specifications require two pages, one for
                    reading the latest device information and one for listing historical
                    measurements.
                </Paragraph>
                <Figure
                    image={wireframesImg}
                    size="lg"
                    bgColor="white"
                    alt={'Wireframes'}
                    zoomAllowed={true}
                    caption="Wireframes"
                />
            </Section>
            <Section>
                <Heading as="h2">Manufacturing</Heading>
                <Paragraph>
                    First, the polystyrene sheet was cut to size, drilled and pasted together
                    according to our design plan, and then the cover received a matte black
                    painting.
                </Paragraph>
                <Figure
                    image={plasticComponentsImg}
                    size="md"
                    bgColor="white"
                    alt={'Plastic Components'}
                    zoomAllowed={true}
                    caption="Plastic Components"
                />
                <Figure
                    image={electricHousingImg}
                    size="lg"
                    bgColor="white"
                    alt={'Electric Housing'}
                    zoomAllowed={true}
                    caption="Electric Housing"
                />
                <Paragraph>
                    Next, the Arduino was fixed to a central place and connected to the USB. The
                    sensors required extensive wiring; therefore, we used universal printed circuit
                    boards (PCBs) to join the sensors to VCC and ground wires to reduce cabling.
                </Paragraph>
                <Figure
                    image={assembly1Img}
                    size="md"
                    bgColor="white"
                    alt={'Assembly 1'}
                    zoomAllowed={true}
                    caption="Assembly 1"
                />
                <Figure
                    image={assembly2Img}
                    size="lg"
                    bgColor="white"
                    alt={'Assembly 2'}
                    zoomAllowed={true}
                    caption="Assembly 2"
                />
                <Paragraph>
                    Lastly, the LCD, LEDs and buttons were assembled, with a second universal PCB
                    for VCC and ground. Unfortunately, the second PCB made our wiring messy, and for
                    a commercial device, we should use a custom-designed PCB to minimise wiring
                    complexity.
                </Paragraph>
                <Figure
                    image={assembly3Img}
                    size="md"
                    bgColor="white"
                    alt={'Assembly 3'}
                    zoomAllowed={true}
                    caption="Assembly 3"
                />
                <Figure
                    image={assembly4Img}
                    size="lg"
                    bgColor="white"
                    alt={'Assembly 4'}
                    zoomAllowed={true}
                    caption="Assembly 4"
                />
                <Paragraph>The assembled product is now ready for further development.</Paragraph>
                <Figure
                    image={finalProductImg}
                    size="lg"
                    bgColor="white"
                    alt={'Final Product'}
                    zoomAllowed={true}
                    caption="Final Product"
                />
            </Section>
            <Section>
                <Heading as="h2">Sensor Readings and Menu</Heading>
                <Paragraph>
                    You can download the complete project code from here, as I my code snippets do
                    not cover pin layouts, and some fundamental setups.
                    <Link className="inline" download href={greenRooftopCode}>
                        Green_Rooftop.ino
                    </Link>
                    After finalising our wiring, we can continue developing by reading sensors. But
                    first, we must set the pin modes according to the pin layout and create a
                    function responsible for assigning sensor values to globally available
                    variables. Analogue sensor values range from 0-1023, so some readings must be
                    turned into percentages.
                </Paragraph>
                <Code
                    fileName="green_rooftop.ino"
                    language="arduino"
                    content={codeSnippets.readSensors}
                />
                <Paragraph>
                    We will use LCD cursor settings and printing extensively in our nested menu. A
                    print LCD subroutine that encapsulates these functionalities is easier to reuse.
                    Additionally, we can add a function responsible for text content centring.
                </Paragraph>
                <Code fileName="green_rooftop.ino" language="arduino" content={codeSnippets.lcd} />
                <Paragraph>
                    Finally, we can listen to button presses. Left, right and select buttons will
                    receive their handling functions, and they may stop incrementing/decrementing
                    the current index to stay within the menu (or submenu) boundaries or trigger an
                    appropriate action. The menu state will be stored in an array, and each item
                    will represent a submenu.
                </Paragraph>
                <Code
                    fileName="green_rooftop.ino"
                    language="arduino"
                    content={codeSnippets.handleBtnPress}
                />
            </Section>
            <Section>
                <Heading as="h2">Report Intervals</Heading>
                <Paragraph>
                    In a successful business, thousands of devices might communicate with our
                    servers. Even if only a subset of them are set to a fixed time reporting, for
                    instance, 4 PM, servers may be overwhelmed if all requests come in
                    simultaneously. However, we may calculate the elapsed time from the devices'
                    start to disperse possible floods of POST requests.
                </Paragraph>
                <Code
                    fileName="green_rooftop.ino"
                    language="arduino"
                    content={codeSnippets.intervals}
                />
            </Section>
            <Section>
                <Heading as="h2">WiFi Connection</Heading>
                <Paragraph>
                    We must establish a WiFi connection to send our reports to the server. This
                    connection may be set from start-up and must be double-checked before server
                    communication. One of the simplest ways to connect our Arduino is to use the
                    WIFININA library. Our algorithm will be based on our earlier the diagram.
                </Paragraph>
                <Code fileName="green_rooftop.ino" language="arduino" content={codeSnippets.wifi} />
            </Section>
            <Section>
                <Heading as="h2">POST Requests</Heading>
                <Paragraph>
                    Finally, we may be able to connect to our server and send our sensor reports to
                    our database. We can use the ArduinoHTTPClient library for HTTP communication
                    and create a WiFiSSLClient. First, we check our WiFi status and build a payload
                    string for sensor values. As this library had difficulty correctly sending our
                    data in the request body, we used the query string as a workaround.
                    Additionally, our WiFi password and SSID are hardcoded for now, but the
                    commercial application should have alternatives to set these values dynamically.
                </Paragraph>
                <Code fileName="green_rooftop.ino" language="arduino" content={codeSnippets.post} />
            </Section>
            <Section>
                <Heading as="h2">Request Routes</Heading>
                <Paragraph>
                    After completing our POST request from the device, we may consume those requests
                    from the server side. We connect to our database with a connection string and
                    listen to incoming requests. We modularise our schemas and route handlers into
                    index, users, devices and reports. After registering a mock user and a device
                    for testing, we can validate and save sensor data on our database.
                </Paragraph>
                <Code fileName="report.js" language="javascript" content={codeSnippets.postRoute} />
            </Section>
            <Section>
                <Heading as="h2">Email Alert</Heading>
                <Paragraph>
                    Our report route is also responsible for sending alert emails to the users'
                    email addresses if specific values are out of boundaries, such as water tank and
                    soil moisture. We register the application to our Google mail server and
                    construct an email template with Nodemailer using HTML content to produce mail
                    services.
                </Paragraph>
                <Code fileName="report.js" language="javascript" content={codeSnippets.email} />
            </Section>
            <Section>
                <Heading as="h2">Frontend</Heading>
                <Paragraph>
                    Lastly, we need to create the application's client side, where the users may
                    access their device's report data. In our presentation prototype, we hard-coded
                    the user id, so we could concentrate on the main object of our code, which is
                    successfully accessing services and visualising reports. However, commercial
                    applications would use login procedures to provide user permissions.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">API Calls</Heading>
                <Paragraph>
                    Several acceptable server request methods exist in JavaScript, like traditional
                    async callbacks, promises (then/catch) or the modern fetch (async/await). Using
                    async-await is beneficial because it reads like synchronous programming, is
                    concise, and is not nested, meaning multiple calls would never end up in a
                    so-called callback hell.
                </Paragraph>
                <Code fileName="index.js" language="javascript" content={codeSnippets.fetch} />
            </Section>
            <Section>
                <Heading as="h2">Conclusion</Heading>
                <Paragraph>
                    In conclusion, this project showcases some exciting intersections of
                    environmental monitoring, IoT technology, and sustainable practices. Through
                    this tutorial, you've learned how to create and design an intelligent rooftop
                    garden system project that can monitor environmental parameters.
                </Paragraph>
            </Section>
        </Article>
    )
}

export default GreenRooftop
