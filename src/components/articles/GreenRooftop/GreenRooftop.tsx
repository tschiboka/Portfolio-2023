// Components
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";

// Images
import introImg from "../../../assets/images/blog/greenRooftop/intro.png";
import conceptImg from "../../../assets/images/blog/greenRooftop/concept_sketch.png";
import microcontrollerImg from "../../../assets/images/blog/greenRooftop/microcontroller_selection.png";
import moistureSensorImg from "../../../assets/images/blog/greenRooftop/moisture_sensor.png";
import lightSensorImg from "../../../assets/images/blog/greenRooftop/light_sensor.png";
import dhtImg from "../../../assets/images/blog/greenRooftop/dht.png";
import liquidLevelSensorImg from "../../../assets/images/blog/greenRooftop/liquid_level_sensor.png";
import userIOImg from "../../../assets/images/blog/greenRooftop/user_io.png";
import ledsImg from "../../../assets/images/blog/greenRooftop/leds.png";
import lcdImg from "../../../assets/images/blog/greenRooftop/lcd.png";
import buzzerImg from "../../../assets/images/blog/greenRooftop/buzzer.png";
import protocolsImg from "../../../assets/images/blog/greenRooftop/protocols.png";
import useCaseImg from "../../../assets/images/blog/greenRooftop/use_case.png";
import sequenceImg from "../../../assets/images/blog/greenRooftop/sequence.png";
import activityImg from "../../../assets/images/blog/greenRooftop/activity.png";
import electricDesignImg from "../../../assets/images/blog/greenRooftop/electric_design.png";

// Other Assets
//import codeSnippets from "./codeSnippets";
import { getReferenceList } from "../references";

// Styles
import "./GreenRooftop.scss";
import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

interface Props {
    pageName: string;
    path: string;
}

