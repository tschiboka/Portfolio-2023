// Components
import Article from '../../components/sharedComponents/Article/Article'
import Figure from '../../components/sharedComponents/Figure/Figure'
import { Code, Heading, List, Paragraph, Section, Typography } from '@common/ux'
import InlineReference from '../../components/sharedComponents/InlineReference/InlineReference'

// Images
import monetCoverImg from '../../assets/images/blog/Maybe/monet-cover.jpg'
import comicImg from '../../assets/images/blog/Maybe/comic.png'

// Other Assets
import codeSnippets from './codeSnippets'
import { getReferenceList } from '../references'

interface Props {
    pageName: string
    path: string
}

const Maybe = ({ pageName, path }: Props) => {
    const references = getReferenceList(path)
    return (
        <Article pageName={pageName} path={path} title="Monet.js">
            <Section>
                <Heading as="h1">Functional Programming with Monet.js</Heading>
                <Figure
                    image={monetCoverImg}
                    className={'image--med bg--white'}
                    alt={'Houses of Parliament (Monet)'}
                    caption="Houses of Parliament, Monet"
                    zoomAllowed={false}
                    reference={references[0]}
                />
                <Paragraph>
                    The latest challenge I encountered in my work involved delving into functional
                    programming using Monet.js and Ramda. While Ramda had an abundance of resources
                    available, I struggled to find a straightforward begginers guide about Monet.js,
                    apart from the official GitHub documentation.
                    <InlineReference reference={references[1]} />
                    Although numerous tutorials exist on using Monads and functional programming in
                    general, most are based on Haskell, Scala, or other languages that natively
                    embrace functional programming paradigms. Therefore, I took it upon myself to
                    create my own tutorial, experiment, and conduct research to share my findings. I
                    hope that, through this article, everything will eventually click together,
                    making your journey into functional programming less troublesome than mine.
                    However, as with most of the things on this site, I am writing this article for
                    my own benefit as well, as part of my learning process, so if I made any errors
                    please let me know.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Functional Programming</Heading>
                <Paragraph>
                    Functional programming languages, unlike many others, have a strong foundation
                    in mathematics, benefitting from centuries of development in mathematics field.
                    This solid mathematical basis provides them with significant advantages compared
                    to more recent programming paradigms, like object-oriented programming, which
                    are considered less mature due to their shorter history and development.
                </Paragraph>
                <Paragraph>
                    In functional programming, there are no statements, only expressions. Thanks to
                    functional purity, you can reason about code and reduce code complexity in the
                    same way you reduced the complexity of equations back in algebra class. In
                    non-functional languages (imperative languages), there is no equivalent
                    mechanism for reasoning about how the code works.
                    <InlineReference reference={references[2]} />
                </Paragraph>
                <Paragraph>
                    Functional programming is a programming paradigm that treats computation as the
                    evaluation of mathematical functions and avoids changing-state and mutable data.
                    In functional programming, functions are treated as first-class citizens,
                    meaning they can be passed as arguments to other functions, returned as values
                    from other functions, and assigned to variables.
                </Paragraph>
            </Section>
            <Section>
                <Heading as="h2">Glossary of Key Characteristics</Heading>
                <Paragraph>
                    To begin learning functional programming, let's cover some of the most important
                    key concepts. I'll introduce each term with examples in case you're new to them.
                    Feel free to skip ahead if you're already familiar with the terminology.
                </Paragraph>
                <Paragraph>
                    <strong>Immutability:</strong> Data, once created, cannot be changed or mutated.
                    Instead of modifying existing data, functional programming emphasizes creating
                    new data structures.
                </Paragraph>
                <Code
                    fileName="immutable.ts"
                    language="typescript"
                    content={codeSnippets.immutability}
                />
                <Paragraph>
                    <strong>First-Class Functions</strong>: Functions are treated as first-class
                    citizens, meaning they can be assigned to variables, passed as arguments, and
                    returned as values from other functions. Functions that can accept other
                    functions as arguments or return functions are also called higher-order
                    functions. They enable more concise and modular code.
                </Paragraph>
                <Code
                    fileName="characteristics.ts"
                    language="typescript"
                    content={codeSnippets.characteristics}
                />
                <Paragraph>
                    <strong>Pure Functions</strong>: Functions in functional programming are pure,
                    meaning their output is solely determined by their input and they have no side
                    effects, so the same input will always produce the same output. These side
                    effects may be: modifying a variable or a data structure outside of the function
                    scope, modify a field of an object, throw exceptions, IO operations etc.
                </Paragraph>
                <Code fileName="pure.ts" language="typescript" content={codeSnippets.pure} />
                <Paragraph>
                    <strong>Referential Transparency</strong>: It emphasizes referential
                    transparency, where a function call with a given set of parameters can be
                    replaced by its corresponding result without changing the program's behavior.
                </Paragraph>
                <Code
                    fileName="referencialTransparency.ts"
                    language="typescript"
                    content={codeSnippets.referencialTransparency}
                />
                <Paragraph>
                    <strong>Recursion</strong>: Functional programming often uses recursion as an
                    alternative to traditional iterative loops.
                </Paragraph>
                <Code
                    fileName="recursion.ts"
                    language="typescript"
                    content={codeSnippets.recursive}
                />
                <Paragraph>
                    <strong>Declarative Style</strong>: Functional programming emphasizes a
                    declarative style, where the programmer describes what the program should
                    accomplish rather than specifying how to achieve it.
                </Paragraph>
                <Code
                    fileName="declarative.ts"
                    language="typescript"
                    content={codeSnippets.declarative}
                />
            </Section>
            <Section>
                <Heading as="h2">What are functors?</Heading>
                <Paragraph>
                    When programmers started writing programs with for loops, they have noticed that
                    you can iterate over many different data structures (arrays, linked lists,
                    various types of dictionaries, graphs) that have one thing in common - we can
                    write a for loop which somehow iterates over their elements.
                    <InlineReference reference={references[4]} />
                    In essence mapping works similarly, where we apply a function to a each item of
                    a container, and return a new container. A map function never changes the
                    container, instead it just acts upon its contents.
                </Paragraph>
                <Paragraph>
                    In mathematics, a functor is a map between categories, and in functional
                    programming they are a powerful concept that can be applied to JavaScript as
                    well. They allow for the manipulation of data in a way that is both predictable
                    and safe.
                    <InlineReference reference={references[3]} />A functor is a container that holds
                    a value and can be used to apply a map function to that value (just like you
                    would do with JavaScript arrays). So, in the simplest term a functor is an
                    object that can implement a map. Sidenote, surprisingly Promises are also
                    considered functors, but instead of map we apply our function in the then method
                    which in exchange returns a new Promise.
                </Paragraph>
                <Code fileName="functor.ts" language="typescript" content={codeSnippets.functors} />
            </Section>
            <Section>
                <Heading as="h2">What are Monads?</Heading>
                <Paragraph>
                    Monad is a functional programming concept that provide a way to structure
                    computations and handle side effects in a pure and composable manner. In
                    essence, Monads are a design pattern used to manage the flow of data between
                    functions while encapsulating behaviors like state, asynchronous operations, or
                    error handling. They help address the challenges of working in a purely
                    functional paradigm where side effects and mutable state are typically avoided.
                </Paragraph>
                <Paragraph>
                    A Monad is an amplifier type: it takes a type and turns it into a more special
                    type with more capabilities and operations. It takes an initial context (like a
                    possible state of the world), and a function that takes a plain value and puts
                    it in a context (such as a computation that can fail), and it combines them to
                    provide a new context (outcome after the computation and its contextual impact).
                    <InlineReference reference={references[6]} />
                    Monads provide functions, actions, inputs, and outputs that can be used to build
                    pipelines and computational constructs. Monadic operations that work with
                    Monads, often include functions like <strong>map</strong>,{' '}
                    <strong>flatmap</strong>, and <strong>pure</strong>. Also in computer science
                    literature you may encounter many synonyms for these operations, like return,
                    join, select, bind. However most of these operations refer to the main three
                    operation that enable sequential composition of computations within the Monadic
                    context.
                </Paragraph>
                <List
                    as="ul"
                    items={[
                        <Paragraph>
                            <Typography weight="bold">Map</Typography> We have already mentioned the
                            map function, and you have probably used map on arrays million times
                            before, however in the context of Monads, the map function applies a
                            given function to the values inside the Monadic context and returns a
                            new Monad containing the transformed values. This allows you to apply a
                            function to the contents of the Monad without changing the context
                            itself.
                        </Paragraph>,
                        <>
                            <Paragraph>
                                <Typography weight="bold">Flatmap</Typography> The flatMap
                                operation, also known as bind, allows you to chain together
                                operations on Monads that return Monads, flattening nested Monads
                                into a single Monad. The flatMap function applies a function to the
                                values inside the Monadic context and returns a new Monad. Unlike
                                map, the function passed to flatMap returns a Monad itself, and
                                flatMap then flattens the resulting nested Monads into a single
                                Monad.
                            </Paragraph>
                            <Code
                                fileName="flatmap.ts"
                                language="typescript"
                                content={codeSnippets.flatMap}
                            />
                        </>,
                        <>
                            <Paragraph>
                                <Typography weight="bold">Unit</Typography> or pure operation is a
                                way to lift a value into a Monadic context. It takes a non-monadic
                                value and wraps it inside a Monad, thus introducing it to the
                                computational context of the Monad. This operation is essential for
                                constructing Monadic values from regular values. For the complete
                                list of monadic constructors please refer the official monet.js
                                documentation.
                                <InlineReference reference={references[7]} />
                            </Paragraph>
                            <Code
                                fileName="constructors.ts"
                                language="typescript"
                                content={codeSnippets.constructor}
                            />
                        </>,
                    ]}
                />
            </Section>
            <Section>
                <Heading as="h2">Billion dollar mistake</Heading>
                <Paragraph>
                    In 1965, Sir Tony Hoare introduced the concept of <strong>null pointers</strong>{' '}
                    to the Algol family of languages, which he later called his billion dollar
                    mistake. His remark may seem an overstatement but in reality, it serves as an
                    acknowledgment of the overall expenses linked to unexpected errors, system
                    crashes, and the countless labour hours developers across the globe have
                    dedicated to troubleshooting null pointer exceptions.
                </Paragraph>
                <Figure
                    image={comicImg}
                    className={'image--med bg--white'}
                    alt={'Nullpointer Exception'}
                    caption="Nullpointer Exception"
                    zoomAllowed={true}
                    reference={references[5]}
                    size="sm"
                />
                <Paragraph>
                    As a JavaScript developer you must be very familiar with nullpointer issues,
                    like accessing an objects property that is null or undefined:
                </Paragraph>
                <Code
                    fileName="nullpointer.ts"
                    language="typescript"
                    content={codeSnippets.nullpointer}
                />
                <Paragraph>
                    To rectify such situations, developers often resort to writing multiple
                    condition logic operations, which can lead to bloated and hard-to-read code.
                </Paragraph>
                <Code
                    fileName="nullCheck.ts"
                    language="typescript"
                    content={codeSnippets.nullChecks}
                />
            </Section>
        </Article>
    )
}

export default Maybe
