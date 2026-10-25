import { typescriptRuleTester } from '../../config'
import { Rules, ErrorMessage } from '../NoQualifiedType.rules'

typescriptRuleTester.run('no-qualified-type', Rules.Eslint.Min9, {
    valid: [
        {
            name: 'should not throw for a type imported directly and used bare',
            code: "import type { FormEvent } from 'react'\nconst send = (event: FormEvent) => event",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a namespace value call',
            code: "import React from 'react'\nconst element = React.createElement('div')",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a namespace value read',
            code: "import React from 'react'\nconst mode = React.StrictMode",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a jsx member expression',
            code: "import React from 'react'\nconst child = <React.Fragment />",
            filename: 'a.tsx',
        },
        {
            name: 'should not throw for a typeof query',
            code: "import React from 'react'\nconst hook: typeof React.useState = React.useState",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a plain type annotation',
            code: "const label: string = 'a'",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a dotted typeof query',
            code: 'const query: typeof window.document.body = null',
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a qualified name inside an inline import',
            code: "const child: import('./types').UI.Child = null",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a superclass named through a namespace',
            code: 'class Thing extends React.Component {}',
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a namespace member when the namespace is imported',
            code: "import type { JSX } from 'react'\nconst child: JSX.Element = null",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a qualified type when its root is imported',
            code: "import type * as React from 'react'\nconst send = (event: React.FormEvent) => event",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a default import that names the root',
            code: "import React from 'react'\nconst send = (event: React.FormEvent) => event",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for an aliased import that names the root',
            code: "import type { JSX as Jsx } from 'react'\nconst child: Jsx.Element = null",
            filename: 'a.ts',
        },
        {
            name: 'should not throw for a heritage type whose root is imported',
            code: "import type * as React from 'react'\nclass Thing implements React.Component {}",
            filename: 'a.ts',
        },
    ],
    invalid: [
        {
            name: 'should throw for a qualified event type',
            code: 'const send = (event: React.FormEvent) => event',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified node type',
            code: 'const child: React.ReactNode = null',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified style type',
            code: 'const style: React.CSSProperties = {}',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once for a chain of three names',
            code: 'const value: A.B.C = null',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified name inside a generic',
            code: 'const keys: Array<React.Key> = []',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified name in a type alias',
            code: 'type Child = React.ReactNode',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified name in an interface member',
            code: 'interface Props {\n    child: React.ReactNode\n}',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified name in an interface heritage',
            code: 'interface Props extends React.HTMLAttributes<object> {}',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified name in a class implements clause',
            code: 'class Thing implements React.Component {}',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified name in a type assertion',
            code: 'const style = {} as React.CSSProperties',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified name as a return type',
            code: 'const build = (): React.ReactNode => null',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw for a qualified name as a call type argument',
            code: 'const state = useState<React.SetStateAction<number>>(0)',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once per qualified name',
            code: 'const pair: [React.Key, React.ReactNode] = [null, null]',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }, { message: ErrorMessage }],
        },
        {
            name: 'should throw for a namespace member whose namespace is never imported',
            code: 'const child: JSX.Element = null',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw once for a heritage chain of three names',
            code: 'class Thing implements A.B.C {}',
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
        {
            name: 'should throw when an unrelated name is the one imported',
            code: "import type { FC } from 'react'\nconst send = (event: React.FormEvent) => event",
            filename: 'a.ts',
            errors: [{ message: ErrorMessage }],
        },
    ],
})
