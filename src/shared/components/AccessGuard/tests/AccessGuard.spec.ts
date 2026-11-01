import { AccessGuardMocks } from './AccessGuard.mocks'
import { AccessGuardTestUtils } from './AccessGuard.spec.utils'
import { AccessGuardUtils } from '../AccessGuard.utils'
import { AccessMap, Guard, GuardCondition } from '../AccessGuard.types'
import type { ChainCase, GuardCase, MultiFeatureCase } from './AccessGuard.spec.types'

const { isConditionDenied, isGuardActive, resolveGuards } = AccessGuardUtils
const { fullAccess, noAccess, partialAccess } = AccessGuardTestUtils
const {
    capabilityCondition,
    featureCondition,
    hiddenMode,
    whenConditionTypes,
    disabledMode,
    unlessConditionTypes,
    modeConfigs,
    complexGuards,
} = AccessGuardMocks

describe('isConditionDenied', () => {
    describe('capability condition', () => {
        it('should return false when the user has the required capability', () => {
            expect(isConditionDenied(capabilityCondition, fullAccess)).toBe(false)
        })

        it('should return true when the user lacks the required capability', () => {
            expect(isConditionDenied(capabilityCondition, noAccess)).toBe(true)
        })

        it('should return true when the user has only some of multiple required capabilities', () => {
            const multi: GuardCondition = { type: 'capability', capabilities: ['admin', 'admin'] }
            const limited: AccessMap = { capabilities: [], features: {} }
            expect(isConditionDenied(multi, limited)).toBe(true)
        })

        it('should return false when capabilities array is empty (no requirement)', () => {
            const empty: GuardCondition = { type: 'capability', capabilities: [] }
            expect(isConditionDenied(empty, noAccess)).toBe(false)
        })

        it('should return false when capabilities is undefined (defaults to empty)', () => {
            const noCapsProp: GuardCondition = { type: 'capability' }
            expect(isConditionDenied(noCapsProp, noAccess)).toBe(false)
        })
    })

    describe('feature condition', () => {
        it('should return false when the feature is enabled', () => {
            expect(isConditionDenied(featureCondition, fullAccess)).toBe(false)
        })

        it('should return true when the feature is disabled', () => {
            const disabled: AccessMap = { capabilities: [], features: { xmas2025: false } }
            expect(isConditionDenied(featureCondition, disabled)).toBe(true)
        })

        it('should return true when the feature is missing from the map', () => {
            expect(isConditionDenied(featureCondition, noAccess)).toBe(true)
        })

        it.each<MultiFeatureCase>([
            {
                name: 'all enabled',
                access: { capabilities: [], features: { xmas2025: true, darkMode: true } },
                expected: false,
            },
            {
                name: 'one missing',
                access: { capabilities: [], features: { xmas2025: true } },
                expected: true,
            },
            {
                name: 'one disabled',
                access: { capabilities: [], features: { xmas2025: true, darkMode: false } },
                expected: true,
            },
            {
                name: 'all missing',
                access: { capabilities: [], features: {} },
                expected: true,
            },
        ])(
            'should return $expected when multiple features required and $name',
            ({ access, expected }) => {
                const multi: GuardCondition = {
                    type: 'feature',
                    features: ['xmas2025', 'darkMode'],
                }
                expect(isConditionDenied(multi, access)).toBe(expected)
            },
        )

        it('should return false when features array is empty (no requirement)', () => {
            const empty: GuardCondition = { type: 'feature', features: [] }
            expect(isConditionDenied(empty, noAccess)).toBe(false)
        })

        it('should return false when features is undefined (defaults to empty)', () => {
            const noFeaturesProp: GuardCondition = { type: 'feature' }
            expect(isConditionDenied(noFeaturesProp, noAccess)).toBe(false)
        })
    })

    describe('custom condition', () => {
        it('should return false when predicate returns true', () => {
            const condition: GuardCondition = { type: 'custom', predicate: () => true }
            expect(isConditionDenied(condition, noAccess)).toBe(false)
        })

        it('should return true when predicate returns false', () => {
            const condition: GuardCondition = { type: 'custom', predicate: () => false }
            expect(isConditionDenied(condition, noAccess)).toBe(true)
        })

        it('should pass the access map to the predicate', () => {
            const predicate = vi.fn().mockReturnValue(true)
            const condition: GuardCondition = { type: 'custom', predicate }
            isConditionDenied(condition, fullAccess)
            expect(predicate).toHaveBeenCalledWith(fullAccess)
        })

        it('should allow predicate to inspect capabilities', () => {
            const condition: GuardCondition = {
                type: 'custom',
                predicate: (access) => access.capabilities.includes('admin'),
            }
            expect(isConditionDenied(condition, fullAccess)).toBe(false)
            expect(isConditionDenied(condition, noAccess)).toBe(true)
        })

        it('should allow predicate to inspect features', () => {
            const condition: GuardCondition = {
                type: 'custom',
                predicate: (access) => access.features['xmas2025'] === true,
            }
            expect(isConditionDenied(condition, fullAccess)).toBe(false)
            expect(isConditionDenied(condition, noAccess)).toBe(true)
        })
    })
})

