# Rules

The rule registry. One typed entry per rule; `npm run build:rules` reads it and
emits the linter config.

- **Source of truth.** Skills describe _why_; this folder decides _what is
  enforced_.
- **Typed, not JSON** — one registrar per rule, validated by `RuleRegistrar`.
- **Generated output is never hand-edited.** `rules/dist/` is build output.

## Folder

One folder per rule, named for the rule's `id` in PascalCase. Files inside take
that name as their prefix:

```text
rules/
├── registry.ts                     the only file edited to add a rule
├── types.ts                        RuleRegistrar, RuleScope, RuleFunction
├── config.ts                       the shared ruleTester
├── builder.ts                      reads the registry, emits dist/standards.config.js
└── no-ad-hoc-file-suffix/
    ├── NoAdHocFileSuffix.constants.ts    lists, patterns, magic values
    ├── NoAdHocFileSuffix.rules.ts        the RuleModule, exported as Rules
    ├── NoAdHocFileSuffix.registrar.ts    the RuleRegistrar, exported as registrar
    └── tests/
        └── NoAdHocFileSuffix.spec.ts     ruleTester.run cases
```

- `.constants.ts` is optional — a rule with no lists does not need one.
- `.rules.ts` exports `Rules`, a `{ Eslint: { <Name>9: … } }` object. The
  version in the key names the linter major it targets.
- `.registrar.ts` exports `registrar` as the default shape of the entry.
- `tests/` is plural, matching the feature convention in
  [`file-structure.md`](../docs/references/file-structure.md).

Registration is two edits: import the registrar in `registry.ts`, then add it to
the `RuleRegistry` array.

## Entry

Every field, with generic values:

```ts
export const registrar: RuleRegistrar = {
    id: 'domain-rule-name',
    description: 'What it asserts, in one sentence, naming the files it applies to.',
    scope: {
        include: ['src/**/*.ts'],
        exclude: ['**/*.spec.*'],
    },
    enabled: true,
    severity: 'error',
    rules: [
        {
            requires: { linter: 'eslint', min: '9.0.0' },
            rule: Rules.Eslint.DomainRuleName9,
        },
    ],
}
```

| Field           | Required | Notes                                                              |
| --------------- | -------- | ------------------------------------------------------------------ |
| `id`            | yes      | kebab-case, unique, stable — it is the handle everything else uses |
| `description`   | yes      | the assertion, not the reason                                      |
| `scope.include` | yes      | globs; emitted as the rule's `files` list                          |
| `scope.exclude` | yes      | `[]` when nothing is excluded, never omitted                       |
| `enabled`       | yes      | `false` keeps the rule registered but unbuilt                      |
| `severity`      | yes      | `'error'` or `'warn'`                                              |
| `rules`         | yes      | a tuple of `RuleFunction` — one per linter backend                 |
| ↳ `requires`    | yes      | `{ linter, min, max? }`; `min` inclusive, `max` exclusive          |
| ↳ `rule`        | yes      | the `RuleModule` the generated config points at                    |

A rule is built only when `enabled` is `true` **and** its `requires` is
satisfied by the installed linter version — see `ruleBuilder.build` in
`builder.ts`. An unsatisfied requirement is skipped silently, so a mistyped
`min` reads exactly like a rule that never fires.

## Rule

Only three things are required. Everything else is metadata for editors, tooling and docs.

```ts
const esLintRule: Rule.RuleModule = {
    meta: {
        // REQUIRED — how ESLint classifies the rule, validated against this union.
        type: 'problem', // | 'suggestion' | 'layout'
        // REQUIRED in practice. `[]` asserts "this rule takes no options" and
        // ESLint then REJECTS any config that passes options. Omitting it means
        // unvalidated options are accepted.
        schema: [],
        // Optional. Read by editors, `--print-config`, docs generators.
        docs: {
            description: 'One line — shown in editor tooltips and rule listings.',
            url: 'https://…',
        },
        // Optional. Message templates, referenced by `messageId` in report().
        // Supports {{placeholders}} via `data`.
        messages: {
            messageName: 'Error message',
        },

        // Optional. Declares the rule can auto-fix, and HOW.
        //   'code'       — changes semantics
        //   'whitespace' — formatting only
        fixable: 'code',

        // Optional. Declares the rule emits suggestions via report({ suggest: [...] }).
        // Not declaring it makes ESLint THROW at report time.
        hasSuggestions: true,

        // Optional. Marks the rule as no longer current.
        // deprecated: true,
        deprecated: { message: 'Use X instead.', replacedBy: ['x'] },

        // Optional. Points at the rules that supersede this one.
        replacedBy: ['other-rule'],

        // Optional. Defaults for context.options.
        defaultOptions: [],
    },

    // REQUIRED — returns a visitor keyed by AST node type.
    // Keys are ESTree selector syntax: 'Program', 'Program:exit',
    // 'CallExpression[callee.name="foo"]', 'JSXElement > JSXIdentifier'.
    create(context: Rule.RuleContext) {
       return {
            Program(node) { … },                // fires once, at the root
            ExportNamedDeclaration(node) { … }, // fires per export
            'Program:exit'(node) { … },         // fires at the root, after children
        }
    },
}
```

