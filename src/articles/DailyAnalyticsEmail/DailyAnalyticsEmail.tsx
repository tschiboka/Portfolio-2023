import Article from '../../components/sharedComponents/Article/Article'
import InlineReference from '../../components/sharedComponents/InlineReference/InlineReference'
import { Code, CodeText, Heading, List, Paragraph, Section } from '@common/ux'
import codeSnippets from './codeSnippets'
import { getReferenceList } from '../references'

interface Props {
    pageName: string
    path: string
}

const DailyAnalyticsEmail = ({ pageName, path }: Props) => {
    const references = getReferenceList(path)
    return (
        <Article
            pageName={pageName}
            path={path}
            title="Building a Scheduled Analytics Pipeline"
            hasContentNavigator
        >
            <Section>
                <Heading as="h1">Building a Scheduled Analytics Pipeline</Heading>
                <Paragraph>
                    I recently added a daily analytics report to my portfolio website. Every night I
                    receive an email containing daily visits, daily likes, total visits, total
                    likes, and per-page breakdowns. The implementation itself was fairly
                    straightforward. The interesting part was the collection of production issues I
                    encountered along the way. This article covers both the implementation and the
                    pitfalls I discovered.
                </Paragraph>
                <Heading as="h2">Architecture</Heading>
                <Paragraph>The final solution consists of four components:</Paragraph>
                <Paragraph>
                    <CodeText>
                        Portfolio Website → MongoDB → Express Scheduled Endpoint → Resend → Gmail
                    </CodeText>
                </Paragraph>
                <Paragraph>
                    A cron job triggers a protected API endpoint once per day. The endpoint queries
                    MongoDB, builds an HTML report, and sends it via Resend.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Step 1: Create a Scheduled Endpoint</Heading>
                <Paragraph>
                    A dedicated route is responsible for generating the report. The endpoint reads
                    visit statistics, reads like statistics, creates a breakdown by path, builds an
                    HTML email, and sends it via Resend.
                </Paragraph>
                <Code
                    fileName="server/routes/schedule.ts"
                    language="typescript"
                    content={codeSnippets.routeEndpoint}
                />
                <Paragraph>
                    Initially I exposed this endpoint publicly. Later I realised anyone could
                    trigger report generation manually.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Step 2: Protect the Endpoint</Heading>
                <Paragraph>
                    The simplest solution is a shared secret. Store a secret in your environment:
                </Paragraph>
                <Paragraph>
                    <CodeText>CRON_SECRET=your-long-random-secret</CodeText>
                </Paragraph>
                <Paragraph>
                    Configure your cron provider to send{' '}
                    <CodeText>X-Cron-Secret: your-long-random-secret</CodeText>, then validate it
                    before running the report:
                </Paragraph>
                <Code
                    fileName="server/middlewares/cronOrAdminAuth.ts"
                    language="typescript"
                    content={codeSnippets.cronAuthValidation}
                />
                <Paragraph>
                    This is significantly simpler than JWTs or IP allowlists and is perfectly
                    adequate for internal scheduled endpoints.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Step 3: Send Email with Resend</Heading>
                <Paragraph>
                    Originally I used Nodemailer and Gmail SMTP. Locally everything worked.
                    Production immediately failed.
                </Paragraph>
                <Heading as="h3">Pitfall #1: SMTP Ports May Be Blocked</Heading>
                <Paragraph>
                    Render free instances blocked outbound SMTP traffic. Attempts using ports{' '}
                    <CodeText>465</CodeText> and <CodeText>587</CodeText> both failed. The solution
                    was moving to Resend, which uses HTTPS over port <CodeText>443</CodeText>. No
                    SMTP configuration required.
                    <InlineReference reference={references[0]} />
                </Paragraph>
                <Code
                    fileName="sendEmail.ts"
                    language="typescript"
                    content={codeSnippets.sendWithResend}
                />
            </Section>
            <Section>
                <Heading as="h2">Step 4: Verify Your Domain</Heading>
                <Paragraph>
                    Resend provides a default sender: <CodeText>onboarding@resend.dev</CodeText>.
                    Technically it works. In practice my emails never appeared in Gmail. Resend
                    marked them as sent. Gmail never delivered them.
                </Paragraph>
                <Heading as="h3">Pitfall #2: Sent Does Not Mean Delivered</Heading>
                <Paragraph>
                    The fix was verifying my own domain — <CodeText>tschiboka.com</CodeText> — and
                    switching to <CodeText>reports@tschiboka.com</CodeText>. After that,
                    deliverability improved immediately. If you're building production emails,
                    verify your domain from the start.
                    <InlineReference reference={references[4]} />
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Step 5: Don't Swallow Errors</Heading>
                <Paragraph>
                    One of the most frustrating bugs was entirely self-inflicted. My email helper
                    looked roughly like this:
                </Paragraph>
                <Code
                    fileName="bad-pattern.ts"
                    language="typescript"
                    content={codeSnippets.silentFail}
                />
                <Paragraph>
                    Since the helper returned errors instead of throwing them, the outer function
                    always reported success.
                </Paragraph>
                <Heading as="h3">Pitfall #3: Silent Failures</Heading>
                <Paragraph>
                    If a function cannot complete its responsibility, it should throw. The caller
                    decides how to handle the failure.
                </Paragraph>
                <Code
                    fileName="good-pattern.ts"
                    language="typescript"
                    content={codeSnippets.throwInstead}
                />
                <Paragraph>
                    This single bug cost more debugging time than the email implementation itself.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Step 6: Render Cold Starts</Heading>
                <Paragraph>
                    The biggest surprise came after everything appeared to work. The cron provider
                    still reported failures.
                </Paragraph>
                <Paragraph>
                    The reason was Render's free tier. Free services spin down after inactivity.
                    <InlineReference reference={references[1]} />
                    When the daily job fired, Render was still waking up while the 30-second
                    scheduler timeout was already counting down.
                </Paragraph>
                <Heading as="h3">Pitfall #4: Scheduler Timeout vs Cold Start</Heading>
                <Paragraph>
                    My cron provider had a maximum timeout of 30 seconds. Render can take
                    significantly longer than that to wake up. The solution was adding a warm-up
                    request:
                </Paragraph>
                <Code
                    fileName="warm-up-strategy"
                    language="text"
                    content={codeSnippets.warmUpStrategy}
                />
                <Paragraph>
                    The first request wakes the service. The second performs the work. This
                    completely eliminated timeout failures without upgrading the hosting plan.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Step 7: Avoid Duplicate Sends</Heading>
                <Paragraph>
                    One concern with warm-up requests is accidentally triggering the report twice.
                    The solution is simple: create a lightweight <CodeText>GET /health</CodeText>{' '}
                    endpoint and use that for waking the service. Never warm up by calling the
                    report endpoint itself.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Step 8: Think About Scale Early</Heading>
                <Paragraph>
                    My initial implementation loaded every document with{' '}
                    <CodeText>const visits = await Visit.find()</CodeText> and performed aggregation
                    in Node.js.
                </Paragraph>
                <Code
                    fileName="scaling.ts"
                    language="typescript"
                    content={codeSnippets.inefficientQuery}
                />
                <Paragraph>
                    For a portfolio site this is acceptable. For larger datasets it becomes
                    expensive. A better long-term solution is to use MongoDB's aggregation pipeline
                    and eventually store daily summaries directly in MongoDB.
                    <InlineReference reference={references[2]} />
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">The Full Implementation</Heading>
                <Paragraph>
                    Putting it all together, the core function queries both today's breakdowns and
                    historical aggregates, builds a report, and sends it:
                </Paragraph>
                <Code
                    fileName="server/cron/emails/breakdown/breakdown.ts"
                    language="typescript"
                    content={codeSnippets.breakdownFunction}
                />
            </Section>
            <Section>
                <Heading as="h2">Lessons Learned</Heading>
                <Paragraph>
                    The email template was the easy part. Most of the work involved infrastructure
                    limitations, email deliverability, error handling, authentication, cold starts,
                    and scheduler behaviour.
                </Paragraph>
                <Paragraph>
                    The final implementation is only a few hundred lines of code, but the
                    operational lessons were far more valuable than the feature itself.
                </Paragraph>
                <Paragraph>
                    If you're building a similar reporting system on a free stack, pay special
                    attention to:
                </Paragraph>
                <List
                    items={[
                        'Domain verification',
                        'Error propagation',
                        'Endpoint authentication',
                        'Hosting cold starts',
                        'Scheduler timeout limits',
                    ]}
                />
                <Paragraph>Those were responsible for nearly every issue I encountered.</Paragraph>
            </Section>
        </Article>
    )
}

export default DailyAnalyticsEmail
