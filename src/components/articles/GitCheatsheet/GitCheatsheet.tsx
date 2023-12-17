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

// Styles
import "./GitCheatSheet.scss";

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
                we use the GIT STATUS. For shorter, less verbose status results,
                we also can use GIT STATUS -S.
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
            <h3>Skipping Staging</h3>
            <p>
                The primary purpose of the Git staging area (also known as the
                index) is to allow you to review and prepare the changes
                committed to the repository. The staging area serves as an
                intermediate step between your working directory and the Git
                repository. It allows you to select changes (modifications,
                additions, or deletions) from your working directory for
                inclusion in the next commit.{" "}
            </p>
            <p>
                However, if you are confident that the code to be committed does
                not need to be reviewed, you can skip the staging area. Skipping
                the staging area and making commits directly from your working
                directory is a practice often referred to as a "direct commit"
                or a "commit without staging". Skipping the staging area is
                acceptable for minimal, self-contained changes ready to be
                committed without further review. For example, fixing a simple
                typo in a comment.
            </p>
            <p>
                So after changes in the working directory, we use direct commit
                all with a message instead of the ADD command (COMMIT -A -M or
                COMMIT -AM).
            </p>
            <Code
                fileName="Skipping Staging"
                language="powershell"
                content={codeSnippets.skippingStaging}
            />
            <h3>Removing Files</h3>
            <p>
                We can use the RM or DEL commands if we want to remove unwanted
                files in our project. However, it is important to remember that
                even though we removed the file from our working directory, it
                will still be in the staging area. To confirm that, we can list
                our files in the staging area with GIT LS-FILES. When we remove
                files, we need to stage them with ADD command. As a shorthand,
                we can use GIT RM instead of the plain Linux one.
            </p>
            <Code
                fileName="Removing Files"
                language="powershell"
                content={codeSnippets.removeFile}
            />
            <h3>Renaming and Moving Files</h3>
            <p>
                Renaming can be done with the MV “move” command. If we run git
                STATUS, we will see two changes: the file with the previous name
                is deleted, and a new file with the current name is added. As
                Git doesn't automatically track new files, we need to stage
                these changes. Because renaming is a two-step operation, once we
                modify the working directory, which stages both the deletion of
                the old file and the addition of a new file, Git provides its
                own MV function.
            </p>
            <Code
                fileName="Renaming Files"
                language="powershell"
                content={codeSnippets.renameFile}
            />
            <h3>Git Ignore</h3>
            <p>
                For most projects, there will be files and folders that should
                not be included or tracked in the repository. Such files either
                do not add any value to our project or pose a security threat:
                <ul></ul>
                <li>
                    Npm and Yarn: dependencies can be regenerated from the
                    package JSON,
                </li>
                <li>
                    Build and Dist folders: they are compiled from the source
                    code,
                </li>
                <li>Development log files,</li>
                <li>
                    Environment configurations, such as .ENV files, may contain
                    sensitive information, such as API keys and credentials, and
                    exposing them may cause security breaches.
                </li>
            </p>
            <Code
                fileName="Git Ignore"
                language="powershell"
                content={codeSnippets.ignore}
            />
            <p>
                However, if Git has already tracked a file, it won't be able to
                ignore it anymore, and we need to remove it from the staging
                area.
            </p>
            <Code
                fileName="Git Untrack"
                language="powershell"
                content={codeSnippets.untrack}
            />
            <h3>Viewing History and Commits</h3>
            <p>
                Using the GIT LOG, we can list the history of all the commits
                made to the repository. The listed commits are sorted from
                latest to earliest and include the identifier, author and date.
                The git identifier or a Git Commit ID is a unique 40-character
                SHA-hash value generated automatically and assigned to commits
                whenever a new commit is made to the repository. Commit ID is
                used while merging commits or checking out files from different
                commits.
                <InlineReference reference={references[8]} />
                To get a less verbose version of the history, we use the GIT LOG
                with the --ONELINE flag, and to reverse the sorting of the list,
                use the -REVERSE flag.
            </p>
            <Code
                fileName="Git History"
                language="powershell"
                content={codeSnippets.history}
            />
            <p>
                To inspect the changes in a commit, we type the GIT SHOW in the
                terminal with the unique ID of the commit. There is no need to
                type the complete ID. As long as there are no multiple matches,
                the first few characters of the ID can identify a commit.
                Alternatively, to see the last commit, use the HEAD and an
                optional tilde ~ to signify how many steps need to go back.
                Additionally, we can view the whole directory structure using
                the LS-TREE command.
            </p>
            <Code
                fileName="Git Show Commits"
                language="powershell"
                content={codeSnippets.show}
            />
            <p>
                In Git the folders are represented as trees and the files as
                blobs. BLOB is a “Binary Large Object,” a data type that stores
                binary data. Binary Large Objects (BLOBs) can be complex files
                like images or videos, unlike other data strings that only store
                letters and numbers.
                <InlineReference reference={references[9]} />A Git tree object
                creates the hierarchy between files in a Git repository. You can
                use the Git tree object to create the relationship between
                directories and the files they contain. These endpoints allow
                you to read and write tree objects to your Git database on
                GitHub.
            </p>
            <h3>Unstaging and Restoring</h3>
            <p>
                Because every commit should be one logically comprehensible
                unit, sometimes we need to unstage some of the changes we want
                to omit from the next commit. We can undo the ADD operation with
                the RESTORE function.
            </p>
            <Code
                fileName="Git Unstaging"
                language="powershell"
                content={codeSnippets.unstaging}
            />
            <p>
                We can also discard local changes in our working directory with
                the GIT CLEAN command. This action would permanently delete the
                files from our working directory, so we must use the -FORCE and
                optional -D (directories) flags.
            </p>
            <Code
                fileName="Git Clean"
                language="powershell"
                content={codeSnippets.clean}
            />
            <h3>Restoring Previous Versions</h3>
            <p>
                To restore the last commit, list the commits with the GIT LOG
                -ONELINE to see the commit ID, or to restore the last commit,
                use the HEAD~1.
            </p>
            <Code
                fileName="Git Restore"
                language="powershell"
                content={codeSnippets.restoreLast}
            />
        </Article>
    );
};

export default GitCheatsheet;
