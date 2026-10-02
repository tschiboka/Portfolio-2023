#!/usr/bin/env node
// UserPromptSubmit hook: if the prompt names a protocol command, inject that command's
// definition so the assistant cannot miss it by not having loaded protocol.md.

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

// Bullets shaped `- \`TOKEN\` / \`TOKEN2\` — definition`, optionally continued on
// indented following lines. Blank lines separate command groups, not definitions.
const parseDefinitions = (markdown) => {
    const definitions = new Map()
    let tokens = null
    let text = []

    const flush = () => {
        if (tokens && text.length) {
            const joined = text.join(' ').replace(/\s+/g, ' ').trim()
            tokens.forEach((token) => definitions.set(token, joined))
        }
        tokens = null
        text = []
    }

    for (const line of markdown.split(/\r?\n/)) {
        const bullet = line.match(/^-\s+(.*)$/)
        if (bullet) {
            flush()
            const rest = bullet[1]
            const found = [...rest.matchAll(/`([A-Z0-9]+)`/g)].map((match) => match[1])
            if (found.length) {
                tokens = found
                text = [rest]
            }
            continue
        }
        if (line.trim() === '') continue
        if (tokens && /^\s+\S/.test(line)) {
            text.push(line.trim())
        } else {
            flush()
        }
    }

    flush()
    return definitions
}

// A capitalised word, or a standalone 1/2/3, counts only when protocol.md defines it.
const requestedTokens = (prompt, definitions) => {
    const found = [...prompt.matchAll(/\b([A-Z][A-Z0-9]*|[123])\b/g)]
        .map((match) => match[1])
        .filter((token) => definitions.has(token))

    return [...new Set(found)]
}

const main = async () => {
    let input
    try {
        input = JSON.parse(await readStdin())
    } catch {
        process.exit(0)
    }

    if (!fs.existsSync(PROTOCOL_PATH)) process.exit(0)

    const definitions = parseDefinitions(fs.readFileSync(PROTOCOL_PATH, 'utf8'))
    const tokens = requestedTokens(input.prompt ?? '', definitions)
    if (!tokens.length) process.exit(0)

    const context = tokens.map((token) => `\`${token}\`: ${definitions.get(token)}`).join('\n')

    console.log(
        JSON.stringify({
            systemMessage: `Protocol command recognized: ${tokens.join(', ')}`,
            hookSpecificOutput: {
                hookEventName: 'UserPromptSubmit',
                additionalContext: `Protocol command definitions from protocol.md (forced into context):\n${context}`,
            },
        }),
    )
}

main()
