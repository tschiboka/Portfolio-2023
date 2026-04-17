import { CacheKeyBuilder, QueryKey } from '../Key'

// ── CacheKeyBuilder ──────────────────────────────────────────────────────────

describe('CacheKeyBuilder', () => {
    describe('build (base key only)', () => {
        it('should return an array with just the key', () => {
            expect(new CacheKeyBuilder('users').build()).toEqual(['users'])
        })

        it('should return a different array reference on every build call', () => {
            const builder = new CacheKeyBuilder('users')
            const a = builder.build()
            const b = builder.build()
            expect(a).toEqual(b)
            expect(a).not.toBe(b)
        })
    })

    describe('feature', () => {
        it('should append the feature segment to the key', () => {
            expect(new CacheKeyBuilder('users').feature('list').build()).toEqual(['users', 'list'])
        })

        it('should allow an empty string feature', () => {
            expect(new CacheKeyBuilder('users').feature('').build()).toEqual(['users', ''])
        })

        it('should override a previous feature when called twice', () => {
            const result = new CacheKeyBuilder('users').feature('list').feature('detail').build()
            expect(result).toEqual(['users', 'detail'])
        })
    })

    describe('byId', () => {
        it('should append a string id', () => {
            expect(new CacheKeyBuilder('users').byId('abc').build()).toEqual(['users', 'abc'])
        })

        it('should append a numeric id', () => {
            expect(new CacheKeyBuilder('users').byId(42).build()).toEqual(['users', 42])
        })

        it('should append id 0 (falsy but defined)', () => {
            expect(new CacheKeyBuilder('users').byId(0).build()).toEqual(['users', 0])
        })

        it('should omit id when undefined is passed', () => {
            expect(new CacheKeyBuilder('users').byId(undefined).build()).toEqual(['users'])
        })

        it('should omit id when called with no argument', () => {
            expect(new CacheKeyBuilder('users').byId().build()).toEqual(['users'])
        })

        it('should override a previous id when called twice', () => {
            const result = new CacheKeyBuilder('users').byId('first').byId('second').build()
            expect(result).toEqual(['users', 'second'])
        })
    })

    describe('byFilters', () => {
        it('should append a filters object', () => {
            const filters = { status: 'active', page: 1 }
            expect(new CacheKeyBuilder('users').byFilters(filters).build()).toEqual([
                'users',
                filters,
            ])
        })

        it('should append an empty filters object', () => {
            expect(new CacheKeyBuilder('users').byFilters({}).build()).toEqual(['users', {}])
        })

        it('should override previous filters when called twice', () => {
            const result = new CacheKeyBuilder('users')
                .byFilters({ a: 1 })
                .byFilters({ b: 2 })
                .build()
            expect(result).toEqual(['users', { b: 2 }])
        })
    })

    describe('chaining combinations', () => {
        it('feature + byId should produce [key, feature, id]', () => {
            const result = new CacheKeyBuilder('users').feature('detail').byId('abc').build()
            expect(result).toEqual(['users', 'detail', 'abc'])
        })

        it('feature + byFilters should produce [key, feature, filters]', () => {
            const filters = { sort: 'name' }
            const result = new CacheKeyBuilder('users').feature('list').byFilters(filters).build()
            expect(result).toEqual(['users', 'list', filters])
        })

        it('byId + byFilters should produce [key, id, filters]', () => {
            const filters = { include: 'posts' }
            const result = new CacheKeyBuilder('users').byId(7).byFilters(filters).build()
            expect(result).toEqual(['users', 7, filters])
        })

        it('feature + byId + byFilters should produce [key, feature, id, filters]', () => {
            const filters = { expand: true }
            const result = new CacheKeyBuilder('users')
                .feature('detail')
                .byId(99)
                .byFilters(filters)
                .build()
            expect(result).toEqual(['users', 'detail', 99, filters])
        })

        it('order of chaining should not matter', () => {
            const filters = { expand: true }
            const a = new CacheKeyBuilder('x').byFilters(filters).byId(1).feature('f').build()
            const b = new CacheKeyBuilder('x').feature('f').byId(1).byFilters(filters).build()
            expect(a).toEqual(b)
        })
    })

    describe('immutability', () => {
        it('should not mutate the original builder when chaining', () => {
            const base = new CacheKeyBuilder('items')
            const withFeature = base.feature('list')
            const withId = base.byId(5)

            expect(base.build()).toEqual(['items'])
            expect(withFeature.build()).toEqual(['items', 'list'])
            expect(withId.build()).toEqual(['items', 5])
        })

        it('branching from the same builder should produce independent keys', () => {
            const base = new CacheKeyBuilder('items').feature('detail')
            const branchA = base.byId(1)
            const branchB = base.byId(2)

            expect(branchA.build()).toEqual(['items', 'detail', 1])
            expect(branchB.build()).toEqual(['items', 'detail', 2])
        })

        it('adding filters to one branch should not affect the other', () => {
            const base = new CacheKeyBuilder('items').byId(1)
            const withFilters = base.byFilters({ active: true })

            expect(base.build()).toEqual(['items', 1])
            expect(withFilters.build()).toEqual(['items', 1, { active: true }])
        })
    })

    describe('edge cases', () => {
        it('should handle a key with special characters', () => {
            expect(new CacheKeyBuilder('my-complex_key.v2').build()).toEqual(['my-complex_key.v2'])
        })

        it('should handle an empty string key', () => {
            expect(new CacheKeyBuilder('').build()).toEqual([''])
        })

        it('should handle numeric id of 0', () => {
            expect(new CacheKeyBuilder('k').byId(0).build()).toEqual(['k', 0])
        })

        it('should handle empty string id', () => {
            expect(new CacheKeyBuilder('k').byId('').build()).toEqual(['k', ''])
        })

        it('should handle filters with nested objects', () => {
            const filters = { nested: { deep: { value: 42 } } }
            expect(new CacheKeyBuilder('k').byFilters(filters).build()).toEqual(['k', filters])
        })

        it('should produce correct output with all segments undefined except key', () => {
            const result = new CacheKeyBuilder('k').byId(undefined).build()
            expect(result).toEqual(['k'])
        })
    })
})

