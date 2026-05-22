// Components
import Article from '../../components/sharedComponents/Article/Article'
import Figure from '../../components/sharedComponents/Figure/Figure'
import { Code, Heading, List, Paragraph, Section } from '@common/ux'

// Images
import matryoshkaImg from '../../assets/images/blog/js_sorting/Matryoshka.png'
import sortingAlgoComplexityImg from '../../assets/images/blog/js_sorting/SortingAlgoComplexities.png'

// Other Assets
import { getReferenceList } from '../references'
import codeSnippets from './codeSnippets'

// Styles
import './JsSorting.scss'
import InlineReference from '../../components/sharedComponents/InlineReference/InlineReference'

interface Props {
    pageName: string
    path: string
}

const JsSorting = ({ pageName, path }: Props) => {
    const references = getReferenceList(path)
    return (
        <Article pageName={pageName} path={path} title="JavaScript Sorting">
            <Heading as="h1">JavaScript Sorting</Heading>
            <Section>
                <Figure
                    image={matryoshkaImg}
                    size="md"
                    bgColor="white"
                    alt={'Sorting'}
                    zoomAllowed={false}
                />
                <Paragraph>
                    Sorting is a fundamental operation in computer science and programming.
                    JavaScript, a versatile and widely used programming language, offers several
                    ways to sort arrays and data structures. However, there is more to JavaScript
                    sorting that catches the eye at first sight. JavaScript is unique because its
                    array sorting behaviour may vary depending on the browser vendor and version.
                    While many other programming languages, such as Python, Java, or C#, provide
                    fixed and standardised implementations for sorting arrays, JavaScript's sorting
                    behaviour relies on the specific JavaScript engine used by the browser. Let's
                    start with the basics of JavaScript array sorting.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Sorting Strings</Heading>
                <Paragraph>
                    Let's see what MDN says about sorting arrays with JavaScript. The sort() method
                    of Array instances sorts the elements of an array in place and returns the
                    reference to the same array, now sorted. The default sort order is ascending,
                    built upon converting the elements into strings and comparing their UTF-16 code
                    unit value sequences.
                    <InlineReference reference={references[0]} />
                </Paragraph>
                <Code
                    fileName="sortMyDwarfs.js"
                    language="javascript"
                    content={codeSnippets.basicExample}
                />
                <Paragraph>
                    A critical aspect of the example above is that sorting mutates our original
                    array. When an array is sorted in place, the elements are reordered within the
                    memory locations occupied by the original elements. In-place sorting can be more
                    memory-efficient, especially for large arrays, as it doesn't require allocating
                    memory for a separate sorted array. However, as the sort function returns with
                    the reference of the original array, it can cause unwanted side effects. If we
                    want to keep the original data, we may use the ES6 spread operator to destruct
                    our array. (Deeply nested objects may need some extra tending, but that is for
                    another post.)
                </Paragraph>
                <Code
                    fileName="sortMyDwarfs.js"
                    language="javascript"
                    content={codeSnippets.mutation}
                />
                <Paragraph>
                    Another thing to remember is that default sorting is case-sensitive. When
                    strings are being compared, they are converted to their equivalent Unicode
                    value, unsurprisingly numbers, then sorted sequentially, in ascending order by
                    default.
                    <InlineReference reference={references[1]} />
                    The order is as follows: numbers, upper-case characters and lower-case
                    characters.
                </Paragraph>
                <Code
                    fileName="sortLetters.js"
                    language="javascript"
                    content={codeSnippets.sortingLetters}
                />
            </Section>
            <Section>
                <Heading as="h2">Sorting Numbers</Heading>
                <Paragraph>
                    But what happens if we want to sort numbers instead of strings?
                </Paragraph>
                <Code
                    fileName="sortNumbers.js"
                    language="javascript"
                    content={codeSnippets.sortingNumbers}
                />
                <Paragraph>
                    Knowing that JavaScript uses type conversion, it is unsurprising that our
                    numbers are arranged in a string-like ascending order. Just like string array
                    items ["B", "AA", "A"] are sorted into ["A", "AA", "B"], arrays containing
                    numbers [2, 11, 1] will be sorted into [1, 11, 2]. Fortunately, the sort method
                    also accepts an optional parameter for comparing array items.
                    <InlineReference reference={references[2]} />
                    The optional comparison function can be used to fine-tune our sorting logic.
                    <br />
                    There are four ways to call a JavaScript sort method:
                </Paragraph>
                <List
                    as="ol"
                    items={[
                        'Functionless,',
                        'Comparison Function,',
                        'Inline Comparison Function,',
                        'Arrow Comparison Function.',
                    ]}
                />
                <Code fileName="sort.js" language="javascript" content={codeSnippets.sortOptions} />
                <Paragraph>
                    We can compare numbers with a comparator in any of the previously mentioned
                    methods (except, of course, the functionless sort call).
                </Paragraph>
                <Code
                    fileName="comparators.js"
                    language="javascript"
                    content={codeSnippets.sortNumberOptions}
                />
            </Section>
            <Section>
                <Heading as="h2">Comparators</Heading>
                <Paragraph>
                    According to the ECMAScript specification (2023), the sort must be stable
                    (elements that compare equal must remain in their original order). If the
                    compare function is not undefined, it should be a function that accepts two
                    arguments, x and y and returns a negative number if x &gt; y, a positive number
                    if x &lt; y, or a zero otherwise.
                    <InlineReference reference={references[3]} />
                    This means that comparator functions are highly customisable, and we can use
                    them for a broad range of scenarios.
                </Paragraph>
                <Code
                    fileName="comparators.js"
                    language="javascript"
                    content={codeSnippets.comparator}
                />
            </Section>
            <Section>
                <Heading as="h2">Sorting in Descending Order</Heading>
                <Paragraph>
                    There are two simple ways to sort numbers in descending order. The most
                    straightforward way is to reverse the sorted array using the array prototype
                    reverse function.
                </Paragraph>
                <Code
                    fileName="reverse_v1.js"
                    language="javascript"
                    content={codeSnippets.reverse1}
                />
                <Paragraph>
                    Or we can modify our comparator function in the following way:
                </Paragraph>
                <Code
                    fileName="reverse_v2.js"
                    language="javascript"
                    content={codeSnippets.reverse2}
                />
                <Paragraph>
                    In most cases, it does not matter which method we use. Reversing the sorted
                    array is an easy-to-read solution, but the second version may fit better for
                    performance-sensitive applications with large arrays. While the complexity of
                    both of our sorting functions is implementation-dependent, likely O (n log (n)),
                    the reverse has an additional O (n) complexity.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Sorting Objects</Heading>
                <Paragraph>
                    Comparator functions offer much greater versatility than merely using them for
                    descending sorting. One of the most common use cases for more complex sorts in
                    web development is related to sorting objects by one or more of their property
                    value. Typical scenarios include sorting users by their registration date,
                    organising products by price, or arranging posts by their publication
                    timestamps. Let's consider a simple scenario where users are ordered by their
                    registration date.
                </Paragraph>
                <Code fileName="users.js" language="javascript" content={codeSnippets.users} />
                <Paragraph>
                    We can simply refer to the object property values in our comparison function to
                    sort users by name.
                </Paragraph>
                <Code
                    fileName="sortByName.js"
                    language="javascript"
                    content={codeSnippets.sortByName}
                />
                <Paragraph>
                    However, please beware of the string comparison because we cannot rely on the
                    subtraction operator, like "A" - "B" returns NaN. To compare strings reliably,
                    we must use the localCompare() function. The localeCompare() method of String
                    values returns a number indicating whether this string comes before, or after,
                    or is the same as the given string in sort order.
                    <InlineReference reference={references[4]} />
                    Additionally, we can fine-tune our comparison by specifying the language, base
                    for accents and cases, or setting numeric options to correct the already
                    mentioned comparison problem. See details here:
                    <InlineReference reference={references[5]} />
                </Paragraph>
                <Code
                    fileName="sortOptions.js"
                    language="javascript"
                    content={codeSnippets.localeCompare}
                />
                <Paragraph>
                    Lastly, we can sort our users by dates, for example, their date of birth. In
                    this case, we compare the returned number when creating a new Date instance.
                </Paragraph>
                <Code
                    fileName="sortByDate.js"
                    language="javascript"
                    content={codeSnippets.sortByDate}
                />
            </Section>
            <Section>
                <Heading as="h2">Edge Cases</Heading>
                <Paragraph>
                    Some edge cases have already been mentioned, like the lexicographic sorting of
                    numbers, language-specific issues like accents, and case sensitivity. However, I
                    want to call your attention to some JavaScript-specific values we must account
                    for to create reliable code. Some falsy values, such as 0, false, null and
                    undefined, may behave unexpectedly. For instance, NaN stayed in its original
                    place at the beginning and the end of a numeric sorting, but it was ordered
                    lexicographically in string conversion.
                </Paragraph>
                <Code
                    fileName="edgeCases.js"
                    language="javascript"
                    content={codeSnippets.edgeCases}
                />
            </Section>
            <Section>
                <Heading as="h2">Implementation Freedom</Heading>
                <Paragraph>
                    As I have written in the introduction, browsers have no restrictions on how they
                    implement their JavaScript sort function as long as they adhere to the
                    ECMAScript specifications. This, of course, leaves us guessing what exactly is
                    going on behind the scenes, and as far as we are concerned, they might use
                    Bubble sort. But jokes apart, most browser sort implementations are highly
                    optimised. Historically, Array prototype sort and Typed Array prototype sort
                    relied on the same Quicksort implementation written in JavaScript. The basis is
                    a Quicksort with an Insertion Sort fall-back for shorter arrays (length &lt;
                    10). <InlineReference reference={references[6]} />
                </Paragraph>
                <Paragraph>
                    However, while Insertion sort is a stable algorithm, Quicksort is not, and sort
                    stability (two objects with equal keys appear in the same order in sorted output
                    as they appear in the input data set{' '}
                    <InlineReference reference={references[7]} />) was a long-desired feature of the
                    JavaScript community. Therefore, the latest browser implementations, such as
                    Chrome's V8 engine, use TimSort.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">TimSort</Heading>
                <Figure
                    image={sortingAlgoComplexityImg}
                    size="md"
                    bgColor="white"
                    alt={'Algorithm Complexities'}
                    zoomAllowed={true}
                    caption="Array Sorting Algorithms"
                />
                <Paragraph>
                    TimSort is a stable hybrid algorithm combining Merge and Insertion sort, and it
                    takes advantage of the fact that real-world data is often partially sorted.
                    TimSort's time complexity is recorded at O(n log (n)), making its average time
                    complexity equal to that of Quicksort and Mergesort; in best-case scenarios,
                    whether negligible or not, TimSort will typically outperform both Quicksort and
                    Mergesort in time complexity, though it is arguably relegated to cases where
                    data is considered nearly sorted given TimSort's stable characteristics.
                    <InlineReference reference={references[9]} />
                </Paragraph>
                <Paragraph>
                    First, the algorithm divides our array into groups called runs. The size of the
                    runs is typically the power of two (32 or 64) for optimising Merge Sort's
                    recursive tree. Initially, Insertion Sort will sort the runs, as it performs
                    when the size of the given array is relatively small. When the runs are sorted,
                    we can merge them two by two iteratively until every run is merged.
                </Paragraph>
                <Code fileName="timSort.js" language="javascript" content={codeSnippets.timSort} />
                <Paragraph>
                    In summary, JavaScript sorting is a versatile tool in web development but comes
                    with nuances. Be aware of browser-specific variations and consider using custom
                    comparator functions for sorting objects. Watch out for edge cases, such as
                    handling falsy values and language-specific sorting challenges. Modern
                    JavaScript engines use efficient algorithms like TimSort for optimisation.
                </Paragraph>
            </Section>
        </Article>
    )
}

export default JsSorting
