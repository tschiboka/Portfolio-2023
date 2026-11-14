import { BindingMessage, ReferenceMessage, Replacement } from '../NoReactNamespace.constants'
import { Rules } from '../NoReactNamespace.rules'
import { ruleTester, typescriptRuleTester } from '../../config'

const getReferenceMessage = (name: string): string => ReferenceMessage.replace(Replacement, name)

ruleTester.run('no-react-namespace', Rules.Eslint.NoReactNamespace9, {
    valid: [
        {
            name: 'should accept a named import from react',
            code: "import { useState } from 'react'\nconst [open, setOpen] = useState(false)",
        },
        {
            name: 'should accept a default import from another module',
            code: "import React from 'react-dom'\nconst root = React.createRoot(document.body)",
        },
        {
            name: 'should accept a member read on another object',
            code: 'const value = settings.useState',
        },
        {
            name: 'should accept prose that names React',
            code: "const note = 'React is never bound'",
        },
    ],
    invalid: [
        {
            name: 'should throw for a default binding',
            code: "import React from 'react'",
            errors: [{ message: BindingMessage }],
        },
        {
            name: 'should throw for a namespace binding',
            code: "import * as React from 'react'",
            errors: [{ message: BindingMessage }],
        },
        {
            name: 'should throw for a value reached through the binding',
            code: "import React from 'react'\nconst [open, setOpen] = React.useState(false)",
            errors: [{ message: BindingMessage }, { message: getReferenceMessage('useState') }],
        },
        {
            name: 'should throw for an aliased namespace binding',
            code: "import * as Framework from 'react'\nconst use = Framework.useState",
            errors: [{ message: BindingMessage }, { message: getReferenceMessage('useState') }],
        },
        {
            name: 'should throw once for a default binding beside a named import',
            code: "import React, { useState } from 'react'\nconst [open, setOpen] = useState(false)",
            errors: [{ message: BindingMessage }],
        },
        {
            name: 'should throw for a jsx member reached through the binding',
            code: "import React from 'react'\nconst child = <React.Fragment />",
            filename: 'a.tsx',
            errors: [{ message: BindingMessage }, { message: getReferenceMessage('Fragment') }],
        },
    ],
})

typescriptRuleTester.run('no-react-namespace', Rules.Eslint.NoReactNamespace9, {
    valid: [
        {
            name: 'should accept a type imported by name',
            code: "import type { FormEvent } from 'react'\nconst send = (event: FormEvent) => event",
            filename: 'a.ts',
        },
        {
            name: 'should accept a qualified name on another root',
            code: 'const send = (event: Settings.FormEvent) => event',
            filename: 'a.ts',
        },
    ],
    invalid: [
        {
            name: 'should throw for a type reached through the binding',
            code: "import React from 'react'\nconst send = (event: React.FormEvent) => event",
            filename: 'a.ts',
            errors: [{ message: BindingMessage }, { message: getReferenceMessage('FormEvent') }],
        },
    ],
})
