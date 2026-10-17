# `import-order`

Two-tier sorting — **style first, path second**. Within one style and one path, order
is free. There is no alphabetical requirement anywhere in a file's imports.

The standard this encodes lives in [`AGENTS.md` §1.2](../../AGENTS.md); this folder
decides what is enforced.

## Style

| #   | Style                   | Example                                           |
| --- | ----------------------- | ------------------------------------------------- |
| 1   | namespace               | `import * as utils from './utils'`                |
| 2   | default                 | `import axios from 'axios'`                       |
| 3   | mixed default and named | `import React, { useState } from 'react'`         |
| 4   | named                   | `import { screen } from '@testing-library/react'` |
| 5   | type-only               | `import type { User } from './types'`             |
| 6   | side-effect             | `import './styles.css'`                           |

## Path

| #   | Path                              | Example                                       |
| --- | --------------------------------- | --------------------------------------------- |
| 1   | external package                  | `'react'`                                     |
| 2   | external package, scoped          | `'@tanstack/react-query'`                     |
| 3   | aliased internal                  | `'@common-utils'`, `'@shared-components/Nav'` |
| 4   | same-directory relative           | `'./Button'`, `'./types'`                     |
| 5   | parent-relative, shallowest first | `'../Button'` before `'../../utils'`          |
| 6   | styles and assets                 | `'./styles.css'`, `'@portfolio/assets/x.png'` |

Ours are the aliases the rule carries, not every path that happens to carry `@`: a bare package
ranks first, a scoped one second, ours third, so `'@tanstack/react-query'` precedes
`'@common-utils'` though both carry `@`. An alias declared without the convention is not in
[`AliasPrefixes`](../aliases.ts) either, so it ranks as an external package. Each of
the three files that declares an alias warns that a new one belongs there too.

The two relative ranks, and the one inversion left:

1. Same-directory comes before parent-relative, which sorts shallowest first:

    ```ts
    import { TableUtils } from './Table.utils'
    import { Overlay } from '../Overlay'
    import { Card } from '../../Card'
    ```

2. A type-only import comes **after** every value import, whatever their paths — the one
   rank here that reads against habit:

    ```ts
    import { TableUtils } from './Table.utils'
    import type { Dictionary } from '@common-utils'
    ```

## Edges

- A type-only import is style 5 whatever shape carries it: `import type X from 'x'`,
  `import type { A } from 'x'`, `import type * as ns from 'x'`.
- `import X, * as ns from 'x'` is style 3, with default and named.
- `import { type A } from 'x'` is style 4 — a named import whose specifier carries a type.
  Whether that shape is allowed at all belongs to `no-mixed-import-kind`, which flags only a
  statement carrying a value and a type together.
- A specifier ending in an asset suffix — a stylesheet, image, sound, video, font, document,
  model or shader — takes path rank 6 whatever its style. The full set lives in
  [`ImportOrder.constants.ts`](ImportOrder.constants.ts) rather than here, so growing it is one
  edit and the standard cannot fall behind.
- A suffix outside that list is part of a name, not an asset: `'./Settings.types'` stays
  same-directory. No list of module extensions can stand in for the asset suffixes, because
  this project's role names read as extensions.
- Side-effect imports keep their order among themselves: two stylesheets swapped is a
  different cascade, so the rule reads their existing sequence and never sorts it.
- Dynamic `import('x')` is an expression, not a statement, and is out of scope.
- Re-exports (`export … from`) follow every import. A barrel's own order is
  [`AGENTS.md` §1.4](../../AGENTS.md).

## Worked example

```ts
import userEvent from '@testing-library/user-event'
import { screen, within, waitFor } from '@testing-library/react'
import { isDefined } from '@common-utils'
import type { BoundFunctions, queries } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'
import type { Dictionary, Nullish } from '@common-utils'
import './Accessor.styles.css'
```

Default before named, external before aliased inside each style, every type after every
value, and the stylesheet last. Note the same path may appear twice — once as a value,
once as a type — which the two statements keep separate and both styles allow.

## What the rule can check

- The sequence of import statements, keyed by `(style, path)`.
- Everything else is free: which of two external named imports comes first, and where a
  blank line or a comment falls, are not the rule's business.

## Example

```ts
// 1. Namespace imports
import _ as utils from 'react'
import _ as helpers from '@tanstack/react-query'
import _ as shared from '@common-utils'
import _ as local from './utils'
import \* as parent from '../utils'

// 2. Default imports
import axios from 'axios'
import QueryClient from '@tanstack/query-core'
import SharedComponent from '@shared-components/Button'
import Button from './Button'
import ParentComponent from '../Button'

// 3. Mixed default and named imports
import React, { useState } from 'react'
import { default as Query, useQuery } from '@tanstack/react-query'
import Shared, { helper } from '@common-utils'
import Local, { localHelper } from './utils'
import Parent, { parentHelper } from '../utils'

// 4. Named imports
import { screen } from 'testing-library'
import { useQueryClient } from '@tanstack/react-query'
import { sharedHelper } from '@common-utils'
import { LocalHelper } from './utils'
import { ParentHelper } from '../utils'

// 5. Type-only imports
import type { ReactNode } from 'react'
import type { QueryKey } from '@tanstack/react-query'
import type { SharedType } from '@common-utils'
import type { LocalType } from './types'
import type { ParentType } from '../types'

// 6. Side-effect imports
import 'polyfill'
import 'another-polyfill'
import './setup'
import '../setup'

// 7. Asset imports — assets rank last regardless of path
import styles from 'package/styles.css'
import sharedStyles from '@shared-components/styles.scss'
import localStyles from './styles.css'
import parentStyles from '../styles.scss'
import logo from '@common-utils/assets/logo.svg'
import icon from './assets/icon.png'
import photo from '../assets/photo.jpg'
import image from './assets/image.jpeg'
import webp from './assets/image.webp'
import audio from './assets/audio.mp3'
import text from './assets/file.txt'
import document from './assets/file.pdf'
```
