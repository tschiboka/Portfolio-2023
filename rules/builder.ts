import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Rule } from 'eslint'
import { ESLint } from 'eslint'
import { RuleRegistry } from './registry.js'
import type { LinterKind, RuleRequirement, RuleRegistrar, RuleSeverity } from './types.js'

/** Installed version per linter, e.g. `{ eslint: '9.39.5' }`. Missing means unavailable. */
export type LinterVersions = Partial<Record<LinterKind, string>>

/** The two config fragments derived from the registry, plus the plugin name they sit under. */
export type BuiltStandards = {
    pluginName: string
    rules: Record<string, Rule.RuleModule>
    settings: Record<string, RuleSeverity>
}

/**
 * Compares two `x.y.z` versions by numeric part.
 *
 * @example
 * isAtLeast('9.10.0', '9.9.0') // true
 */
const isAtLeast = (version: string, min: string): boolean => {
    const [major = 0, minor = 0, patch = 0] = version.split('.').map(Number)
    const [minMajor = 0, minMinor = 0, minPatch = 0] = min.split('.').map(Number)

    if (major !== minMajor) return major > minMajor
    if (minor !== minMinor) return minor > minMinor
    return patch >= minPatch
}

/**
 * True when the linter is installed and its version satisfies the requirement.
 * `min` is inclusive, `max` is exclusive.
 *
 * @example
 * isCompatible({ linter: 'eslint', min: '9.0.0' }, { eslint: '9.39.5' }) // true
 */
const isCompatible = (requires: RuleRequirement, versions: LinterVersions): boolean => {
    const version = versions[requires.linter]
    if (!version) return false
    if (!isAtLeast(version, requires.min)) return false
    if (requires.max && isAtLeast(version, requires.max)) return false
    return true
}

export const ruleBuilder = {
    /**
     * Turns enabled, version-compatible registrars into a plugin name, a rule map, and
     * the `id` to severity settings that reference them.
     *
     * @example
     * build(RuleRegistry, 'standards', { eslint: '9.39.5' })
     */
    build: (
        registry: RuleRegistrar[],
        pluginName: string,
        versions: LinterVersions,
    ): BuiltStandards => {
        const enabled = registry
            .filter((registrar) => registrar.enabled)
            .flatMap((registrar) =>
                registrar.rules
                    .filter((rule) => isCompatible(rule.requires, versions))
                    .map((rule) => ({ registrar, rule: rule.rule })),
            )

        return {
            pluginName,
            rules: Object.fromEntries(enabled.map(({ registrar, rule }) => [registrar.id, rule])),
            settings: Object.fromEntries(
                enabled.map(({ registrar }) => [
                    `${pluginName}/${registrar.id}`,
                    registrar.severity,
                ]),
            ),
        }
    },

    /**
     * Writes the built standards as a module the eslint config can import.
     *
     * Rules hold `create` functions, so they are re-imported rather than serialised.
     *
     * @example
     * emit('rules/dist/standards.config.js')
     */
    emit: (target: string, pluginName: string): void => {
        const { rules, settings } = ruleBuilder.build(RuleRegistry, pluginName, {
            eslint: ESLint.version,
        })

        const relativeRegistry = './registry.js'
        const ids = JSON.stringify(Object.keys(rules), null, 4)

        const source = [
            `import { RuleRegistry } from ${JSON.stringify(relativeRegistry)}`,
            '',
            'const collectRules = (ids) =>',
            '    Object.fromEntries(',
            '        ids.flatMap((id) => {',
            '            const registrar = RuleRegistry.find((entry) => entry.id === id)',
            '            if (!registrar) return []',
            '            return registrar.rules.map((rule) => [id, rule.rule])',
            '        }),',
            '    )',
            '',
            `export const ${pluginName} = { rules: collectRules(${ids}) }`,
            '',
            `export const settings = ${JSON.stringify(settings, null, 4)}`,
            '',
        ].join('\n')

        writeFileSync(join(dirname(fileURLToPath(import.meta.url)), target), source)
    },
}

ruleBuilder.emit('standards.config.js', 'standards')
