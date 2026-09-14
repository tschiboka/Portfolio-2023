# Rules

The rule registry. One typed entry per rule; `rules sync` reads it and emits the
linter config.

- **Source of truth.** Skills describe _why_; this folder decides _what is
  enforced_.
- **Typed, not JSON** — the enforcement block is a discriminated union.
- **Generated output is never hand-edited.**

## Entry

Every field, with generic values:

```ts
{
    id: 'domain-rule-name',
    title: 'A short statement of the rule',
    description: 'What it asserts, in one sentence, naming the files it applies to.',
    rationale: 'Why the rule exists. What goes wrong without it.',
    scope: {
        include: ['src/**/*.ts'],
        exclude: ['**/*.spec.*'],
    },
    severity: 'error',
    enforcement: {
        eslint: {
            requires: '>=8',
            plugin: 'local/rules/domain-rule-name',
            options: {},
        },
    },
}
```

| Field           | Required | Notes                                                              |
| --------------- | -------- | ------------------------------------------------------------------ | ------- |
| `id`            | yes      | kebab-case, unique, stable — it is the handle everything else uses |
| `title`         | yes      | imperative, one clause                                             |
| `description`   | yes      | the assertion, not the reason                                      |
| `rationale`     | yes      | the _why_ — what a reader needs to judge a false positive          |
| `scope.include` | yes      | globs; drives the generated lint config                            |
| `scope.exclude` | yes      | `[]` when nothing is excluded, never omitted                       |
| `severity`      | yes      | `'error'                                                           | 'warn'` |
| `enforcement`   | yes      | keyed by backend — `eslint` today, others as keys                  |
| ↳ `requires`    | yes      | semver range of the linter this rule needs, e.g. `'>=8'`           |
| ↳ `plugin`      | yes      | the rule module the generated config points at                     |

A rule with no mechanical check:

```ts
{
    id: 'domain-unenforceable-rule',
    title: 'A statement no linter can decide',
    description: 'What it asserts.',
    rationale: 'Why it exists.',
    scope: { include: ['src/**/*.ts'], exclude: [] },
    severity: 'error',
    enforcement: null,
    unenforced: 'Why no static check is possible, and who reviews it instead.',
}
```

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