describe('isGuardActive', () => {
    describe('when clause', () => {
        it('should be active when the condition is denied', () => {
            const guard: Guard = {
                when: { type: 'capability', capabilities: ['admin'] },
                then: hiddenMode,
            }
            expect(isGuardActive(guard, noAccess)).toBe(true)
        })

        it('should be inactive when the condition is satisfied', () => {
            const guard: Guard = {
                when: { type: 'capability', capabilities: ['admin'] },
                then: hiddenMode,
            }
            expect(isGuardActive(guard, fullAccess)).toBe(false)
        })

        whenConditionTypes.forEach(({ name, condition, deniedAccess, grantedAccess }) => {
            it(`should activate with "when" for ${name} condition when denied`, () => {
                const guard: Guard = { when: condition, then: hiddenMode }
                expect(isGuardActive(guard, deniedAccess)).toBe(true)
            })

            it(`should not activate with "when" for ${name} condition when granted`, () => {
                const guard: Guard = { when: condition, then: hiddenMode }
                expect(isGuardActive(guard, grantedAccess)).toBe(false)
            })
        })
    })

    describe('unless clause', () => {
        it('should be active when the "unless" condition is NOT denied (user has access)', () => {
            const guard: Guard = {
                unless: { type: 'capability', capabilities: ['admin'] },
                then: disabledMode,
            }
            expect(isGuardActive(guard, fullAccess)).toBe(true)
        })

        it('should be inactive when the "unless" condition IS denied (user lacks access)', () => {
            const guard: Guard = {
                unless: { type: 'capability', capabilities: ['admin'] },
                then: disabledMode,
            }
            expect(isGuardActive(guard, noAccess)).toBe(false)
        })

        unlessConditionTypes.forEach(({ name, condition, activeAccess, inactiveAccess }) => {
            it(`should activate with "unless" for ${name} condition when condition is denied`, () => {
                const guard: Guard = { unless: condition, then: disabledMode }
                expect(isGuardActive(guard, activeAccess)).toBe(true)
            })

            it(`should not activate with "unless" for ${name} condition when condition is satisfied`, () => {
                const guard: Guard = { unless: condition, then: disabledMode }
                expect(isGuardActive(guard, inactiveAccess)).toBe(false)
            })
        })
    })
})

