import type { ElementMap } from '../Harness.types'

/** The markup every harness spec searches — one element per recipe kind, plus a list to filter. */
const html = `
    <button>Save</button>
    <h2>Title</h2>
    <label for="name">Name</label>
    <input id="name" placeholder="Type here" value="Typed" />
    <label for="note">Note</label>
    <input id="note" />
    <label for="file">File</label>
    <input id="file" type="file" multiple />
    <label for="color">Color</label>
    <select id="color"><option>Red</option><option>Blue</option></select>
    <input id="agree" type="checkbox" />
    <label for="agree">Agree</label>
    <input id="checked" type="checkbox" checked />
    <label for="checked">Checked</label>
    <button disabled>Disabled</button>
    <button disabled>Later</button>
    <p hidden>Hidden</p>
    <p>Vanish</p>
    <ul><li>Apple red</li><li>Banana yellow</li><li>Apple green</li></ul>
    <p>Copy text</p>
    <img alt="Logo" />
    <i title="Tip"></i>
    <span data-testid="badge">Badge</span>
    <span>Step 2</span>
    <section aria-label="Panel"><button>Inner</button></section>
`

/** One key per recipe kind, and one per shape a lookup has a rule for. */
const elements = {
    save: { role: 'button', name: 'Save' },
    heading: { role: 'heading' },
    name: { label: 'Name' },
    note: { label: 'Note' },
    placeholder: { placeholder: 'Type here' },
    typed: { displayValue: 'Typed' },
    file: { label: 'File' },
    color: { label: 'Color' },
    agree: { role: 'checkbox', name: 'Agree' },
    checked: { role: 'checkbox', name: 'Checked' },
    disabled: { role: 'button', name: 'Disabled' },
    later: { role: 'button', name: 'Later' },
    hidden: { text: 'Hidden' },
    vanish: { text: 'Vanish' },
    items: { role: 'listitem' },
    copy: { text: 'Copy text' },
    logo: { altText: 'Logo' },
    tip: { title: 'Tip' },
    badge: { testId: 'badge' },
    step2: { text: 'Step 2', hasText: 2 },
    bananaRegex: { role: 'listitem', hasText: /^Banana/ },
    outOfRange: { role: 'listitem', index: 9 },
    apple: { role: 'listitem', hasText: 'Apple' },
    secondApple: { role: 'listitem', hasText: 'Apple', index: 1 },
    banana: { role: 'listitem', hasText: 'Banana' },
    panel: { role: 'region', name: 'Panel' },
    inner: { role: 'button', within: 'panel' },
    late: { role: 'button', name: 'Late' },
    missing: { text: 'Nothing here' },
} satisfies ElementMap

/** How long a late element takes to appear, in the specs that wait for one. */
const appendDelayMs = 0

/** What a harness says when a lookup runs before its feature was rendered. */
const renderFirstMessage = 'call Render() before using the harness'

/** A wait budget short enough that a never-arriving element fails quickly. */
const shortTimeoutMs = 50

export const HarnessMocks = {
    html,
    elements,
    appendDelayMs,
    renderFirstMessage,
    shortTimeoutMs,
}
