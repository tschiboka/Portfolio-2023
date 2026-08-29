import { describe, it, expect } from 'vitest'
import { ApiMessage } from '../ApiMessage'

describe('ApiMessage.ok', () => {
    it('defaults to "OK" when called with no argument', () => {
        expect(ApiMessage.ok()).toBe('OK')
        expect(ApiMessage.ok(undefined)).toBe('OK')
    })

    // Empty string and whitespace are values, not "no argument" — the default applies only to undefined.
    it.each(['Saved', '', '   ', 'OK'])('returns the given message verbatim: %j', (message) => {
        expect(ApiMessage.ok(message)).toBe(message)
    })
})

describe('ApiMessage.notFound', () => {
    it.each([
        ['exercise', 'Exercise not found'],
        ['user', 'User not found'],
        ['verification token', 'Verification token not found'],
        ['muscle groups', 'Muscle groups not found'],
    ])('capitalises and appends "not found": %s', (resource, expected) => {
        expect(ApiMessage.notFound(resource)).toBe(expected)
    })

    it.each([
        ['Exercise', 'Exercise not found'],
        ['Muscle Group', 'Muscle Group not found'],
    ])('leaves an already-capitalised resource unchanged: %s', (resource, expected) => {
        expect(ApiMessage.notFound(resource)).toBe(expected)
    })

    it('handles an empty resource (leading-space phrase)', () => {
        expect(ApiMessage.notFound('')).toBe(' not found')
    })
})

describe('ApiMessage.deleted', () => {
    it.each([
        ['exercise', 'Exercise deleted'],
        ['user', 'User deleted'],
        ['routine', 'Routine deleted'],
    ])('capitalises and appends "deleted": %s', (resource, expected) => {
        expect(ApiMessage.deleted(resource)).toBe(expected)
    })

    it('leaves an already-capitalised resource unchanged', () => {
        expect(ApiMessage.deleted('Exercise')).toBe('Exercise deleted')
    })
})

describe('ApiMessage.created', () => {
    it.each([
        ['message', 'Message created'],
        ['user', 'User created'],
        ['category', 'Category created'],
    ])('capitalises and appends "created": %s', (resource, expected) => {
        expect(ApiMessage.created(resource)).toBe(expected)
    })

    it('leaves an already-capitalised resource unchanged', () => {
        expect(ApiMessage.created('Message')).toBe('Message created')
    })
})

describe('ApiMessage.sent', () => {
    it.each([
        ['confirmation email', 'Confirmation email sent'],
        ['reset password', 'Reset password sent'],
        ['verification code', 'Verification code sent'],
    ])('capitalises and appends "sent": %s', (resource, expected) => {
        expect(ApiMessage.sent(resource)).toBe(expected)
    })

    it('leaves an already-capitalised resource unchanged', () => {
        expect(ApiMessage.sent('Confirmation email')).toBe('Confirmation email sent')
    })
})

describe('ApiMessage.failed', () => {
    it.each([
        ['send notification email', 'Failed to send notification email'],
        ['save changes', 'Failed to save changes'],
        ['load profile', 'Failed to load profile'],
    ])('prepends "Failed to": %s', (resource, expected) => {
        expect(ApiMessage.failed(resource)).toBe(expected)
    })
})

describe('ApiMessage.updated', () => {
    it.each([
        ['settings', 'Settings updated'],
        ['exercise', 'Exercise updated'],
        ['profile', 'Profile updated'],
    ])('capitalises and appends "updated": %s', (resource, expected) => {
        expect(ApiMessage.updated(resource)).toBe(expected)
    })

    it('leaves an already-capitalised resource unchanged', () => {
        expect(ApiMessage.updated('Settings')).toBe('Settings updated')
    })
})

describe('ApiMessage.exists', () => {
    it.each([
        ['user', 'User already exists'],
        ['category', 'Category already exists'],
        ['email', 'Email already exists'],
    ])('capitalises and appends "already exists": %s', (resource, expected) => {
        expect(ApiMessage.exists(resource)).toBe(expected)
    })

    it('leaves an already-capitalised resource unchanged', () => {
        expect(ApiMessage.exists('User')).toBe('User already exists')
    })
})

describe('ApiMessage.required', () => {
    it.each([
        ['user id', 'User id is required'],
        ['token', 'Token is required'],
        ['body', 'Body is required'],
    ])('capitalises and appends "is required": %s', (field, expected) => {
        expect(ApiMessage.required(field)).toBe(expected)
    })

    it('leaves an already-capitalised field unchanged', () => {
        expect(ApiMessage.required('User ID')).toBe('User ID is required')
    })
})

