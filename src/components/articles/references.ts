import { Reference } from "../sharedComponents/References/References";

const references: Record<string, Reference[]> = {
    "/blog/riffmaster": [
        {
            title: "Keyboard Matrix, 2000",
            author: "Dribin",
            source: "https://www.dribin.org/dave/keyboard/one_html/",
        },
        {
            title: "Exploring the Raspberry Pi 2 with C++. Springer, 2015",
            author: "Warren",
            source: "https://link.springer.com/book/10.1007/978-1-4842-1739-9",
        },
        {
            title: "Gibson Les Paul Guitar Templates",
            author: "Electric Herald",
            source: "https://www.electricherald.com/gibson-les-paul-guitar-templates/",
        },
    ],
    "/blog/sounds-with-howler": [
        {
            title: "Howler Documentation",
            author: "Howler",
            source: "https://howlerjs.com/",
        },
        {
            title: "Splice Audio Library",
            author: "Splice",
            source: "https://splice.com/features/sounds",
        },
        {
            title: "MixKit Audio Library",
            author: "MixKit",
            source: "https://mixkit.co/free-sound-effects/guitar/",
        },
        {
            title: "Tschiboka Audio Library",
            author: "Tschiboka",
            source: "https://tschiboka.co.uk/files/guitar-sounds/guitar-sounds.zip",
        },
        {
            title: "Howler GitHub Documentation",
            author: "Howler",
            source: "https://github.com/goldfire/howler.js#options",
        },
        {
            title: "Autoplay Policy in Chrome",
            author: "Chrome",
            source: "https://developer.chrome.com/blog/autoplay/",
        },
        {
            title: "Calculating Fret Distances",
            author: "Build Your Guitar",
            source: "http://www.buildyourguitar.com/resources/tips/fretdist.htm",
        },
    ],
    "/blog/js-date-validation": [
        {
            title: "Set Date Property Values",
            author: "MND",
            source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate#syntax",
        },
        {
            title: "Calculating Leap Years",
            author: "CueMath",
            source: "https://www.cuemath.com/calculators/leap-year-calculator/",
        },
    ],
    "/blog/js-sorting": [
        {
            title: "Array Prototype Sort",
            author: "MDN",
            source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
        },
        {
            title: "Using JavaScript's sort Method for Sorting Arrays of Strings",
            author: "Adebiyi Adedotun",
            source: "https://www.digitalocean.com/community/tutorials/js-array-sort-strings",
        },
        {
            title: "An Introduction to the JavaScript Array Sort Method",
            author: "Athena Ozanich",
            source: "https://blog.hubspot.com/website/sorting-javascript",
        },
        {
            title: "Array Prototype Sort",
            author: "ECMAScript Language Specification",
            source: "https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.sort",
        },
        {
            title: "String Prototype localeCompare()",
            author: "MND",
            source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare",
        },
        {
            title: "Intl.Collator() Constructor",
            author: "MND",
            source: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options",
        },
        {
            title: "Getting Things Sorted in V8",
            author: "Simon Zünd",
            source: "https://v8.dev/blog/array-sort",
        },
        {
            title: "Stable and Unstable Sorting Algorithms",
            author: "GeeksForGeeks",
            source: "https://www.geeksforgeeks.org/stable-and-unstable-sorting-algorithms/",
        },
        {
            title: "Sorting Algorithm Complexity Cheatsheet",
            author: "BigOCheatSheet",
            source: "https://www.bigocheatsheet.com/",
        },
        {
            title: "Medium - The Case for Timsort",
            author: "Richard Sheive",
            source: "https://medium.com/@rscheiwe/the-case-for-timsort-349d5ce1e414",
        },
    ],
    "/blog/green-rooftop": [
        {
            title: "Harnessing the Fourth Industrial Revolution for Sustainable Development",
            author: "WEF",
            source: "https://www3.weforum.org/docs/WEF_Harnessing_the_4IR_for_Sustainable_Emerging_Cities.pdf",
        },
        {
            title: "Arduino Rev 2 WiFi Spec",
            author: "Arduino",
            source: "https://store.arduino.cc/products/arduino-uno-wifi-rev2",
        },
        {
            title: "Grove Moisture Sensor",
            author: "Seeed",
            source: "https://www.seeedstudio.com/Grove-Moisture-Sensor.html",
        },
    ],
    "/blog/cyclic-email-scheduling": [
        {
            title: "NodeMailer Tutorial: Sending an Email Using NodeMailer 101",
            author: "Turing",
            source: "https://www.turing.com/kb/comprehensive-guide-to-sending-an-email-using-nodemailer",
        },
        {
            title: "How to run scheduled tasks with node-cron",
            author: "Airplane.dev",
            source: "https://www.airplane.dev/blog/how-to-run-scheduled-tasks-with-node-cron",
        },
        {
            title: "Serverless / On Demand",
            author: "Cyclic.sh",
            source: "https://docs.cyclic.sh/serverless/on-demand",
        },
        {
            title: "Cyclic / Deployment",
            author: "Cyclic.sh",
            source: "https://docs.cyclic.sh/overview/deploy",
        },
        {
            title: "The Complete Guide to Cron Expressions",
            author: "CronToGo",
            source: "https://crontogo.com/blog/the-complete-guide-to-cron/",
        },
    ], "/blog/brief-react-anatomy": [
        {
            title: "Difference Between Framework and Library",
            author: "Sencha",
            source: "https://www.sencha.com/blog/difference-between-framework-vs-library-snc/",
        },
        {
            title: "What is the Virtual DOM in React",
            author: "LogRocket",
            source: "https://blog.logrocket.com/virtual-dom-react/",
        },
        {
            title: "What is the DOM",
            author: "W3",
            source: "https://www.w3.org/TR/REC-DOM-Level-1/introduction.html",
        },
        {
            title: "Virtual DOM and Internals",
            author: "ReactJs",
            source: "https://legacy.reactjs.org/docs/faq-internals.html",
        },
        {
            title: "What is the Virtual DOM in React",
            author: "Altogic",
            source: "https://www.altogic.com/blog/what-is-the-virtual-dom-in-react-and-how-does-it-work",
        },
        {
            title: "React Reconciliation Algorithm",
            author: "Medium",
            source: "https://medium.com/javarevisited/react-reconciliation-algorithm-86e3e22c1b40",
        },
        {
            title: "Why React Stopped Using Stack Reconcilier",
            author: "Dev",
            source: "https://dev.to/thepurplecoder/why-react-stopped-using-stack-reconciler-blog-2-171p",
        },
        {
            title: "Fiber Child and Sibling",
            author: "JSPlainEnglish",
            source: "https://javascript.plainenglish.io/understand-react-design-principles-af0051e272c3",
        },
        {
            title: "Use Automatic Batching in React to Optimize State Updates",
            author: "Shevchuk, V.",
            source: "https://itnext.io/use-automatic-batching-in-react-to-optimize-state-updates-4829f1156b2f",
        },
        {
            title: "React Batching",
            author: "Wieruch, R.",
            source: "https://www.robinwieruch.de/react-batching/",
        },
        {
            title: "JSX in Depth",
            author: "React",
            source: "https://legacy.reactjs.org/docs/jsx-in-depth.html",
        },
        {
            title: "React Hooks Fundamentals for Beginners",
            author: "Adhikary, T.",
            source: "https://www.freecodecamp.org/news/react-hooks-fundamentals/",
        },
        {
            title: "Intro to React Component Lifecycle",
            author: "Cruz, R.",
            source: "https://medium.com/@ralph1786/intro-to-react-component-lifecycle-ac52bf6340c",
        },
        {
            title: "React: An Overview about SyntheticEvent",
            author: "Britto, V.",
            source: "https://medium.com/@vitorbritto/react-an-overview-about-syntheticevent-d3a6d35295f1",
        },
        {
            title: "React useCallback Hook",
            author: "W3School",
            source: "https://www.w3schools.com/react/react_usecallback.asp",
        },
        {
            title: "How to Use the React Context API in Your Projects",
            author: "Boateng, D.",
            source: "https://www.freecodecamp.org/news/context-api-in-react/",
        },
    ],
    "/blog/git-cheatsheet": [
        {
            title: "Intro Image: Black Withered Tree",
            author: "Kyle Roxas",
            source: "https://www.pexels.com/photo/black-withered-tree-surounded-by-body-of-water-2138922/",
        },
        {
            title: "Git Downloads",
            author: "Git",
            source: "https://git-scm.com/downloads",
        },
        {
            title: "Bourne Shell",
            author: "Gillis, S.",
            source: "https://www.techtarget.com/searchdatacenter/definition/Bourne-shell",
        },
        {
            title: "Centralised versus Distributed Version Control",
            author: "Feist, S.",
            source: "https://www.researchgate.net/publication/316553817_Collaborative_Algorithmic-based_Building_Information_Modelling",
        },
        {
            title: "Git Basics - Software Carpentry",
            author: "Nicercode",
            source: "http://nicercode.github.io/2014-02-13-UNSW/lessons/70-version-control/basics.html",
        },
        {
            title: "How Snapshot and Delta Storage Differs",
            author: "Määttä, A.",
            source: "https://blog.git-init.com/snapshot-vs-delta-storage/",
        },
        {
            title: "Git Add",
            author: "Atlassian",
            source: "https://www.atlassian.com/git/tutorials/saving-changes",
        },
        {
            title: "Git Commit",
            author: "GitTower",
            source: "https://www.git-tower.com/learn/git/commands/git-commit",
        },
        {
            title: "What is a Git Commit ID?",
            author: "Hameed, S.",
            source: "https://linuxhint.com/what-is-git-commit-id/#b2",
        },
        {
            title: "What is a BLOB (Binary Large Object)?",
            author: "Burchfiel, A.",
            source: "https://www.tokenex.com/blog/ab-what-is-a-blob-binary-large-object-can-it-be-tokenized/",
        },
    ],
    "/blog/maybe": [
        {
            title: "Cover Image: Houses of Parliament",
            author: "Monet",
            source: "https://www.gazette-drouot.com/en/article/art-market-overview-3A-the-invincible-claude-monet/38930",
        },
        {
            title: "Monet.js Git Documentation",
            author: "Monet.js",
            source: "https://github.com/monet/monet.js/blob/develop/docs/MAYBE.md",
        },
        {
            title: "Why Funtional Programming Should be the Future of Development",
            author: "Spectrum",
            source: "https://spectrum.ieee.org/functional-programming",
        },
        {
            title: "Functors in JavaScript",
            author: "Levelup",
            source: "https://levelup.gitconnected.com/functors-in-javascript-5f3483ad0e13#:~:text=Jan%2022%2C%202023,a%20function%20to%20that%20value",
        },
        {
            title: "Functional Programming in JS: Functor - Monad's little brother",
            author: "dev",
            source: "https://dev.to/mpodlasin/functional-programming-in-js-functor-monad-s-little-brother-3053",
        },
        {
            title: "Billion Dollar Mistake",
            author: "Medium",
            source: "https://medium.com/@PurpleGreenLemon/how-null-references-became-the-billion-dollar-mistake-bcf0c0cc72ef",
        },
        {
            title: "Monads",
            author: "StudyMaster",
            source: "https://www.studysmarter.co.uk/explanations/computer-science/functional-programming/monads/",
        },
        {
            title: "Monet.js Documentation",
            author: "Monet",
            source: "https://github.com/monet/monet.js/blob/master/docs/MAYBE.md",
        },
    ],
    "/blog/hook-pattern": [
        {
            title: "Why Do React Hooks Rely on Call Order?",
            author: "Dan Abramov",
            source: "https://overreacted.io/why-do-hooks-rely-on-call-order/",
        },
    ]
};

export const getReferenceList = (path: string) => references[path];
