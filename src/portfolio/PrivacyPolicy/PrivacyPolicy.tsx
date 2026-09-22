import { PageSideMenu } from '@shared-components/PageSideMenu/PageSideMenu'
import { Screen } from '@shared-components/Screen/Screen'
import { Link, Main, Paragraph, Heading } from '@common-ux'
import './PrivacyPolicy.scss'

interface Props {
    pageName: string
    path: string
}

export const PrivacyPolicy = ({ pageName, path }: Props) => {
    return (
        <Screen
            title="tschiboka | Privacy Policy"
            path={path}
            variant="portfolio"
            pageName={pageName}
            sideMenu={<PageSideMenu />}
        >
            <Main className="privacy-policy">
                <Paragraph>
                    <span className="updated-date">
                        Last updated: <time>18.07.2023</time>
                    </span>
                </Paragraph>
                <Heading>Thank you for visiting tshciboka.co.uk.</Heading>
                <Paragraph>
                    This Privacy Policy outlines how we collect, use, and protect your personal
                    information when you use our website.
                </Paragraph>
                <Heading>Information Collection and Use</Heading>
                <Paragraph>
                    We may collect personal information such as your name, email address, and other
                    contact details when you voluntarily submit them through our contact form or
                    newsletter subscription. We use this information solely to respond to your
                    inquiries and provide you with relevant updates if you have opted to receive our
                    newsletters.
                </Paragraph>
                <Heading>Cookies and Tracking Technologies</Heading>
                <Paragraph>
                    Our website may use cookies and similar tracking technologies to enhance your
                    browsing experience. Cookies are small data files stored on your device that
                    help us improve website performance and understand user behavior. You can
                    control the use of cookies through your browser settings.
                </Paragraph>
                <Heading>Third-Party Services</Heading>
                <Paragraph>
                    We may use third-party services for analytics and advertising purposes, such as
                    Google Analytics. These services may collect information about your use of our
                    website to improve their services and provide targeted advertisements.
                </Paragraph>
                <Heading>Data Security</Heading>
                <Paragraph>
                    We take reasonable measures to protect your personal information from
                    unauthorized access or disclosure. However, please note that no method of data
                    transmission over the internet or electronic storage is entirely secure.
                </Paragraph>
                <Heading>Links to External Sites</Heading>
                <Paragraph>
                    Our website may contain links to external sites that are not operated by us. We
                    are not responsible for the content or privacy practices of these third-party
                    sites. We encourage you to review their respective privacy policies.
                </Paragraph>
                <Heading>Changes</Heading>{' '}
                <Paragraph>
                    We may update this Privacy Policy from time to time. Any changes will be posted
                    on this page, and the "Last updated" date will be revised accordingly. Contact
                    Us: If you have any questions or concerns about this Privacy Policy, please
                    contact us at{' '}
                    <Link href="mailto:tibi.aki.tivadar@gmail.com">tibi.aki.tivadar@gmail.com</Link>{' '}
                    or{' '}
                    <Link href="mailto:tibi.aki.tivadar@gmail.com">tibi.aki.tivadar@gmail.com</Link>
                    . By using our website, you consent to the terms outlined in this Privacy
                    Policy.
                </Paragraph>
            </Main>
        </Screen>
    )
}
