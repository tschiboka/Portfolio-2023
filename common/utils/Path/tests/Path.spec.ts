import { apiPathBuilder } from '../apiPathBuilder'
import { Paths, apiRoutes, projectRoutes } from '../Path'
import { getURL } from '../getURL'

// ── getURL ───────────────────────────────────────────────────────────────────

describe('getURL', () => {
    const originalHostname = window.location.hostname

    afterEach(() => {
        Object.defineProperty(window, 'location', {
            value: { hostname: originalHostname },
            writable: true,
        })
    })

    it('should return localhost URL for localhost', () => {
        Object.defineProperty(window, 'location', {
            value: { hostname: 'localhost' },
            writable: true,
        })
        expect(getURL()).toBe('http://localhost:5000')
    })

    it('should return localhost URL for 127.0.0.1', () => {
        Object.defineProperty(window, 'location', {
            value: { hostname: '127.0.0.1' },
            writable: true,
        })
        expect(getURL()).toBe('http://localhost:5000')
    })

    it('should return production URL for other hostnames', () => {
        Object.defineProperty(window, 'location', {
            value: { hostname: 'example.com' },
            writable: true,
        })
        expect(getURL()).toBe('https://portfolio-2023-nf5z.onrender.com')
    })
})

// ── Paths ────────────────────────────────────────────────────────────────────

describe('Paths', () => {
    it('should have Api namespace with all keys', () => {
        expect(Paths.Api).toEqual({
            Login: 'Login',
            Settings: 'Settings',
            RegisterUser: 'RegisterUser',
            ConfirmRegistration: 'ConfirmRegistration',
            RehydrateSession: 'RehydrateSession',
            Categories: 'Categories',
        })
    })

    it('should have Projects namespace with all keys', () => {
        expect(Paths.Projects).toEqual({
            Xmas: 'Xmas',
            Typist: 'Typist',
            WordDuelArena: 'WordDuelArena',
        })
    })
})

// ── apiRoutes / projectRoutes ────────────────────────────────────────────────

describe('apiRoutes', () => {
    it('should map every Paths.Api key to a route segment', () => {
        for (const key of Object.values(Paths.Api)) {
            expect(apiRoutes[key]).toBeDefined()
        }
    })

    it.each([
        ['Login', 'login'],
        ['Settings', 'settings'],
        ['RegisterUser', 'user'],
        ['ConfirmRegistration', 'confirm'],
        ['RehydrateSession', 'session'],
        ['Categories', 'categories'],
    ])('should map %s to %s', (key, route) => {
        expect(apiRoutes[key]).toBe(route)
    })
})

describe('projectRoutes', () => {
    it('should map every Paths.Projects key to a route segment', () => {
        for (const key of Object.values(Paths.Projects)) {
            expect(projectRoutes[key]).toBeDefined()
        }
    })

    it.each([
        ['Xmas', 'projects/xmas_2025'],
        ['Typist', 'projects/typist'],
        ['WordDuelArena', 'projects/word_duel_arena'],
    ])('should map %s to %s', (key, route) => {
        expect(projectRoutes[key]).toBe(route)
    })
})

// ── apiPathBuilder ───────────────────────────────────────────────────────────

describe('apiPathBuilder', () => {
    it.each([
        [Paths.Api.Login, '/api/login'],
        [Paths.Api.Settings, '/api/settings'],
        [Paths.Api.RegisterUser, '/api/user'],
        [Paths.Api.ConfirmRegistration, '/api/confirm'],
        [Paths.Api.RehydrateSession, '/api/session'],
        [Paths.Api.Categories, '/api/categories'],
    ])('should build API path for %s → %s', (pathKey, expected) => {
        const result = apiPathBuilder(pathKey)
        expect(result).toMatch(new RegExp(`${expected}$`))
    })

    it.each([
        [Paths.Projects.Xmas, '/projects/xmas_2025'],
        [Paths.Projects.Typist, '/projects/typist'],
        [Paths.Projects.WordDuelArena, '/projects/word_duel_arena'],
    ])('should build project path for %s → %s', (pathKey, expected) => {
        const result = apiPathBuilder(pathKey)
        expect(result).toMatch(new RegExp(`${expected}$`))
    })

    it('should not include /api prefix for project paths', () => {
        const result = apiPathBuilder(Paths.Projects.Xmas)
        expect(result).not.toContain('/api/')
    })

    it('should include /api prefix for api paths', () => {
        const result = apiPathBuilder(Paths.Api.Login)
        expect(result).toContain('/api/')
    })

    it('should prepend the base URL', () => {
        const result = apiPathBuilder(Paths.Api.Login)
        expect(result).toMatch(/^https?:\/\//)
    })
})
