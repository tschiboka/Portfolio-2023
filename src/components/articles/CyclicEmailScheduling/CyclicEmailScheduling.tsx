// Components
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";
import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

// Images
import cyclicImg from "../../../assets/images/blog/cyclic_email_scheduling/cyclic.png";
import cronMenuOptionImg from "../../../assets/images/blog/cyclic_email_scheduling/cron_menu_option.png";
import newCronTaskImg from "../../../assets/images/blog/cyclic_email_scheduling/new_cron_task.png";
import editCronTaskImg from "../../../assets/images/blog/cyclic_email_scheduling/edit_cron_task.png";
import cronExpressionSyntaxImg from "../../../assets/images/blog/cyclic_email_scheduling/cron_expression_syntax.png";
import finalisedCronTaskImg from "../../../assets/images/blog/cyclic_email_scheduling/finalised_cron_task.png";

// Other Assets
import codeSnippets from "./codeSnippets";
import { getReferenceList } from "../references";

// Styles
//import "./";

interface Props {
    pageName: string;
    path: string;
}

const CycliecEmailScheduling = ({ pageName, path }: Props) => {
    const references = getReferenceList(path);
    return (
        <Article
            pageName={pageName}
            path={path}
            title="Cyclic Email Scheduling"
        >
            <h1>Sheduling Emails on Cyclic</h1>
            <Figure
                image={cyclicImg}
                className={"image--med bg--white"}
                alt="Cyclic Logo"
                zoomAllowed={false}
            />
            <p>
                Email scheduling is a valuable tool for optimising
                communication. It enables you to send emails conveniently,
                improving productivity and ensuring messages reach their
                audience when they're most likely to engage. Whether for
                follow-ups, marketing campaigns, or avoiding clutter in inboxes,
                it enhances organisation and supports thoughtful, efficient
                communication.
            </p>
            <p>
                In NodeJs, scheduling emails can be done effortlessly using npm
                NodeCron and NodeMailer. <strong>NodeMailer</strong> is a Node
                JS module that allows you to send emails from your server
                easily. It is a zero-dependency module for all Node
                JS-compatible applications. The emails sent can be plain text,
                attachments, or HTML.
                <InlineReference reference={references[0]} />
                Cron is a job scheduling function that allows users to trigger
                specific tasks at designated times. It is a background process
                executing non-interactive jobs.
                <InlineReference reference={references[1]} />
                <strong>NodeCron</strong> is a cron task scheduler for NodeJs
                applications.
            </p>
            <h3>Why NodeCron Doesn't Work on Cyclic?</h3>
            <p>A simple NodeCron solution looks like the following:</p>
            <Code
                fileName="scheduler.js"
                language="javascript"
                content={codeSnippets.nodeCron}
            />
            <p>
                However, NodeCron relies on a continuous server environment to
                run scheduled tasks at specific times or intervals. In
                serverless environments like Cyclic.sh, the server is not
                continuously running; it's event-driven and only executes code
                in response to specific events or triggers. This serverless
                architecture doesn't support traditional cron jobs because
                there's no persistent server to run them. So, serverless means
                applications are only on for the time it takes to process
                individual requests. They are suspended immediately after each
                response is sent.
                <InlineReference reference={references[2]} />
                So, your scheduler will silently fail without any logging or
                error messages.
            </p>
            <h3>The Workaround</h3>
            <p>
                I will present a workaround solution using a simple example
                scenario. Suppose I want to create an email scheduler that
                triggers every midnight and sends an email to a specific email
                address with some essential information, for instance, a daily
                breakdown of website activity statistics. I will use NodeMailer
                for my email-sending function, so let's install it:
            </p>
            <Code
                fileName="Terminal"
                language="powershell"
                content={codeSnippets.nodemailerInstall}
            />
            <p>
                We define a function called sendEmail that sends an email
                message. We then set up the sender's and recipient's email
                addresses, email subject, and the email's content (HTML format
                in this case). We also have to configure the email server
                settings, including authentication and secure communication,
                using TLS, specifically for Gmail in this example. Our sendEmail
                is asynchronous and returns a promise that resolves to
                information about the sent email if successful or an error if
                there's an issue.
            </p>
            <Code
                fileName="sendEmail.js"
                language="javascript"
                content={codeSnippets.sendEmail}
            />
            <p>
                Now that we have an email sender function, we may set up an API
                endpoint to POST emails. However, as I mentioned, this endpoint
                is not automated with NodeJS.
            </p>
            <Code
                fileName="sheduled.js"
                language="javascript"
                content={codeSnippets.route}
            />
            <h3>Set Up a Cron Job on Cyclic</h3>
            <p>
                Now, I assume that you are registered and already have a Git
                Project hosted by Cyclic, but in case you need some help with
                the basic repository deployment, please check out this
                <InlineReference reference={references[3]} />
                link. Go to your project and click the Cron menu option.
            </p>
            <Figure
                image={cronMenuOptionImg}
                className={"image--lrg bg--white"}
                alt="Cron Menu Option"
                zoomAllowed={true}
                caption="Cron Menu Option - Cyclic.sh"
            />
            <p>Create a new cron task:</p>
            <Figure
                image={newCronTaskImg}
                className={"image--lrg bg--white"}
                alt="Create New Cron Task"
                zoomAllowed={true}
                caption="Create New Cron Task - Cyclic.sh"
            />
            <p>
                Set the method to POST and the API endpoint path you defined for
                your email scheduling. You can choose between running once or
                schedule options, so if you want to schedule your emailer for
                daily reports, select the schedule option.
            </p>
            <Figure
                image={editCronTaskImg}
                className={"image--lrg bg--white"}
                alt="Edit Cron Task"
                zoomAllowed={true}
                caption="Edit Cron Task - Cyclic.sh"
            />
            <p>
                Lastly, set the schedule time using cron expressions. Cron
                Expressions are, in most cases, a string of five fields, which
                make up the building blocks of every Cron expression. Each field
                represents a specific time unit, so the different fields
                represent minutes, hours, days of the month, months, and days of
                the week, respectively.
                <InlineReference reference={references[4]} />
            </p>
            <Figure
                image={cronExpressionSyntaxImg}
                className={"image--med bg--white"}
                alt="Cron Expression Syntax"
                zoomAllowed={true}
                caption="Cron Expression Syntax - Cyclic.sh"
            />
            <p>
                To set our schedule to midnight that repeats every day, we can
                use the "0 0 * * *" expression, where the first 0 means the
                minute, the second the hour, and the last three values are left
                as wildcards. After saving the cron job, you should see your
                cron task and the next scheduled run time.
            </p>
            <Figure
                image={finalisedCronTaskImg}
                className={"image--lrg bg--white"}
                alt="Finalised Cron Task"
                zoomAllowed={true}
                caption="Finalised Cron Task - Cyclic.sh"
            />
        </Article>
    );
};

export default CycliecEmailScheduling;