describe('resolveGuards', () => {
    it('should return null when guards array is empty', () => {
        expect(resolveGuards([], fullAccess)).toBeNull()
    })

    it('should return null when no guard is active', () => {
        const guards: Guard[] = [
            { when: { type: 'capability', capabilities: ['admin'] }, then: { mode: 'hidden' } },
        ]
        expect(resolveGuards(guards, fullAccess)).toBeNull()
    })

    it('should return the ModeConfig of the first active guard', () => {
        const guards: Guard[] = [
            { when: { type: 'capability', capabilities: ['admin'] }, then: { mode: 'hidden' } },
        ]
        expect(resolveGuards(guards, noAccess)).toEqual({ mode: 'hidden' })
    })

    describe('priority ordering', () => {
        it('should return the first active guard when multiple guards match', () => {
            const guards: Guard[] = [
                { when: { type: 'capability', capabilities: ['admin'] }, then: { mode: 'hidden' } },
                {
                    when: { type: 'capability', capabilities: ['admin'] },
                    then: { mode: 'disabled', reason: 'no admin' },
                },
            ]
            expect(resolveGuards(guards, noAccess)).toEqual({ mode: 'hidden' })
        })

        it('should skip inactive guards and return the first active one', () => {
            const guards: Guard[] = [
                { when: { type: 'feature', features: ['xmas2025'] }, then: { mode: 'hidden' } },
                {
                    when: { type: 'capability', capabilities: ['admin'] },
                    then: { mode: 'disabled', reason: 'no admin' },
                },
            ]
            // partialAccess has xmas2025 enabled but no admin
            expect(resolveGuards(guards, partialAccess)).toEqual({
                mode: 'disabled',
                reason: 'no admin',
            })
        })

        it('should return null when all guards are inactive', () => {
            const guards: Guard[] = [
                { when: { type: 'capability', capabilities: ['admin'] }, then: { mode: 'hidden' } },
                { when: { type: 'feature', features: ['xmas2025'] }, then: { mode: 'disabled' } },
            ]
            expect(resolveGuards(guards, fullAccess)).toBeNull()
        })
    })

    describe('returns correct ModeConfig for each mode', () => {
        modeConfigs.forEach(({ name, config }) => {
            it(`should return "${name}" mode config`, () => {
                const guards: Guard[] = [
                    { when: { type: 'capability', capabilities: ['admin'] }, then: config },
                ]
                const result = resolveGuards(guards, noAccess)
                expect(result).not.toBeNull()
                expect(result!.mode).toBe(config.mode)
            })
        })
    })

    describe('mixed when and unless guards', () => {
        it('should resolve "when" guard before "unless" guard based on array order', () => {
            const guards: Guard[] = [
                { when: { type: 'capability', capabilities: ['admin'] }, then: { mode: 'hidden' } },
                {
                    unless: { type: 'feature', features: ['xmas2025'] },
                    then: { mode: 'tooltip', text: 'Soon' },
                },
            ]
            expect(resolveGuards(guards, noAccess)).toEqual({ mode: 'hidden' })
        })

        it('should resolve "unless" guard before "when" guard based on array order', () => {
            const guards: Guard[] = [
                {
                    unless: { type: 'feature', features: ['xmas2025'] },
                    then: { mode: 'tooltip', text: 'Soon' },
                },
                { when: { type: 'capability', capabilities: ['admin'] }, then: { mode: 'hidden' } },
            ]
            // noAccess: unless xmas2025 → condition denied → guard INACTIVE, then when admin → denied → ACTIVE
            expect(resolveGuards(guards, noAccess)).toEqual({ mode: 'hidden' })
        })

        it('should activate "unless" guard when user has the condition', () => {
            const guards: Guard[] = [
                {
                    unless: { type: 'feature', features: ['xmas2025'] },
                    then: { mode: 'tooltip', text: 'Soon' },
                },
                { when: { type: 'capability', capabilities: ['admin'] }, then: { mode: 'hidden' } },
            ]
            // fullAccess: unless xmas2025 → condition NOT denied → guard ACTIVE
            expect(resolveGuards(guards, fullAccess)).toEqual({ mode: 'tooltip', text: 'Soon' })
        })

        it('should skip inactive "unless" and match subsequent "when" guard', () => {
            const guards: Guard[] = [
                {
                    unless: { type: 'capability', capabilities: ['admin'] },
                    then: { mode: 'disabled' },
                },
                { when: { type: 'feature', features: ['darkMode'] }, then: { mode: 'hidden' } },
            ]
            // noAccess: unless admin → condition denied → guard INACTIVE, when darkMode → denied → ACTIVE
            expect(resolveGuards(guards, noAccess)).toEqual({ mode: 'hidden' })
        })
    })

    describe('custom predicate guards', () => {
        it('should resolve a custom guard that checks combined access', () => {
            const guard: Guard = {
                when: {
                    type: 'custom',
                    predicate: (access) =>
                        access.capabilities.includes('admin') && access.features['xmas2025'],
                },
                then: { mode: 'visible' },
            }
            // fullAccess has both → predicate returns true → condition NOT denied → guard inactive
            expect(resolveGuards([guard], fullAccess)).toBeNull()
            // noAccess has neither → predicate returns false → condition denied → guard active
            expect(resolveGuards([guard], noAccess)).toEqual({ mode: 'visible' })
        })

        it('should resolve custom guard that always denies', () => {
            const guard: Guard = {
                when: { type: 'custom', predicate: () => false },
                then: { mode: 'hidden' },
            }
            expect(resolveGuards([guard], fullAccess)).toEqual({ mode: 'hidden' })
        })

        it('should resolve custom guard that always grants', () => {
            const guard: Guard = {
                when: { type: 'custom', predicate: () => true },
                then: { mode: 'hidden' },
            }
            expect(resolveGuards([guard], noAccess)).toBeNull()
        })
    })

    describe('single guard scenarios', () => {
        it.each<GuardCase>([
            {
                name: 'hidden when no admin',
                guard: {
                    when: { type: 'capability', capabilities: ['admin'] },
                    then: { mode: 'hidden' },
                },
                access: noAccess,
                expected: { mode: 'hidden' },
            },
            {
                name: 'visible when no admin',
                guard: {
                    when: { type: 'capability', capabilities: ['admin'] },
                    then: { mode: 'visible' },
                },
                access: noAccess,
                expected: { mode: 'visible' },
            },
            {
                name: 'disabled when feature missing',
                guard: {
                    when: { type: 'feature', features: ['xmas2025'] },
                    then: { mode: 'disabled', reason: 'Feature off' },
                },
                access: noAccess,
                expected: { mode: 'disabled', reason: 'Feature off' },
            },
            {
                name: 'tooltip when feature missing',
                guard: {
                    when: { type: 'feature', features: ['xmas2025'] },
                    then: { mode: 'tooltip', text: 'Coming soon' },
                },
                access: noAccess,
                expected: { mode: 'tooltip', text: 'Coming soon' },
            },
            {
                name: 'null when admin has access',
                guard: {
                    when: { type: 'capability', capabilities: ['admin'] },
                    then: { mode: 'hidden' },
                },
                access: fullAccess,
                expected: null,
            },
        ])('should resolve $name', ({ guard, access, expected }) => {
            const result = resolveGuards([guard], access)
            if (expected === null) {
                expect(result).toBeNull()
            } else {
                expect(result).toEqual(expected)
            }
        })
    })

    describe('complex guard chains', () => {
        it.each<ChainCase>([
            {
                name: 'first guard matches (missing beta feature)',
                access: { capabilities: ['admin'], features: { xmas2025: true } },
                expectedMode: 'hidden',
            },
            {
                name: 'second guard matches (missing admin, beta enabled)',
                access: { capabilities: [], features: { beta: true, xmas2025: true } },
                expectedMode: 'disabled',
            },
            {
                name: 'third guard matches (has admin, has beta, missing xmas2025 → custom fires)',
                access: { capabilities: ['admin'], features: { beta: true } },
                expectedMode: 'soft-disabled',
            },
            {
                name: 'fourth guard matches (has admin, has beta, has xmas2025 → unless fires)',
                access: { capabilities: ['admin'], features: { beta: true, xmas2025: true } },
                expectedMode: 'tooltip',
            },
        ])('should match $expectedMode when $name', ({ access, expectedMode }) => {
            const result = resolveGuards(complexGuards, access)
            expect(result).not.toBeNull()
            expect(result!.mode).toBe(expectedMode)
        })
    })
})
