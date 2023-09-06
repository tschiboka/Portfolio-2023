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
};

export const getReferenceList = (path: string) => references[path];
