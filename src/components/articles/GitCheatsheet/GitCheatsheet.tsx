// Components
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";
import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

// Images
import TreeImg from "../../../assets/images/blog/git_cheatsheet/tree.jpg";

// Other Assets
import codeSnippets from "./codeSnippets";
import { getReferenceList } from "../references";

interface Props {
    pageName: string;
    path: string;
}

const GitCheatsheet = ({ pageName, path }: Props) => {
    const references = getReferenceList(path);
    return (
        <Article pageName={pageName} path={path} title="Git Cheat Sheet">
            <h1>Git Cheat Sheet</h1>
            <Figure
                image={TreeImg}
                className={"image--med bg--white"}
                alt={"Tree"}
                zoomAllowed={false}
                caption="Cover - Black Withered Tree"
                reference={references[0]}
            />
            <p>
                Before the advent of Version Control Systems (VCS), the
                traditional method involved the laborious practice of manually
                saving complete project copies in assorted folders (a common
                occurrence prior to Git's introduction in 2005). This approach
                quickly became impractical, particularly when multiple
                individuals collaborated on a single project, necessitating the
                manual exchange and integration of changes.
            </p>
            <h3>What is Git</h3>
            <p>
                Git stands as the most widely embraced version control system
                globally. Version control systems are designed to track the
                changes in our code across time and maintain a dedicated
                database about the changes in a so-called repository. Within
                this repository, we gain insight into the historical evolution
                of our projects, identifying the contributors behind each
                modification, along with the timing and rationale for those
                adjustments. Furthermore, in the event of an error, we can
                restore our project to a prior state.
            </p>
            <h3>Categories of Version Systems</h3>
            <p>
                <strong>Centralised: </strong>In a centralised version control
                system, every team member relies on a central server to access
                the most recent project copy and to exchange modifications.
                Systems like Subversion and Microsoft Team Foundation Server are
                examples of this approach. However, this centralised model poses
                a notable vulnerability: if the server experiences downtime,
                collaborative work comes to a halt until the server is
                operational once more.
                <br />
                <strong>Distributed: </strong>In a distributed system, each team
                member maintains a local copy of the project on their own
                machine, allowing them to save snapshots of the project
                independently. Git and Mercurial are examples of distributed
                version control systems. Git, in particular, is both free and
                open source, boasting exceptional speed and scalability.
            </p>
            <h3>Installing Git</h3>
            <p>
                Firstly, we can check if we have Git installed on our machine by
                viewing the current version:
            </p>
            <Code
                fileName="Check Version"
                language="powershell"
                content={codeSnippets.checkVersion}
            />
            <p>
                You can download the latest version of Git on
                <InlineReference reference={references[1]} />
            </p>
            <h3>Git Bash</h3>
            <p>
                The Bourne shell is the original Unix shell -- command execution
                program, often called a command interpreter -- that was
                developed in 1979 at what at the time was Bell Labs. Named for
                its developer, English computer scientist Stephen Bourne, the
                Bourne shell is also known by its program name, sh.
                <InlineReference reference={references[2]} />
            </p>
            <p>
                Git Bash is a command-line interface (CLI) for Git that allows
                you to interact with Git and execute Git commands in a Unix-like
                terminal environment on Windows. While you can use Git through
                graphical user interfaces (GUIs) or directly in the Windows
                Command Prompt, having Git Bash provides several advantages:
                <br />
                <strong>Consistency: </strong>Git Bash provides a consistent and
                Unix-like command-line environment, which is more familiar to
                developers who work in Unix-based systems (Linux or macOS). This
                consistency is especially valuable if you switch between Windows
                and other platforms.
                <br />
                <strong>Access to Unix Commands: </strong>In addition to Git
                commands, Git Bash gives you access to a variety of Unix
                commands, such as ls, grep, find, and others, which can be
                beneficial for tasks beyond version control.
                <br />
                <strong>Flexibility: </strong>Git Bash (Bourne Again Shell)
                allows you to work with Git in a way that may be more efficient
                for your specific needs. You can use Git commands directly in
                the terminal without relying on a GUI. While Git Bash is a
                valuable tool, it's important to note that you can use Git
                through other interfaces, including GUI clients like GitKraken,
                SourceTree, and GitHub Desktop.
            </p>
            <h3>Git Configurations</h3>
            <p>
                Git configuration has three levels: system (system-wide
                settings), global (user-specific settings), and local
                (repository-specific settings). Local configurations take
                precedence over global and system configurations. In Git, you
                can configure various settings, including your identity (name
                and email), core behaviour, custom commands, remote repository
                details, and more. These configurations allow you to customize
                your Git workflow and behaviour to suit your specific needs and
                preferences.
            </p>
            <Code
                fileName="Configure Global User Name"
                language="powershell"
                content={codeSnippets.configUserName}
            />
            <p>
                Beware that the double quote is necessary, as the name contains
                white space. Also, a single dash means that the following flags
                are single-character only and generally means that more than one
                flag can be passed. In contrast, the double dash connotes a
                single positional flag argument to a command line tool.
                <br />
                Alternatively, we can open the settings (a gitconfig) file with
                our default code editor:
            </p>
            <Code
                fileName=".gitconfig"
                language="powershell"
                content={codeSnippets.openConfig}
            />
            <p>
                The "Auto Carriage Return Line Feed" property, often called
                autocrlf in Git, handles line endings in text files, as Windows
                handles line feeds differently than Linux and macOS. Windows
                prefixes carriage return before line feeds (/R/N versus /N). For
                Windows:
            </p>
            <Code
                fileName="Windows Configuration"
                language="powershell"
                content={codeSnippets.lineFeedWin}
            />
            <p>For everything else:</p>
            <Code
                fileName="Linux Configuration"
                language="powershell"
                content={codeSnippets.lineFeedUnix}
            />
        </Article>
    );
};

export default GitCheatsheet;
