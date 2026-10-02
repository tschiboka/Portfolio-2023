#!/usr/bin/env node
// Stop hook: verify the reply just sent followed the working-style skeleton
// (starts with `-----`, ends with `Happy coding!`, exactly one tagged ask, real tokens).
// Fail-open on anything unexpected so a broken transcript read never traps a session.

const fs = require('node:fs')
const path = require('node:path')

const PROTOCOL_PATH = path.join(__dirname, '..', 'skills', 'protocol.md')

const readStdin = () =>
    new Promise((resolve) => {
        let data = ''
        process.stdin.setEncoding('utf8')
        process.stdin.on('data', (chunk) => (data += chunk))
        process.stdin.on('end', () => resolve(data))
    })

// VS Code writes JSONL records shaped `{ type, data, id, timestamp, parentId }`;
// the reply text is `data.content` on the last `assistant.message` carrying any.
const lastAssistantText = (transcriptPath) => {
    const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean)

    for (let i = lines.length - 1; i >= 0; i--) {
        let entry
        try {
            entry = JSON.parse(lines[i])
        } catch {
            continue
        }
        if (entry.type !== 'assistant.message') continue
        const text = entry.data?.content?.trim()
        if (text) return text
    }

    return null
}

// Tokens are the backticked command names in protocol.md, above the ask-type section.
const validTokens = () => {
    const tokens = new Set()
    try {
        const commands = fs
            .readFileSync(PROTOCOL_PATH, 'utf8')
            .split('## Agent directed question types')[0]
        for (const match of commands.matchAll(/`([A-Z0-9]+)`/g)) tokens.add(match[1])
    } catch {
        // Unreadable protocol file: skip the token check rather than block on it.
    }
    return tokens
}

const ASK_TYPES = ['Question', 'Decide', 'Check', 'Action', 'Document']

const violations = (text) => {
    const problems = []
    const body = text.replace(/```[\s\S]*?```/g, '')
    const asks = body.match(/^.*\?\s*$/gm) ?? []

    if (!text.startsWith('-----')) problems.push('does not start with `-----`')
    if (!/\*{0,2}Happy coding!\*{0,2}\s*$/.test(text))
        problems.push('does not end with `Happy coding!`')
    if (asks.length !== 1) problems.push(`asks ${asks.length} questions instead of exactly one`)

    const askType = text.match(/\*\*(Question|Decide|Check|Action|Document):\*\*/)
    if (!askType || !ASK_TYPES.includes(askType[1]))
        problems.push('does not tag its ask with one of the five ask types')

    const offered = [...text.matchAll(/^>\s*\*\*([A-Z0-9]+)\*\*:/gm)].map((match) => match[1])
    if (asks.length === 1 && !offered.length)
        problems.push('asks a question without listing a `> **TOKEN**:` offer')

    const known = validTokens()
    const unknown = known.size ? offered.filter((token) => !known.has(token)) : []
    if (unknown.length) problems.push(`offers unknown token(s): ${unknown.join(', ')}`)

    return problems
}

const main = async () => {
    let input
    try {
        input = JSON.parse(await readStdin())
    } catch {
        process.exit(0)
    }

    // A hook-forced retry must never be blocked again, or the session loops.
    if (input.stop_hook_active) process.exit(0)

    const transcriptPath = input.transcript_path
    if (!transcriptPath || !fs.existsSync(transcriptPath)) process.exit(0)

    let text
    try {
        text = lastAssistantText(transcriptPath)
        // The final record can lag the Stop event; read again a beat later.
        await new Promise((resolve) => setTimeout(resolve, 300))
        text = lastAssistantText(transcriptPath) ?? text
    } catch {
        process.exit(0)
    }
    if (!text) process.exit(0)

    const problems = violations(text)
    if (!problems.length) process.exit(0)

    console.log(
        JSON.stringify({
            systemMessage: `Reply reformatted: last reply ${problems.join(' and ')} — forced a redo.`,
            hookSpecificOutput: {
                hookEventName: 'Stop',
                decision: 'block',
                reason: `Reply skeleton violation: your last reply ${problems.join(' and ')}. Re-send it wrapped in the mandatory skeleton — do not repeat this note to the user, just fix the formatting.`,
            },
        }),
    )
}

main()