describe('ApiMessage.expired', () => {
    it.each([
        ['token', 'Token expired'],
        ['session', 'Session expired'],
    ])('capitalises and appends "expired": %s', (field, expected) => {
        expect(ApiMessage.expired(field)).toBe(expected)
    })
})

describe('ApiMessage.invalidCredentials', () => {
    it('returns the canonical fixed wording', () => {
        expect(ApiMessage.invalidCredentials()).toBe('Incorrect email or password')
    })
})

describe('ApiMessage.invalidId', () => {
    it.each([
        ['exercise', 'Invalid exercise id'],
        ['routine', 'Invalid routine id'],
        ['', 'Invalid  id'],
    ])('wraps the resource in "Invalid ... id": %j', (resource, expected) => {
        expect(ApiMessage.invalidId(resource)).toBe(expected)
    })

    it('does not capitalise the resource', () => {
        expect(ApiMessage.invalidId('Exercise')).toBe('Invalid Exercise id')
    })
})

describe('ApiMessage fixed wordings', () => {
    it.each([
        ['forbidden', 'Forbidden: access denied!'],
        ['methodNotAllowed', 'Method not allowed'],
        ['notAcceptable', 'Not acceptable'],
        ['gone', 'Gone'],
        ['unprocessableEntity', 'Unprocessable entity'],
        ['tooManyRequests', 'Too many requests'],
        ['badGateway', 'Bad gateway'],
        ['serviceUnavailable', 'Service unavailable'],
        ['gatewayTimeout', 'Gateway timeout'],
    ] as const)('%s() returns the canonical wording', (method, expected) => {
        const call = (ApiMessage[method] as () => string)()
        expect(call).toBe(expected)
    })
})

describe('ApiMessage passthrough messages', () => {
    it.each(['Token expired!', 'Access denied: no JWT token is provided!', '', '   '])(
        'unauthorized passes the reason through: %j',
        (reason) => {
            expect(ApiMessage.unauthorized(reason)).toBe(reason)
        },
    )

    it.each(['Bad Content', '', '   '])('badRequest passes the message through: %j', (message) => {
        expect(ApiMessage.badRequest(message)).toBe(message)
    })

    it.each(['Category exists', '', '  '])('conflict passes the message through: %j', (message) => {
        expect(ApiMessage.conflict(message)).toBe(message)
    })

    it('internalServerError defaults to "Internal Server Error"', () => {
        expect(ApiMessage.internalServerError()).toBe('Internal Server Error')
    })

    it.each(['boom', '', '  '])('internalServerError accepts an override: %j', (message) => {
        expect(ApiMessage.internalServerError(message)).toBe(message)
    })
})

describe('ApiMessage.invalid', () => {
    it.each([
        ['token', 'Invalid token'],
        ['id', 'Invalid id'],
        ['', 'Invalid '],
    ])('capitalises the field as "Invalid <field>": %j', (field, expected) => {
        expect(ApiMessage.invalid(field)).toBe(expected)
    })
})

describe('ApiMessage listing + auth wordings', () => {
    it('listening interpolates a numeric port', () => {
        expect(ApiMessage.listening(5000)).toBe('Listening on 5000')
    })

    it('listening interpolates a string port', () => {
        expect(ApiMessage.listening('8080')).toBe('Listening on 8080')
    })

    it('jwtSecretMissing returns the canonical wording', () => {
        expect(ApiMessage.jwtSecretMissing()).toBe('JWT Private key is not defined!')
    })

    it('missingToken returns the canonical wording', () => {
        expect(ApiMessage.missingToken()).toBe('Access denied: no JWT token is provided!')
    })
})

describe('ApiMessage.dbConnected', () => {
    it('returns the canonical wording', () => {
        expect(ApiMessage.dbConnected()).toBe('Connected to DB')
    })
})

describe('ApiMessage.missingEnv', () => {
    it.each([
        ['DB_STRING', 'DB_STRING not defined in environment'],
        ['JWT_PRIVATE_KEY', 'JWT_PRIVATE_KEY not defined in environment'],
        ['', ' not defined in environment'],
    ])('interpolates the env-var name: %s', (name, expected) => {
        expect(ApiMessage.missingEnv(name)).toBe(expected)
    })
})
