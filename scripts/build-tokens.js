import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const tokens = JSON.parse(fs.readFileSync(path.join(root, 'tokens.json'), 'utf8'))

const CssTarget = 'common/ux/tokens.generated.css'
const TsTarget = 'common/ux/Const/Const.generated.ts'
const ScssTarget = 'src/shared/styles/tokens.generated.scss'
const RulesTarget = 'rules/tokens.generated.ts'

/** `accent` → `{ family: 'accent', step: 0 }`; `accent-dark-2` → `{ family: 'accent', step: 2 }`. */
const splitColor = (name) => {
    const [family, ...rest] = name.split('-')
    const suffix = rest.join('-')

    if (suffix === '') return { family, step: '0' }
    if (suffix === 'x') return { family, step: 'X' }

    return { family, step: suffix.replace('dark-', '') }
}

const titleCase = (value) => value.charAt(0).toUpperCase() + value.slice(1)

/** A key an object literal takes bare: an identifier, or a plain index. */
const BareKey = /^(?:[A-Za-z_$][\w$]*|\d+)$/

/** A colour step as an object key, quoted when it would not parse bare. */
export const keyOf = (step) => (BareKey.test(step) ? step : `'${step}'`)

/** `#111` and `#0a0a0a` as channels, so an alpha variant can be written as `rgba()`. */
const rgbOf = (hex) => {
    const digits = hex.slice(1)
    const full =
        digits.length === 3
            ? digits
                  .split('')
                  .map((digit) => digit + digit)
                  .join('')
            : digits

    return [0, 2, 4].map((index) => Number.parseInt(full.slice(index, index + 2), 16))
}

/** A colour at an alpha step: `withAlpha('#111', '5')` reads `rgba(17, 17, 17, 0.05)`. */
const withAlpha = (hex, step) => `rgba(${rgbOf(hex).join(', ')}, ${Number(step) / 100})`

/**
 * Every colour, plain first and then one variant per alpha step.
 *
 * @example
 * colourPairs() // [['black-0', '#000'], …, ['black-0a05', 'rgba(0, 0, 0, 0.05)'], …]
 */
const colourPairs = () => {
    const plain = Object.entries(tokens.color)
    const alpha = Object.entries(tokens.color).flatMap(([name, value]) =>
        tokens.alpha.map((step) => [
            `${name}a${String(step).padStart(2, '0')}`,
            withAlpha(value, step),
        ]),
    )

    return [...plain, ...alpha]
}

/** The `:root` block, in the order the groups appear in `tokens.json`. */
export const buildCss = () => {
    const groups = [
        ['spacing', (name, value) => `--space-${name}: ${value};`],
        [
            'font',
            (name, value) => `--font-${name}: ${value};${noteOf(FontNotes, name, '/*', '*/')}`,
        ],
        [
            'breakpoint',
            (name, value) =>
                value === null
                    ? null
                    : `--bp-${name}: ${value};${noteOf(BreakpointNotes, name, '/*', '*/')}`,
        ],
        [
            'z-index',
            (name, value) => `--z-${name}: ${value};`,
            `Z-index — ${ZIndexOrder}`,
            ZIndexCss,
        ],
    ]

    const blocks = groups.map(([group, line, heading, essay]) => {
        const body = Object.entries(tokens[group])
            .map(([name, value]) => line(name, value))
            .filter(Boolean)
            .map((entry) => `    ${entry}`)
            .join('\n')

        const title = `    /* ${heading ?? titleCase(group)} */`

        return essay === undefined ? `${title}\n${body}` : `${title}\n${indent(essay)}\n${body}`
    })

    const colourBlock = [
        '    /* Colour — plain, then alpha */',
        ...colourPairs().map(([name, value]) => `    --${name}: ${value};`),
    ].join('\n')

    return [':root {', [...blocks, colourBlock].join('\n\n'), '}', ''].join('\n')
}

