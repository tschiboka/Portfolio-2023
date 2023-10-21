// Components
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";
import InlineReference from "../../sharedComponents/InlineReference/InlineReference";

// Images
import TreeImg from "../../../assets/images/blog/git_cheatsheet/tree.jpg";
import centralisedVsDistributedImg from "../../../assets/images/blog/git_cheatsheet/centrallised-distributed-version-control.png";
import GitStorage1Img from "../../../assets/images/blog/git_cheatsheet/git-storage-1.png";
import GitStorage2Img from "../../../assets/images/blog/git_cheatsheet/git-storage-2.png";
import SnapshotVsDeltaImg from "../../../assets/images/blog/git_cheatsheet/snapshot-vs-delta.jpeg";

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
            <Figure
                image={centralisedVsDistributedImg}
                className={"image--lg bg--white"}
                alt={"Centralised versus Distributed Version Control"}
                zoomAllowed={true}
                caption="Centralised versus Distributed Version Control"
                reference={references[3]}
            />
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
                details, and more. These configurations allow you to customise
                your Git workflow and behaviour to suit your specific needs and
                preferences.
            </p>
            <Code
                fileName="Configure Global User Name"
                language="powershell"
                content={codeSnippets.configUserName}
            />
            <p>
                Beware that the double quote is necessary if the name contains
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

            <h3>Initialising Repositories</h3>
            <p>
                First, we must create a folder for our new project and enter the
                new folder. Then, we must initialise our repository:
            </p>
            <Code
                fileName="Initialise Repository"
                language="powershell"
                content={codeSnippets.initialiseRepo}
            />
            <p>
                The command line will return with the full path of our
                initialised repository and its folder. This directory will
                contain one subfolder called .git/, which is a hidden folder by
                default, as users should not directly modify this folder. If we
                want to see this folder, the traditional LS command will not
                show it, and we need to use LS -A (for Linux) or DIR /A (for
                Windows) to list all items, including hidden ones. We can use
                OPEN (for Linux) or START (for Windows) commands to open the
                folder from the bash terminal.
            </p>
            <Code
                fileName="List Hidden Folder Items"
                language="powershell"
                content={codeSnippets.listAll}
            />
            <p>
                This folder contains all the information and metadata that Git
                needs to manage the repository and track changes in the project.
                This folder contains all the information and metadata that Git
                needs to control the repository, such as configuration settings,
                object database, logs, staging and descriptions to track changes
                in the project. You'll lose the project history if you corrupt
                or remove this folder.
            </p>
            <h3>How Git Works</h3>
            <p>
                In our daily work, we often make changes to project files, and
                when we reach a point where we want to capture the project's
                state, we create a "commit" in Git. Think of a commit as a
                project snapshot at a specific time. What sets Git apart from
                many other version control systems is the "staging area" or
                "index", an intermediate step where we prepare our changes for
                the next snapshot, deciding what goes into the next commit.
            </p>
            <p>
                So, once we've finished making changes, we add the modified
                files to the staging area, review our changes, and if everything
                looks good, we make a commit. The contents in the staging area
                represent the state of the project just before our latest
                changes. If there are changes we don't want in the next
                snapshot, we can unstage them and commit only what's intended.
                When committing, we also provide a meaningful message describing
                what the snapshot signifies, which is essential for a clear
                project history.
            </p>
            <p>
                A common misconception about Git is that the staging area
                becomes empty after committing changes. In reality, the staging
                area contains the previous version of the project. Similarly,
                when deleting files, we stage this change to reflect it in the
                staging area. Each commit in Git contains a unique identifier, a
                message, date and time information, the author, and a complete
                snapshot of the project's state at that particular moment.
            </p>
            <p>
                Unlike some other version control systems, Git doesn't store
                just the changes that occurred; it retains the full content of
                the project. This allows Git to quickly restore the project to a
                previous snapshot without calculating the changes. For
                efficiency, Git avoids storing identical files multiple times
                and instead references them. Therefore, a snapshot represents a
                commit pointing to a directory structure's content. Git manages
                its data as a series of snapshots, much like a miniature file
                system.
            </p>
            <Figure
                image={GitStorage1Img}
                className={"image--lg bg--white"}
                alt={"Git Storage 1"}
                zoomAllowed={true}
                caption="Git Storage 1"
                reference={references[4]}
            />
            <p>
                Whenever you commit in Git, you're essentially taking a picture
                of your project's current state, capturing all your files and
                storing a reference to that snapshot. To optimise storage, Git
                doesn't re-store unchanged files; it simply links to the
                previously stored, identical files.
            </p>
            <Figure
                image={GitStorage2Img}
                className={"image--lg bg--white"}
                alt={"Git Storage 2"}
                zoomAllowed={true}
                caption="Git Storage 2"
                reference={references[4]}
            />
            <h3>Deltas versus Snapshots</h3>
            <p>
                Snapshot storage involves capturing the complete state of a file
                or system at a specific moment, creating a reference point for
                future changes. While this approach is straightforward and
                efficient, it can lead to substantial storage usage if frequent
                changes occur over time.
            </p>
            <p>
                Delta storage, on the other hand, saves only the changes made to
                a file or system rather than the entire state. Each change is
                stored as a delta or a difference from the previous version, and
                the system's current state is reconstructed by combining all the
                deltas. This method is more efficient in terms of storage space,
                as it only stores the differences between versions but can be
                more complex to implement and manage.
                <InlineReference reference={references[5]} />
            </p>
            <p>
                Consider your bank statement as an analogy: a bank statement
                reflects your current balance rather than tracking every
                transaction. Similarly, a snapshot stores the state of a file or
                system at a specific moment, providing a clear, straightforward
                representation in contrast to cumulative deltas, which record
                every change. Retrieving balances or changes between days is
                more efficient with snapshots because calculating the current
                balance would require us to traverse every account history
                change.
            </p>
            <Figure
                image={SnapshotVsDeltaImg}
                className={"image--lg bg--white"}
                alt={"Snapshot versus Deltas"}
                zoomAllowed={true}
                caption="Snapshot versus Deltas"
                reference={references[5]}
            />

            <h3>Staging</h3>
            <p>
                Let's make some changes to our project using the ECHO command.
                To see the status of the working directory of the staging area,
                we use the GIT STATUS.
            </p>
            <Code
                fileName="Staging"
                language="powershell"
                content={codeSnippets.staging}
            />
            <p>
                The primary function of the git ADD command is to promote
                pending changes in the working directory to the git staging
                area. The staging area is one of Git's more unique features. It
                helps to consider it a buffer between the working directory and
                the project history.
                <InlineReference reference={references[6]} />
            </p>
            <Code
                fileName="Staging"
                language="powershell"
                content={codeSnippets.add}
            />
            <p>
                Since we have added our files to the staging area, modifying any
                file and querying a git status will result in a message where
                the file appears green as a new file already added and red as
                unstaged changes are present in the file.
            </p>
            <Code
                fileName="Staging"
                language="powershell"
                content={codeSnippets.modify}
            />
            <h3>Committing Changes</h3>
            <p>
                Adding commits keeps track of our progress and changes as we
                work. Git considers each commit change point or "save point".
                You can return to a point in the project if you find a bug or
                want to make a change. Note, that you must explicitly tell Git
                which changes you wish to include in a commit before running the
                GIT COMMIT command.
                <InlineReference reference={references[7]} />
                Files won't be automatically included in the next commit unless
                you use the GIT ADD command to mark the desired changes for
                inclusion. Commits are not automatically transferred to the
                remote server as committing saves a new commit object only in
                the local repository. Exchanging commits has to be performed
                manually and explicitly with the GIT FETCH, GIT PULL, or GIT
                PUSH commands.
            </p>
            <Code
                fileName="Commit with Short Message"
                language="powershell"
                content={codeSnippets.commit}
            />
            <p>
                The quickest way to write a git commit is to use the command
                with the -M message flag, enabling us to write a short
                descriptive message under 72 characters. However, for longer and
                more meaningful messages, we can use the GIT COMMIT command
                without the flag and edit our commit in our default code editor.
                The text up to the first blank line in a commit message is
                treated as the commit title, and the rest of the commit is the
                body. The 50/72 rule is a set of standards that are pretty well
                agreed upon in the industry to standardise the format of commit
                messages. 50 is the maximum number of characters of the commit
                title, and 72 is the maximum character length of the commit
                body.
            </p>
            <Code
                fileName="Commit with Long Message"
                language="powershell"
                content={codeSnippets.commitWithVerboseMessage}
            />
            <h3>Commit Best Practices</h3>
            <p>
                <strong>Logical Unit: </strong>
                Each commit should represent a logical unit of work and focus on
                a specific feature, bug fix, or improvement. Avoid committing
                unrelated changes together!
                <br />
                <strong>Meaningful Messages: </strong>
                Write meaningful commit messages. The message should concisely
                describe what the commit does and why it is necessary. A good
                commit message helps others understand the context without
                delving into the code.
                <br />
                <strong>Separation of Concerns: </strong>
                Keep code formatting and style changes separate from functional
                code changes. It's a good practice to have dedicated commits for
                formatting improvements.
                <br />
                <strong>Conciseness: </strong>
                Long messages can be hard to read. Keep messages concise and to
                the point while providing enough information to understand the
                purpose of the change.
                <br />
                <strong>Imperative Sentences: </strong>
                Write commit messages in the imperative mood, as if you're
                giving a command. For example, "Fix a bug" or "Add a new
                feature." This convention is widely accepted and helps maintain
                consistency.
                <br />
                <strong>Test Before Commit: </strong>
                Always run tests and ensure that the code compiles without
                errors before committing to reduce the likelihood of breaking
                the build.
            </p>
        </Article>
    );
};

export default GitCheatsheet;