const GreenRooftop = ({ pageName, path }: Props) => {
    const references = getReferenceList(path);
    return (
        <Article pageName={pageName} path={path} title="JS Date Validation">
            <h1>Green Rooftop - An Arduino IoT Project</h1>
            <Figure
                image={introImg}
                className={"image--med bg--white"}
                alt={"Green Plant"}
                zoomAllowed={false}
            />
            <p>
                In this hands-on tutorial, you'll embark on a journey to create
                an intelligent rooftop garden system that can monitor
                environmental parameters such as temperature, humidity,
                moisture, and light. We will create a user-friendly interface
                featuring buttons, LCD, and a buzzer for easy interaction. This
                project offers an ideal learning experience for those looking to
                combine Arduino with an API, as we will also create a simple
                NodeJs server and a website. Let's begin this educational
                adventure with a greener, more sustainable future in mind.
            </p>
            <h3>Green Rooftops and IoT</h3>
            <p>
                IoT has the potential to play a significant role in helping to
                address environmental challenges. By leveraging IoT devices and
                technologies, it is possible to gather data about various
                environmental factors such as air and water quality, weather
                patterns, and biodiversity. This data can then inform and
                improve conservation efforts, monitor and mitigate pollution,
                and support sustainable agriculture and energy practices.
                Through the collection and analysis of real-time data, IoT can
                help optimise resource use, reduce waste and pollution, and
                support the transition to a more sustainable and circular
                economy.
                <InlineReference reference={references[0]} />
            </p>
            <p>
                One of the main benefits of our application is that we empower
                urban environment maintenance services to monitor and maintain
                their contractors' green roofs or terraces centrally. Monitoring
                may help better organise their workforce, predicting foreseeable
                labour and material requirements, and combined with
                meteorological data, can fine-tune the whole operation of
                environmental businesses.
            </p>
            <Figure
                image={conceptImg}
                className={"image--med bg--white"}
                alt={"Conceptual Drawing"}
                zoomAllowed={true}
                caption="Conceptual Drawing"
            />
            <h3>Microcontroller Selection</h3>
            <p>
                Although reading analogue and digital sensors can be done with a
                basic Arduino Uno, it may not be suitable for this project
                because most basic microcontroller devices do not have a
                built-in WiFi module. Even if WiFi modules can be purchased
                separately, built-in WiFi connectivity is one of the most
                significant factors in our microcontroller selection. It reduces
                complexity and frees up physical space, which may be a deal
                breaker, considering the number of input and output components
                we use.
                <br />
                Several microcontroller options are available with built-in WiFi
                capabilities, like the Arduino MKR WiFi-1000 and WiFi Rev-2,
                Ublox Nina-W10 and W13 modules or the ESP8266 and ESP32.
                However, the Arduino-based boards will enjoy preference over
                other options because of extensive Arduino documentation and
                support. For example, the Arduino Rev-2 is an ideal choice as it
                has a header pinout that supports jumper cables. And because we
                might need to experiment extensively to make every component
                work according to specs, header pinouts make circuit design and
                tests comfortable.
            </p>
            <Figure
                image={microcontrollerImg}
                className={"image--med bg--white"}
                alt={"Arduino Rev 2 Wifi"}
                zoomAllowed={true}
                caption="Arduino Rev 2 Wifi"
                reference={references[1]}
            />
            <h3>Inputs</h3>
            <p>
                <strong>Grove Soil Moisture Sensor (SKU-101020008)</strong> is a
                capacitive sensor that evaluates the soil moisture level by
                measuring resistance. It "consists of two probes that allow the
                current to pass through the soil and then obtain resistance
                values to measure soil moisture content".
                <InlineReference reference={references[2]} />
                However, it is essential to notice that the values read by these
                sensors are not proportional to the full range of analogue
                inputs (0-1023) as the output of the component voltage is
                limited to 1-3V.
            </p>
            <Figure
                image={moistureSensorImg}
                className={"image--sml bg--white"}
                alt={"Grove Moisture Sensor"}
                zoomAllowed={true}
                caption="Grove Moisture Sensor"
            />
            <p>
                <strong>Grove Light Sensor</strong> is an analogue module that
                reads light levels with high accuracy, using a highly sensitive
                photo-triode.
            </p>
            <Figure
                image={lightSensorImg}
                className={"image--sml bg--white"}
                alt={"Light Sensor"}
                zoomAllowed={true}
                caption="Light Sensor"
            />
            <p>
                <strong>Grove Humidity and Temperature Sensor Pro</strong> can
                simultaneously measure the temperature and humidity of the
                surrounding environment. It is a digital sensor that utilises a
                single-wire communication protocol and is designed to be highly
                compatible. The sensor is based on the DHT-22 sensor, a
                high-performance, reliable sensor for measuring temperature and
                humidity. The sensor has a temperature measurement range of
                -40-80°C and 0-99% for humidity. Additionally, DHT-22 has a high
                accuracy of ±2°C for temperature and ±0.5% for humidity.
            </p>
            <Figure
                image={dhtImg}
                className={"image--sml bg--white"}
                alt={"DHT Sensor"}
                zoomAllowed={true}
                caption="DHT Sensor"
            />
            <p>
                <strong>
                    Gravity Photoelectric Water/Liquid Level Sensor:
                </strong>{" "}
                Most liquid-level sensors must be submerged into the liquid to
                work, unlike Gravity, as it operates on optical principles and
                lacks mechanical parts that need calibration or maintenance. As
                a result, it is well suited to applications with an exposal of
                high pressures or volatile temperatures and can be fitted in
                several ways.
            </p>
            <Figure
                image={liquidLevelSensorImg}
                className={"image--sml bg--white"}
                alt={"Liquid Level Sensor"}
                zoomAllowed={true}
                caption="Liquid Level Sensor"
            />
            <p>
                Lastly, three momentary tactile switches will be used for the
                device user inputs. The left and right buttons will step between
                menu options, and the select button will either activate a menu
                option or enter a submenu.
            </p>
            <Figure
                image={userIOImg}
                className={"image--lrg bg--white"}
                alt={"User IO"}
                zoomAllowed={true}
                caption="UserIO"
            />
            <h3>Outputs</h3>
            <p>
                <strong>LED:</strong> Two Light Emitting Diodes will be used,
                one indicating a successful WiFi connection and one when the
                device communicates with the server; as a good practice,
                resistors will be connected to the anode to extend the LEDs'
                lifetime.
            </p>
            <Figure
                image={ledsImg}
                className={"image--sml bg--white"}
                alt={"LEDs"}
                zoomAllowed={true}
                caption="LEDs"
            />
            <p>
                <strong>LCD Display (HD-44780):</strong> This Liquid Crystal
                Display is a fundamental part of many Arduino sets, as these are
                relatively easy to integrate into any project. The display has
                two rows, each with 16 characters of display space. In addition,
                the backlight of the component can be set through its V0 pin,
                which will come in handy for adjusting the display's contrast
                through an analogue pin.
            </p>
            <Figure
                image={lcdImg}
                className={"image--sml bg--white"}
                alt={"LCD"}
                zoomAllowed={true}
                caption="LCD"
            />
            <p>
                Buzzers are great economical ways to extend our user interface,
                providing additional feedback about actions for our customers.
                The only complexity of applying audio feedback is to make it
                optional, as no UI should be delivered with compulsory audio
                functionality. The Piezo buzzer is a multi-tone audio signalling
                device that vibrates piezoelectric crystals to produce audio
                output.
            </p>
            <Figure
                image={buzzerImg}
                className={"image--sml bg--white"}
                alt={"Buzzer"}
                zoomAllowed={true}
                caption="Buzzer"
            />
            <h3>Protocols</h3>
            <p>
                We will use WiFi to connect our devices to the network, as it
                may cover sufficient area (using 2.5GHz may reach about 50
                meters). Alternatively, GSM cellular connection may be used for
                longer distances, which is not essential for our prototype
                implementation. We will use HTTPS for secure communication with
                our backend server, and our RESTful NodeJS API will listen to
                the HTTP requests. In exchange, every request will return a
                response in JSON (JavaScript Object Notation), including errors.
                The benefits of using JSON over plain text requests are that it
                is well structured, ready to use after parsing, and
                platform-independent. Additionally, Restful APIs offer a
                standardised way of communicating with our server using simple
                HTML verbs (methods).
            </p>
            <p>
                Our server has to be able to send notification emails to our
                clients, so we will use SMTP to send our emails using NodeMailer
                (naturally, our client will use POP3 to retrieve our emails).
                Lastly, internal Arduino components may use protocols abstracted
                by libraries, like DHT22 uses I2C communication.
            </p>
            <Figure
                image={protocolsImg}
                className={"image--lrg bg--white"}
                alt={"Protocols"}
                zoomAllowed={true}
                caption="Protocols"
            />
            <h3>Design</h3>
            <p>
                In our scenario, the design must be approached from multiple
                angles, as the project incorporates the IoT device's physical
                arrangement, communication to the server, and a software
                platform. Our main goal is for users to read specific device
                values in person or online and for the service team to monitor
                device activity through the application to make decisions about
                maintenance.
            </p>
            <Figure
                image={useCaseImg}
                className={"image--lrg bg--white"}
                alt={"Use Case Diagram"}
                zoomAllowed={true}
                caption="Use Case Diagram"
            />
            <p>
                The prototype will not include login procedures as we have one
                device; however, in the commercial product, we must ensure that
                users can access only their data while the maintenance team can
                read all devices' information.
            </p>
            <p>
                When the device is on, it continuously reads the elapsed time
                and sends reports to our API if a WiFi connection is available.
                Our backend will check the reported values, and if any of them
                is out of the minimum acceptable range, our user (or maintenance
                team) will receive an alert email.
            </p>
            <Figure
                image={sequenceImg}
                className={"image--lrg bg--white"}
                alt={"Sequence Diagram"}
                zoomAllowed={true}
                caption="Sequence Diagram"
            />
            <p>
                Our IoT device has four main steps to achieve a successful
                reporting functionality. First, we boot our device by loading
                saved settings, initialising our pin layout and connecting to
                WiFi. Then, the main loop only checks the elapsed time and calls
                a reporting procedure. At the same time, the LCD and the
                connection/report LEDs continuously inform the user about the
                ongoing processes.
            </p>
            <Figure
                image={activityImg}
                className={"image--lrg bg--white"}
                alt={"Activity Diagram"}
                zoomAllowed={true}
                caption="Activity Diagram"
            />
            <p>
                As most of our sensors work with analogue pins, we have just
                enough digital pins to accommodate our LCD, LEDs and buttons
                without additional support. The electrical layout of the device
                can be divided into four different units: the microcontroller,
                control panel components with LEDs and input buttons, outputs,
                such as LCD and speaker, and sensors.
            </p>
            <Figure
                image={electricDesignImg}
                className={"image--lrg bg--white"}
                alt={"Electric Design"}
                zoomAllowed={true}
                caption="Electric Design"
            />
            <h3>Modelling</h3>
            {/* <Code
                fileName="validateDate.tsx"
                language="arduino"
                content={codeSnippets.dateOverFlow}
            /> */}
        </Article>
    );
};

export default GreenRooftop;