/** The layer rationale, carried into every generated sheet — the part a reader cannot infer from the names. */
const ZIndexEssay = [
    'Z-Index Layer System',
    '',
    'Replaces arbitrary z-index usage with named semantic layers.',
    'Each layer represents a UI responsibility, not a numeric value.',
    '',
    'Rules:',
    '- Never use raw z-index values in components',
    '- Always use these named layers',
    '- Base is the default; everything else is explicit elevation',
    '',
    'Layers:',
    '',
    'Base     - Default page content (layouts, cards, forms)',
    'Sticky   - Persistent in-page UI (headers, sticky nav)',
    'Dropdown - Anchored transient UI (menus, selects, popovers)',
    '',
    'Panel    - Full-screen UI domain (modals, drawers, dialogs)',
    'Backdrop - Blocking/dimming layer behind panel content',
    'Close    - Panel controls that must sit above content',
    '',
    'Top      - Highest-priority global UI (toasts, system alerts)',
    '',
    'Mental model:',
    'Base → Sticky → Dropdown → Panel → Top',
    '',
    'Panel internals:',
    'Backdrop < Panel < Close',
    '',
    'Note:',
    'If a z-index value is needed outside these layers, it is likely a',
    'design issue, not a missing value.',
]

/** The essay as a block comment, for the CSS and TypeScript mirrors. */
const blockComment = (open) =>
    [open, ...ZIndexEssay.map((line) => (line === '' ? ' *' : ` * ${line}`)), ' */'].join('\n')

/** The essay as a block comment, for the two TypeScript mirrors. */
const ZIndexDoc = blockComment('/**')

/** The essay as a block comment, for the CSS mirror. */
const ZIndexCss = blockComment('/*')

/** The essay as `//` lines, for the SCSS mirror. */
const ZIndexScss = ZIndexEssay.map((line) => (line === '' ? '//' : `// ${line}`)).join('\n')

/** Indents every line of a block by one level. */
const indent = (text) =>
    text
        .split('\n')
        .map((line) => `    ${line}`)
        .join('\n')

/** The layer order — the one thing the layer names do not say about themselves. */
const ZIndexOrder = 'base < sticky < dropdown < backdrop < panel < close < top'

/** What each breakpoint targets — carried from the stylesheet these values replaced. */
const BreakpointNotes = {
    '2xs': 'Extra small devices (iPhone SE)',
    xs: 'Small mobiles',
    sm: 'Small tablets and large smartphones (landscape view)',
    mx: 'Crossover between medium and large',
    md: 'Small tablets (portrait view)',
    lg: 'Tablets and small desktops',
    xl: 'Large tablets and notebooks',
    '2xl': 'Laptops and desktops',
}

/** The typographic role of each step, in type-scale terms. */
const FontNotes = {
    '3xs': 'Fine print',
    '2xs': 'Caption',
    xs: 'Label',
    sm: 'Small body',
    md: 'Body — the size the scale is anchored at',
    lg: 'Subheading',
    xl: 'Heading',
    '2xl': 'Display',
    '3xl': 'Display large',
}

/** A token's note, written as a trailing comment in the syntax of the sheet being built. */
const noteOf = (notes, name, open = '//', close = '') => {
    const note = notes[name]

    return note === undefined ? '' : ` ${open} ${note}${close === '' ? '' : ` ${close}`}`
}

/** The `Const` maps, keeping the key shapes the code already uses. */
export const buildTs = () => {
    const families = {}

    colourPairs().forEach(([name, value]) => {
        const { family, step } = splitColor(name)
        families[family] = { ...families[family], [step]: value }
    })

    const colorBody = Object.entries(families)
        .map(
            ([family, steps]) =>
                `    ${titleCase(family)}: {\n${Object.entries(steps)
                    .map(([step, value]) => `        ${keyOf(step)}: '${value}',`)
                    .join('\n')}\n    },`,
        )
        .join('\n')

    const spacingBody = Object.entries(tokens.spacing)
        .map(([name, value]) => `    ${name}: ${Number.parseInt(value, 10)},`)
        .join('\n')

    const breakpointBody = Object.entries(tokens.breakpoint)
        .map(([name, value]) =>
            value === null
                ? `    '${name}': Infinity,`
                : `    '${name}': ${Number.parseInt(value, 10)},`,
        )
        .join('\n')

    const zIndexBody = Object.entries(tokens['z-index'])
        .map(([name, value]) => `    ${name}: ${value},`)
        .join('\n')

    return [
        '// Generated from tokens.json by `npm run build:tokens` — do not edit.',
        '',
        'export const Spacing = {',
        spacingBody,
        '} as const',
        '',
        'export const Breakpoint = {',
        breakpointBody,
        '} as const',
        '',
        ZIndexDoc,
        'export const ZIndex = {',
        zIndexBody,
        '} as const',
        '',
        'export const Color = {',
        colorBody,
        '} as const',
        '',
    ].join('\n')
}

