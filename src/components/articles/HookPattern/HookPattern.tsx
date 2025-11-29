import { useState, useEffect, useRef } from 'react'

// Components
import Article from '../../sharedComponents/Article/Article'
import Figure from '../../sharedComponents/Figure/Figure'
import Code from '../../sharedComponents/Code/Code'
import InlineReference from '../../sharedComponents/InlineReference/InlineReference'

// Images
import CoverImg from '../../../assets/images/blog/hook_pattern/cover.png'
import ErrorImg from '../../../assets/images/blog/hook_pattern/error_message.png'

// Other Assets
import codeSnippets from './codeSnippets'
import { getReferenceList } from '../references'

// Styles
import './HookPattern.scss'
import { useAppContext } from '../../../context/AppContext/App.context'

interface Props {
    pageName: string
    path: string
}

const HookPattern = ({ pageName, path }: Props) => {
    const references = getReferenceList(path)
    const [value, setValue] = useState<boolean>()

    console.log('******************************')
    useEffect(() => {
        console.log('1. Mount')
    }, [])
    useEffect(() => {
        console.log('2. Mount and every state change')
    })
    useEffect(() => {
        console.log('3. Value changes')
    }, [value])
    useEffect(() => console.log('4. Before unmount'))
    useEffect(() => () => console.log('5. Update or Unmount'), [value])

    const count = useRef(0)
    console.log('Counter: ', count)

    const { themeMode, setThemeMode } = useAppContext()

    return (
        <Article pageName={pageName} path={path} title="Hook Pattern">
            <h1>React Custom Hook Pattern</h1>
            <Figure
                image={CoverImg}
                className={'image--med bg--white'}
                alt={'Ship on rough see'}
                zoomAllowed={false}
            />
            <p>
                Have you ever encountered the following error message: “Uncaught
                error: React components can only be called inside the body of a
                function component”? If your answer is yes, and wondered what
                the underlying issue that causes it, then this article is for
                you. I will discuss some React hooks fundamentals, the the
                sequence of how React hooks are called, and finally a React hook
                pattern that addresses this common error message.
            </p>
            <p>
                If you are new to the functional React style and have primarily
                used classes in your React application, hooks can manage
                component state and lifecycle in classless function components,
                as functions lack these features. In class components, setState
                is used for state management, while function components may use
                built-in or custom hooks to handle dynamic components,
                lifecycle, and DOM access. Hooks can generally provide a more
                declarative approach for sharing stateful logic without altering
                the component hierarchy. React core includes three built-in
                hooks—useState, useEffect, and useContext—along with seven
                additional hooks. The most important ones are useState,
                useEffect, useContext, and useRef. By convention, hook names are
                prefixed with the word "use", and for consistency its recomended
                to maintain this convention.
            </p>
            <h3>Fundamental Hooks</h3>
            <p>
                One of the leading problem with classes is that sharing stateful
                logic with multiple nested components required a treelike
                structure of data management, which could get particularly
                complex fairly easily. Hooks simplify state creation and access
                and modification drastically, without creating your component a
                state object. The useState function accepts an optional
                parameter for setting default values and returns a state and a
                mutator, and using an array we can destructure and reference
                them in our components.
            </p>
            <Code
                fileName="stateHook.tsx"
                language="typeScript"
                content={codeSnippets.useState}
            />
            <p>
                The useEffect hook enables us to implement logic for all
                component lifecycles - such as mount, update, and unmount -
                within a single function. useEffect takes a function and an
                optional dependency array. Without dependencies, useEffect runs
                on mount and every time stateful data is modified in the
                component. However, if we want the effect to trigger only when
                certain dependencies change, we provide the optional dependency
                array. An empty dependency array causes the hook to run only
                once, during mounting. Additionally, we can listen to state
                changes and update the component by including relevant state
                values in the dependency array. Finally, we can use a tear-down
                function by returning a function from the hook, which runs
                before the component unmounts. Open the console{' '}
                <code className="HookPattern__code">F12</code> for Win or{' '}
                <code className="HookPattern__code">Cmd+F12</code> and press the
                button to see the function logged on the dev tool.
            </p>
            <Code
                fileName="effectHook.tsx"
                language="typeScript"
                content={codeSnippets.useEffect}
            />
            <div className="HookPattern__use-effect-button">
                <button className="button" onClick={() => setValue(!value)}>
                    Change value
                </button>
            </div>
            <p>
                The useContext hook allows you to work with the React context
                API. Context helps you share data between components without
                passing them through properties the component chain, also called
                props drilling. Note, that only data that does not need to be
                updated often should be placed on React context, like theme, UI
                state or shared global state for a group of components, and is
                not designed to be an application state management tool. First
                create a context and a context provider that accepts React Nodes
                as its children, then wrap the context provider around the
                component tree you want to share context with. Beware that the
                context must be only accessed within the context provider!
            </p>
            <Code
                fileName="contextHook.tsx"
                language="typeScript"
                content={codeSnippets.useContext}
            />
            <div className="HookPattern__use-context-button">
                <button
                    className="button"
                    onClick={() =>
                        setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
                    }
                >
                    Change theme context{' '}
                    {themeMode === 'dark' ? 'light' : 'dark'}
                </button>
            </div>
            <p>
                The useRef hook is used to create a mutable reference that
                persists across renders. Unlike useState, the value returned by
                useRef does not trigger re-renders when it changes. It's
                commonly used to access or store references to DOM elements or
                other values that need to persist between renders.
            </p>
            <Code
                fileName="refHook.tsx"
                language="typeScript"
                content={codeSnippets.useRef}
            />
            <div className="HookPattern__use-red-button">
                <button className="button" onClick={() => count.current++}>
                    Increment count reference
                </button>
            </div>
            <p>Check your dev tools to see the result.</p>
            <p>
                Other notable built-in hooks, which are beyond the scope of our
                discussion, include useReducer. With this hook we can update the
                state following the Redux pattern, by dispatching actions and
                reducers with optional payloads to compute the next state.
                Additionally, there's useMemo, which is employed to cache
                function call results that may be expensive to compute on each
                render, and useCallback, used to cache entire functions. In
                React, functions defined in function components get recreated on
                every render.
            </p>
            <h3>Custom Hooks</h3>
            <p>
                Building your own hooks lets you extract component logic into
                reusable functions, that can be applied in multiple components.
                In your custom hooks you are free to use any number of built-in
                hooks, such as useState, useEffect or useRef and other custom
                hooks built by you or third-party APIs. In essence, React hooks
                are plain JS functions which purpose is to interact with (hook
                on) the React component state and lifecycle, and they are
                implemented so that they work correctly only if they are called
                while a functional component is rendering. So keep in mind that
                if your function simply calls a hook but doesn't return JSX or
                doesn't represent a UI element, it's considered a custom hook.
            </p>
            <Code
                fileName="customHook.tsx"
                language="typeScript"
                content={codeSnippets.customHook}
            />
            <h3>3 Rules of Hooks</h3>
            <p>
                Hooks should only be called <strong>at the top level</strong> of
                functional components or custom hooks. They should not be called
                inside loops, conditions, or nested functions. This ensures that
                hooks are called in the same order on every render, allowing
                React to properly maintain the state of each hook between
                renders.
            </p>
            <Code
                fileName="hookRule1.tsx"
                language="javascript"
                content={codeSnippets.hookRule1}
            />
            <p>
                Hooks should only be called from{' '}
                <strong>within functional components or custom hooks</strong>.
                They should not be called from regular JavaScript functions,
                event handlers, or asynchronous functions. This ensures that
                React can properly associate each hook call with the component
                that owns it.
            </p>
            <p>
                Hooks should always be <strong>called unconditionally</strong>,
                meaning that their calls should not be placed inside conditional
                statements. Instead, you can use conditional logic inside the
                hook itself if necessary. This ensures that hooks are called
                consistently on every render, preventing bugs related to missing
                or incorrect hook calls.
            </p>
            <p>
                But why I cannot use hooks in conditions or loops? Internally
                hooks are implemented like a queue (React refers to them as
                memory cells) that rely on persistent call index between
                re-renders, each representing a node that holds references to
                the next one. Therefore the order of the hook calls must be
                guaranteed.
            </p>
            <Code
                fileName="hookRule1.tsx"
                language="javascript"
                content={codeSnippets.hookRule2}
            />
            <p>
                Loops, conditions and nested function calls cannot guarantee a
                persistent indexing between rerenders. For instance a condition
                may skip one of the hook referencing, and React could not
                directly associate the appropriate indices. If you are
                interested in further explanation on why hook references are
                indexed, check out this article:
                <InlineReference reference={references[0]} />.
            </p>
            <h3>Invalid Hook Call Error</h3>
            <p>
                While using custom hooks are great ways to organise the state
                and lifecycle of your React components, they may get
                increasingly complicated to handle as your application grows in
                size and complexity. Often times what tripped me off is applying
                to the hook rules that helps maintain the order of hook calls.
                So to demonstrate it I created a simplified scenario that
                reproduces the issue I faced. Suppose I have a component that
                will fetch album data using custom fetch hooks, and display them
                in a table. Under the album table I placed a button that would
                trigger another custom fetch hook, which would load comments;
                however, the comments can only be fetched after the button click
                as they were highly dependent of the current state of the
                application.
            </p>
            <Code
                fileName="Component.tsx"
                language="typescript"
                content={codeSnippets.exampleComponent}
            />
            <p>
                In my custom fetch hooks, I've employed useQuery to facilitate
                basic data fetching, resulting in an object comprising the query
                status (loading, error, or success) along with the retrieved
                data. While going into the specifics of useQuery is irrelevant,
                rest assured that the focus lies in the hooks' ability to
                retrieve the album and comment data.
            </p>
            <Code
                fileName="Component.hooks.ts"
                language="typescript"
                content={codeSnippets.exampleHooks}
            />
            <p>
                Unfortunately, executing this program and pressign the button
                will inevitably lead to the all-too-familiar error message:
                Invalid hook call. And rightfully so, as I violated the rules of
                hooks. Check the Component.tsx above and see if you can spot
                where things went south.
            </p>
            <Figure
                image={ErrorImg}
                className={'image--med bg--white'}
                alt={'Error message'}
                zoomAllowed={true}
            />
            <p>
                As I wanted to fetch the data no sooner or later than when the
                button is pressed, I placed the hook in the buttons event
                handler function.
            </p>
            <Code
                fileName="Component.tsx"
                language="typescript"
                content={codeSnippets.errorLine}
            />
            <h3>Wrapping and Extracting the Fetch</h3>
            <p>
                Fortunately, there are multiple ways around these kinds of
                problems, and one of the most intuitive that I found so far came
                to me when I was pair programming with one of my senior
                collegue. The solution goes like this: in this scenario
                useFetchComments hook is only responsible for fetching the
                comment data. So we should provide a hook that exposes
                functionality related to comments, including data fetching. This
                wrapping hook function also can have state and lifecycle events,
                and you may return those functions from the hook, therefore this
                solution scales perfectly:
            </p>
            <Code
                fileName="Component.hooks.ts"
                language="typescript"
                content={codeSnippets.wrappedHook}
            />
            <p>
                And you can use the fetch function in your component by
                destructing the object returned by the hook.
            </p>
            <Code
                fileName="Component.tsx"
                language="typescript"
                content={codeSnippets.fetch}
            />
            <p>
                This approach is a common pattern in React development, where
                you encapsulate complex logic or data-fetching operations within
                custom hooks to provide a clean and more reusable interface for
                components. It's a form of modularization that promotes
                separation of concerns and improves code maintainability.
                Unfortunately, I could not find the name of this pattern
                throughout my research, so in case you know what this pattern is
                called, please don't hesitate to contact me. Happy coding!
            </p>
        </Article>
    )
}

export default HookPattern