### What `context` gives you

```text
context.id              the rule name, e.g. 'queries-one-umbrella-export'
context.options         the array configured in the host config
context.settings        shared settings object
context.parserOptions
context.languageOptions
context.filename        absolute path of the file being linted
context.physicalFilename
context.cwd
context.sourceCode      { text, ast, getText(), getTokenBefore(), … }

context.report({ … })   node | loc, message | messageId, data, fix, suggest

deprecated aliases:
  context.getSourceCode()   → context.sourceCode
  context.getFilename()     → context.filename
  context.getScope()        → context.sourceCode.getScope(node)
```

### What `create` returns — the rule listener

`create(context)` returns an object whose **keys are esquery selectors** and whose **values are handlers** receiving the matched node.

```ts
create(context) {
    return {
        Key(node) {
            // exec code
        },
    }
}
```

ESLint walks the AST once per file and, for each node, looks up `listener[node.type]` — so the key is a string you choose, matched against node types. `node` is the handler's own parameter, passed by ESLint. `context` is injected once per file, and closure variables declared in `create` live for that file only.

## Selector reference

Node types are the simplest form. The full vocabulary is [esquery](https://github.com/estools/esquery), the same selector language as CSS, applied to the AST.

### Combinators

```ts
'JSXElement > JSXIdentifier' // direct child
'JSXElement JSXIdentifier' // any descendant
'JSXElement + JSXText' // immediately following sibling
'JSXElement ~ JSXText' // any following sibling
'Program > *' // any direct child of Program
```

### Attribute predicates

```ts
'CallExpression[callee.name="useState"]' // equals
'Identifier[name=/^use[A-Z]/]' // regex
'Literal[value=42]'
'VariableDeclaration[kind="const"][declare=true]' // multiple, ANDed
'MethodDefinition[static]' // attribute exists
'Identifier:not([name="React"])' // negation
```

### Pseudo-classes

```ts
'Identifier:not(CallExpression > Identifier)' // not matching a sub-selector
'CallExpression:has(ArrowFunctionExpression)' // has a descendant matching
'VariableDeclarator:has(> Identifier)' // :has with a combinator
':matches(FunctionDeclaration, ArrowFunctionExpression)' // either
;(':is(…)', ':where(…)')
```

### Position

```ts
':first-child' / ':last-child'
':nth-child(2)' / ':nth-child(odd)' / ':nth-child(2n+1)'
;(':nth-last-child(1)')
```

### Enter vs exit

```ts
'Program' // on the way DOWN — before children are visited
'Program:exit' // on the way UP — after all children are visited
'CallExpression[callee.name="x"]:exit' // combine a selector with :exit
```

Use **enter** when reading the node itself (raw text, a literal's value). Use **`:exit`** when judging something aggregated from children — counting exports, collecting calls — because the data only exists once the subtree is walked.

### Field access — the one people miss

```ts
'FunctionDeclaration > Identifier.id' // navigate by AST FIELD name
'CallExpression > Identifier.callee'
'Property > Identifier.key'
```

`.id`, `.callee`, `.key` are **field names from the AST spec**, not node types. They target a specific position rather than any descendant.

### Not available

- `:contains()` — that is CSS text matching; use `[attr=/regex/]` instead
- `:hover`, `:focus` — interactive pseudo-classes do not apply
- `:root` — `Program` is the root
- sibling traversal by content — `+` and `~` are positional only

### Silent failure modes

Neither TypeScript nor ESLint catches these:

- **A misspelt key never fires.** `'Program:exited'`, `'ExprotNamedDeclaration'` — the listener map is an index signature, so any string type-checks and simply never matches.
- **A selector with no matches never fires**, and looks identical to a working rule on files that do not trigger it. Test a rule against a file you _know_ violates it.
- **Selectors are matched per node, in walk order** — not queried. A deep selector still runs for every node in the file, so a coarse key plus an internal check is often faster than an elaborate selector.

### Notes

- `meta.schema` is behaviour, not documentation. `[]` actively rejects options at config-parse time.
- `fixable` and `hasSuggestions` are contracts. Calling `suggest` without `hasSuggestions: true` throws at lint time.
- Nothing in `meta` is read by the linter except `type`, `schema` and `messages`. `docs` exists for editors and humans — which is why a registrar's `title` may legitimately repeat `docs.description`.