/** The SCSS variables the stylesheets read: colours, spacing, fonts, breakpoints and layers. */
export const buildScss = () => {
    const colorLines = colourPairs()
        .map(([name, value]) => `$${name}: ${value};`)
        .join('\n')

    const spacingLines = Object.entries(tokens.spacing)
        .map(([name, value]) => `$space-${name}: ${value};`)
        .join('\n')

    const fontLines = Object.entries(tokens.font)
        .map(([name, value]) => `$font-${name}: ${value};${noteOf(FontNotes, name)}`)
        .join('\n')

    const breakpointLines = Object.entries(tokens.breakpoint)
        .filter(([, value]) => value !== null)
        .map(([name, value]) => `$screen-${name}-min: ${value};${noteOf(BreakpointNotes, name)}`)
        .join('\n')

    const zIndexLines = Object.entries(tokens['z-index'])
        .map(([name, value]) => `$z-${name}: ${value};`)
        .join('\n')

    return [
        '// Generated from tokens.json by `npm run build:tokens` — do not edit.',
        '',
        '// Spacing',
        spacingLines,
        '',
        '// Font',
        fontLines,
        '',
        '// Breakpoints — a media query cannot read a custom property',
        breakpointLines,
        '',
        `// Z-index — ${ZIndexOrder}`,
        ZIndexScss,
        zIndexLines,
        '',
        '// Colour — plain, then alpha',
        colorLines,
        '',
    ].join('\n')
}

/** The token names a rule can check a loose name against: the layers, and every colour. */
export const buildRules = () => {
    const names = Object.keys(tokens['z-index'])
        .map((name) => `'${name}'`)
        .join(', ')

    const families = [...new Set(Object.keys(tokens.color).map((name) => name.split('-')[0]))]
        .map((family) => `'${family}'`)
        .join(', ')

    const colours = colourPairs()
        .map(([name]) => `'${name}'`)
        .join(', ')

    return [
        '// Generated from tokens.json by `npm run build:tokens` — do not edit.',
        '',
        ZIndexDoc,
        `export const ZIndexTokens = [${names}] as const`,
        '',
        'export type ZIndexToken = (typeof ZIndexTokens)[number]',
        '',
        `export const ColorFamilies = [${families}] as const`,
        '',
        `export const ColorTokens = [${colours}] as const`,
        '',
        'export type ColorToken = (typeof ColorTokens)[number]',
        '',
    ].join('\n')
}

const targets = [
    [CssTarget, buildCss()],
    [TsTarget, buildTs()],
    [ScssTarget, buildScss()],
    [RulesTarget, buildRules()],
]

/** Importing this module must not rewrite the mirrors, so only the command writes. */
const main = () => {
    if (process.argv.includes('--check')) {
        const stale = targets.filter(([target, expected]) => {
            const file = path.join(root, target)
            const actual = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''

            if (actual !== expected) {
                console.error(`[tokens] ${target} is out of date — run npm run build:tokens`)
                return true
            }

            return false
        })

        if (stale.length > 0) process.exit(1)
    } else {
        const wrote = targets.map(([target, content]) => {
            fs.writeFileSync(path.join(root, target), content)
            return target
        })

        const width = Math.max('file'.length, ...wrote.map((target) => target.length))
        const row = (action, file) => `| ${action.padEnd(8)} | ${file.padEnd(width)} |`

        console.log(
            [
                row('action', 'file'),
                `| ${'-'.repeat(8)} | ${'-'.repeat(width)} |`,
                ...wrote.map((target) => row('wrote', target)),
            ].join('\n'),
        )
    }
}

const invokedDirectly =
    Boolean(process.argv[1]) && import.meta.url === pathToFileURL(process.argv[1]).href

if (invokedDirectly) main()
