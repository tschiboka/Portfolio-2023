---
name: 'create-lint-rule'
access: write
description: 'Creating, registering or amending a rule in `rules/`. The folder shape, the registrar entry, the rule module, and the spec.'
---

AST = Abstract Syntax Tree.

It's a tree-shaped representation of your source code that describes what the code means structurally, rather than storing it as raw text.

| AST node                  | Description                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `Program`                 | The root node representing the entire source file.                                 |
| `VariableDeclaration`     | A variable declaration such as `const x = 1` or `let foo`.                         |
| `VariableDeclarator`      | A single variable being declared, e.g. `x = 1` within `const x = 1`.               |
| `FunctionDeclaration`     | A named function declaration, e.g. `function foo() {}`.                            |
| `FunctionExpression`      | A function used as an expression, e.g. `const foo = function () {}`.               |
| `ArrowFunctionExpression` | An arrow function, e.g. `const foo = () => {}`.                                    |
| `CallExpression`          | A function or method call, e.g. `foo()` or `foo.bar()`.                            |
| `MemberExpression`        | Accessing a property of an object, e.g. `foo.bar` or `foo["bar"]`.                 |
| `Identifier`              | A name/reference such as `foo`, `user`, or `myVariable`.                           |
| `Literal`                 | A literal value such as `"hello"`, `123`, `true`, `null`, or a regular expression. |
| `ReturnStatement`         | A `return` statement, e.g. `return value`.                                         |
| `IfStatement`             | An `if`/`else` conditional statement.                                              |
| `ForStatement`            | A traditional `for` loop, e.g. `for (let i = 0; i < 10; i++)`.                     |
| `ImportDeclaration`       | An ES module import, e.g. `import foo from 'foo'`.                                 |
| `ExportNamedDeclaration`  | A named ES module export, e.g. `export const foo = 1`.                             |

| AST node                 | Description                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `JSXElement`             | A complete JSX element, e.g. `<Button>Save</Button>`.                                            |
| `JSXFragment`            | A JSX fragment, e.g. `<>...</>`.                                                                 |
| `JSXOpeningElement`      | The opening part of an element, e.g. `<Button disabled>`.                                        |
| `JSXClosingElement`      | The closing part of an element, e.g. `</Button>`.                                                |
| `JSXAttribute`           | An attribute on a JSX element, e.g. `disabled` or `className="foo"`.                             |
| `JSXExpressionContainer` | JavaScript embedded inside JSX braces, e.g. `{user.name}`.                                       |
| `JSXText`                | Plain text directly inside JSX, e.g. `Hello` in `<div>Hello</div>`.                              |
| `JSXIdentifier`          | An identifier used within JSX, e.g. `Button` in `<Button />` or `disabled` in `disabled={true}`. |
