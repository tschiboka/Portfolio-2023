import { apiPathBuilder } from '../apiPathBuilder'
import { Paths } from '../Paths'
import { getURL } from '../getURL'
import type { PathKey } from '../Path.types'

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

describe('Paths', () => {
    it('should have Api endpoints with all keys', () => {
        expect(Paths.Server.Api).toEqual({
            Login: 'api/user/login',
            Settings: 'api/settings',
            RegisterUser: 'api/user/register',
            ConfirmRegistration: 'api/user/confirm',
            RehydrateSession: 'api/user/session',
            Categories: 'api/categories',
            Message: 'api/message',
            Like: 'api/like',
            Visit: 'api/visit',
            Schedule: 'api/schedule',
            Breakdowns: 'api/breakdowns',
            Activity: 'api/activity',
        })
    })

    it('should have Projects endpoints with all keys', () => {
        expect(Paths.Server.Projects).toEqual({
            Xmas: 'projects/xmas_2025',
            Typist: 'projects/typist',
            WordDuelArena: 'projects/word_duel_arena',
            Gym: 'projects/gym',
        })
    })

    it('should have Client pages with all keys', () => {
        expect(Paths.Client).toEqual({
            Login: '/api/login',
            Register: '/api/register',
            Home: '/api/home',
            EmailVerification: '/api/email-verification',
        })
    })

    it('should give every Api endpoint a value', () => {
        for (const value of Object.values(Paths.Server.Api)) {
            expect(value).toBeTruthy()
        }
    })

    it('should give every Projects endpoint a value', () => {
        for (const value of Object.values(Paths.Server.Projects)) {
            expect(value).toBeTruthy()
        }
    })
})

describe('apiPathBuilder', () => {
    it.each(Object.keys(Paths.Server.Api))('should build the API path for %s', (key) => {
        const result = apiPathBuilder(key as PathKey)
        expect(result).toMatch(
            new RegExp(`${Paths.Server.Api[key as keyof typeof Paths.Server.Api]}$`),
        )
    })

    it.each(Object.keys(Paths.Server.Projects))('should build the project path for %s', (key) => {
        const result = apiPathBuilder(key as PathKey, 'Projects')
        expect(result).toMatch(
            new RegExp(`${Paths.Server.Projects[key as keyof typeof Paths.Server.Projects]}$`),
        )
    })

    it('should prepend the base URL', () => {
        expect(apiPathBuilder('Login')).toMatch(/^https?:\/\//)
    })
})
