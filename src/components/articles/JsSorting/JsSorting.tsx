// Components
import { Link } from "react-router-dom";
import Article from "../../sharedComponents/Article/Article";
import Figure from "../../sharedComponents/Figure/Figure";
import Code from "../../sharedComponents/Code/Code";

// Images
import matryoshkaImg from "../../../assets/images/blog/js_sorting/Matryoshka.png";

// Other Assets
import { getReferenceList } from "../references";
import codeSnippets from "./codeSnippets";

// Styles
import "./JsSorting.scss";

interface Props {
    pageName: string;
    path: string;
}

const JsSorting = ({ pageName, path }: Props) => {
    const references = getReferenceList(path);
    return (
        <Article pageName={pageName} path={path} title="JavaScript Sorting">
            <h1>JavaScript Sorting</h1>
            <Figure
                image={matryoshkaImg}
                className={"image--med bg--white"}
                alt={"Sorting"}
                zoomAllowed={true}
            />
            <p>
                Sorting is a fundamental operation in computer science and
                programming. JavaScript, a versatile and widely used programming
                language, offers several ways to sort arrays and data
                structures. However, there is more to JavaScript sorting that
                catches the eye at first sight. JavaScript is unique because its
                array sorting behaviour may vary depending on the browser vendor
                and version. While many other programming languages, such as
                Python, Java, or C#, provide fixed and standardised
                implementations for sorting arrays, JavaScript's sorting
                behaviour relies on the specific JavaScript engine used by the
                browser. Let's start with the basics of JavaScript array
                sorting.
            </p>
            <h3>Sorting Strings</h3>
            <p>
                Let's see what MDN says about sorting arrays with JavaScript.
                The sort() method of Array instances sorts the elements of an
                array in place and returns the reference to the same array, now
                sorted. The default sort order is ascending, built upon
                converting the elements into strings and comparing their UTF-16
                code unit value sequences.
                <Link className="Reference__Link" to={references[0].source}>
                    [ {references[0].author} ]
                </Link>
            </p>
            <Code
                fileName="sortMyDwarfs.js"
                language="javascript"
                content={codeSnippets.basicExample}
            />
            <p>
                A critical aspect of the example above is that sorting mutates
                our original array. When an array is sorted in place, the
                elements are reordered within the memory locations occupied by
                the original elements. In-place sorting can be more
                memory-efficient, especially for large arrays, as it doesn't
                require allocating memory for a separate sorted array. However,
                as the sort function returns with the reference of the original
                array, it can cause unwanted side effects. If we want to keep
                the original data, we may use the ES6 spread operator to
                destruct our array. (Deeply nested objects may need some extra
                tending, but that is for another post.)
            </p>
            <Code
                fileName="sortMyDwarfs.js"
                language="javascript"
                content={codeSnippets.mutation}
            />
            <p>
                Another thing to remember is that default sorting is
                case-sensitive. When strings are being compared, they are
                converted to their equivalent Unicode value, unsurprisingly
                numbers, then sorted sequentially, in ascending order by
                default.{" "}
                <Link className="Reference__Link" to={references[1].source}>
                    [ {references[1].author} ]
                </Link>{" "}
                The order is as follows: numbers, upper-case characters and
                lower-case characters.
            </p>
            <Code
                fileName="sortLetters.js"
                language="javascript"
                content={codeSnippets.sortingLetters}
            />
            <h3>Sorting Numbers</h3>
            <p>
                But what happens if we want to sort numbers instead of strings?
            </p>
            <Code
                fileName="sortNumbers.js"
                language="javascript"
                content={codeSnippets.sortingNumbers}
            />
            <p>
                Knowing that JavaScript uses type conversion, it is unsurprising
                that our numbers are arranged in a string-like ascending order.
                Just like string array items ["B", "AA", "A"] are sorted into
                ["A", "AA", "B"], arrays containing numbers [2, 11, 1] will be
                sorted into [1, 11, 2]. Fortunately, the sort method also
                accepts an optional parameter for comparing array items.
                <Link className="Reference__Link" to={references[2].source}>
                    [ {references[2].author} ]
                </Link>{" "}
                The optional comparison function can be used to fine-tune our
                sorting logic.
                <br />
                There are four ways to call a JavaScript sort method:
            </p>
            <ol className="JsSorting__ol">
                <li>Functionless,</li>
                <li>Comparison Function,</li>
                <li>Inline Comparison Function,</li>
                <li>Arrow Comparison Function.</li>
            </ol>
            <Code
                fileName="sort.js"
                language="javascript"
                content={codeSnippets.sortOptions}
            />
            <p>
                We can compare numbers with a comparator in any of the
                previously mentioned methods (except, of course, the
                functionless sort call).
            </p>
            <Code
                fileName="comparators.js"
                language="javascript"
                content={codeSnippets.sortNumberOptions}
            />
            <h3>Comparators</h3>
            <p>
                According to the ECMAScript specification (2023), the sort must
                be stable (elements that compare equal must remain in their
                original order). If the compare function is not undefined, it
                should be a function that accepts two arguments, x and y and
                returns a negative number if x &gt; y, a positive number if x
                &lt; y, or a zero otherwise.
                <Link className="Reference__Link" to={references[3].source}>
                    [ {references[3].author} ]
                </Link>
                This means that comparator functions are highly customisable,
                and we can use them for a broad range of scenarios.
            </p>
            <Code
                fileName="comparators.js"
                language="javascript"
                content={codeSnippets.comparator}
            />
            <h3>Sorting in Descending Order</h3>
            <p>
                There are two simple ways to sort numbers in descending order.
                The most straightforward way is to reverse the sorted array
                using the array prototype reverse function.
            </p>
            <Code
                fileName="reverse_v1.js"
                language="javascript"
                content={codeSnippets.reverse1}
            />
            <p>
                Or we can modify our comparator function in the following way:
            </p>
            <Code
                fileName="reverse_v2.js"
                language="javascript"
                content={codeSnippets.reverse2}
            />
            <p>
                In most cases, it does not matter which method we use. Reversing
                the sorted array is an easy-to-read solution, but the second
                version may fit better for performance-sensitive applications
                with large arrays. While the complexity of our sorting function
                is implementation-dependent, likely O (n log (n)), the reverse
                has an additional O (n) complexity.
            </p>
        </Article>
    );
};

export default JsSorting;