// ── QueryKey (getter-based registry) ─────────────────────────────────────────

describe('QueryKey', () => {
    const expectedKeys: Record<string, string> = {
        AppSettings: 'app-settings',
        Categories: 'categories',
        RehydrateSession: 'rehydrate-session',
        XmasPagePing: 'xmas-page-ping',
        XmasMessage: 'xmas-message',
        XmasCandles: 'xmas-candles',
        TypistRound: 'typist-round',
        LevelNames: 'level-names',
        Level: 'level',
        LevelCreate: 'level-create',
        AnagramMap: 'word-anagram-map',
        WordFrequencies: 'word-frequencies',
    }

    describe('each key should return a CacheKeyBuilder with the correct base key', () => {
        it.each(Object.entries(expectedKeys))('%s → ["%s"]', (property, baseKey) => {
            const builder = QueryKey[property as keyof typeof QueryKey]
            expect(builder).toBeInstanceOf(CacheKeyBuilder)
            expect(builder.build()).toEqual([baseKey])
        })
    })

    describe('getter freshness', () => {
        it('should return a new builder instance on every access', () => {
            const a = QueryKey.AppSettings
            const b = QueryKey.AppSettings
            expect(a).not.toBe(b)
        })

        it('chaining on one access should not affect the next access', () => {
            const withId = QueryKey.Level.byId('fire')
            const fresh = QueryKey.Level

            expect(withId.build()).toEqual(['level', 'fire'])
            expect(fresh.build()).toEqual(['level'])
        })
    })

    describe('real-world usage patterns', () => {
        it('simple key build', () => {
            expect(QueryKey.AppSettings.build()).toEqual(['app-settings'])
        })

        it('key with byId (string)', () => {
            expect(QueryKey.Level.byId('forest').build()).toEqual(['level', 'forest'])
        })

        it('key with byId (number)', () => {
            expect(QueryKey.Level.byId(3).build()).toEqual(['level', 3])
        })

        it('key with byId (undefined) should omit id', () => {
            expect(QueryKey.RehydrateSession.byId(undefined).build()).toEqual(['rehydrate-session'])
        })

        it('key with feature', () => {
            expect(QueryKey.Categories.feature('tree').build()).toEqual(['categories', 'tree'])
        })

        it('key with byFilters', () => {
            const filters = { difficulty: 'hard' }
            expect(QueryKey.LevelNames.byFilters(filters).build()).toEqual(['level-names', filters])
        })

        it('key with feature + byId + byFilters', () => {
            const filters = { includeArchived: true }
            const result = QueryKey.WordFrequencies.feature('search')
                .byId(42)
                .byFilters(filters)
                .build()
            expect(result).toEqual(['word-frequencies', 'search', 42, filters])
        })

        it('invalidation pattern — partial key match', () => {
            const allLevels = QueryKey.Level.build()
            const specificLevel = QueryKey.Level.byId('fire').build()

            expect(specificLevel[0]).toBe(allLevels[0])
            expect(specificLevel.length).toBeGreaterThan(allLevels.length)
        })
    })
})
