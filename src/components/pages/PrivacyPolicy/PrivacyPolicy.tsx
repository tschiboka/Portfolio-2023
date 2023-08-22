import Nav from "../../sharedComponents/Nav/Nav";
import SubNav from "../../sharedComponents/SubNav/SubNav";
import Menu from "../../sharedComponents/Menu/Menu";
import Footer from "../../sharedComponents/Footer/Footer";
import Page from "../../sharedComponents/Page/Page";
import { useAppContext } from "../../../context/AppContext";
import "./PrivacyPolicy.scss";

interface Props {
    pageName: string;
    path: string;
}

const PrivacyPolicy = ({ pageName, path }: Props) => {
    const { mobileMenuVisible, subMenuVisible } = useAppContext();
    return (
        <Page title="Tivadar Debnar | Privacy Policy" path={path}>
            <Nav pageName={pageName} />
            {subMenuVisible && <SubNav />}
            {mobileMenuVisible && <Menu pageName="PrivacyPolicy" />}
            <main className="privacy-policy">
                <p>
                    <span className="updated-date">
                        Last updated: <time>18.07.2023</time>
                    </span>
                </p>
                <h2>Thank you for visiting tshciboka.co.uk.</h2>
                <p>
                    This Privacy Policy outlines how we collect, use, and
                    protect your personal information when you use our website.
                </p>
                <h2>Information Collection and Use</h2>
                <p>
                    We may collect personal information such as your name, email
                    address, and other contact details when you voluntarily
                    submit them through our contact form or newsletter
                    subscription. We use this information solely to respond to
                    your inquiries and provide you with relevant updates if you
                    have opted to receive our newsletters.
                </p>
                <h2>Cookies and Tracking Technologies</h2>
                <p>
                    Our website may use cookies and similar tracking
                    technologies to enhance your browsing experience. Cookies
                    are small data files stored on your device that help us
                    improve website performance and understand user behavior.
                    You can control the use of cookies through your browser
                    settings.
                </p>
                <h2>Third-Party Services</h2>
                <p>
                    We may use third-party services for analytics and
                    advertising purposes, such as Google Analytics. These
                    services may collect information about your use of our
                    website to improve their services and provide targeted
                    advertisements.
                </p>
                <h2>Data Security</h2>
                <p>
                    We take reasonable measures to protect your personal
                    information from unauthorized access or disclosure. However,
                    please note that no method of data transmission over the
                    internet or electronic storage is entirely secure.
                </p>
                <h2>Links to External Sites</h2>
                <p>
                    Our website may contain links to external sites that are not
                    operated by us. We are not responsible for the content or
                    privacy practices of these third-party sites. We encourage
                    you to review their respective privacy policies.
                </p>
                <h2>Changes</h2>{" "}
                <p>
                    We may update this Privacy Policy from time to time. Any
                    changes will be posted on this page, and the "Last updated"
                    date will be revised accordingly. Contact Us: If you have
                    any questions or concerns about this Privacy Policy, please
                    contact us at{" "}
                    <a href="mailto:dev@tschiboka.co.uk">dev@tschiboka.co.uk</a>{" "}
                    or{" "}
                    <a href="mailto:tibi.aki.tivadar@gmail.com">
                        tibi.aki.tivadar@gmail.com
                    </a>
                    . By using our website, you consent to the terms outlined in
                    this Privacy Policy.
                </p>
            </main>
            <Footer path={path} />
        </Page>
    );
};

export default PrivacyPolicy;
