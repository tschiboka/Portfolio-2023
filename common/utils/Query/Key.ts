import { isDefined } from '../Predicate'

export type CacheKey = Array<string | number | Record<string, unknown>>

type CacheKeyState = {
    key: string
    feature?: string
    id?: string | number
    filters?: Record<string, unknown>
}

export class CacheKeyBuilder {
    private readonly state: CacheKeyState

    constructor(key: string) {
        this.state = { key }
    }

    feature(feature: string): CacheKeyBuilder {
        return Object.assign(new CacheKeyBuilder(this.state.key), {
            state: { ...this.state, feature },
        }) as CacheKeyBuilder
    }

    byId(id?: string | number): CacheKeyBuilder {
        return Object.assign(new CacheKeyBuilder(this.state.key), {
            state: { ...this.state, id },
        }) as CacheKeyBuilder
    }

    byFilters(filters: Record<string, unknown>): CacheKeyBuilder {
        return Object.assign(new CacheKeyBuilder(this.state.key), {
            state: { ...this.state, filters },
        }) as CacheKeyBuilder
    }

    build(): CacheKey {
        return [this.state.key, this.state.feature, this.state.id, this.state.filters].filter(
            isDefined,
        )
    }
}

export const QueryKey = {
    get Likes() {
        return new CacheKeyBuilder('likes')
    },
    get Visits() {
        return new CacheKeyBuilder('visits')
    },
    get AppSettings() {
        return new CacheKeyBuilder('app-settings')
    },
    get ConfirmRegistration() {
        return new CacheKeyBuilder('confirm-registration')
    },
    get Categories() {
        return new CacheKeyBuilder('categories')
    },
    get RehydrateSession() {
        return new CacheKeyBuilder('rehydrate-session')
    },
    get XmasPagePing() {
        return new CacheKeyBuilder('xmas-page-ping')
    },
    get XmasMessage() {
        return new CacheKeyBuilder('xmas-message')
    },
    get XmasCandles() {
        return new CacheKeyBuilder('xmas-candles')
    },
    get TypistRound() {
        return new CacheKeyBuilder('typist-round')
    },
    get LevelNames() {
        return new CacheKeyBuilder('level-names')
    },
    get Level() {
        return new CacheKeyBuilder('level')
    },
    get LevelCreate() {
        return new CacheKeyBuilder('level-create')
    },
    get AnagramMap() {
        return new CacheKeyBuilder('word-anagram-map')
    },
    get WordFrequencies() {
        return new CacheKeyBuilder('word-frequencies')
    },
    get GymRoutines() {
        return new CacheKeyBuilder('gym-routines')
    },
    get GymExercises() {
        return new CacheKeyBuilder('gym-exercises')
    },
    get ActivityFeed() {
        return new CacheKeyBuilder('activity-feed')
    },
}
