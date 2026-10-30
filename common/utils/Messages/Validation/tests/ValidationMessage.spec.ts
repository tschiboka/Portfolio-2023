import { describe, it, expect } from 'vitest'
import { ValidationMessage } from '..'

describe('ValidationMessage.Allowed', () => {
    it('should default to the only mode', () => {
        expect(ValidationMessage.Allowed('name', "letters, space, ' and -")).toBe(
            "Name allows only letters, space, ' and -",
        )
    })

    it.each([
        ['name', "letters, space, ' and -", "Name allows only letters, space, ' and -"],
        ['password', 'an uppercase character', 'Password allows only an uppercase character'],
    ] as const)('should handle %s in the only mode', (field, subject, expected) => {
        expect(ValidationMessage.Allowed(field, subject, 'only')).toBe(expected)
    })

    it.each([
        ['password', 'an uppercase character', 'Password must contain an uppercase character'],
        ['password', 'a number', 'Password must contain a number'],
    ] as const)('should handle %s in the contains mode', (field, subject, expected) => {
        expect(ValidationMessage.Allowed(field, subject, 'contains')).toBe(expected)
    })

    it('should leave an already-capitalised field unchanged', () => {
        expect(ValidationMessage.Allowed('Name', 'letters')).toBe('Name allows only letters')
    })

    it('should capitalise only the first word of a multi-word field', () => {
        expect(ValidationMessage.Allowed('full name', 'letters')).toBe(
            'Full name allows only letters',
        )
    })
})

describe('ValidationMessage.Required', () => {
    it.each([
        ['name', 'Name is required'],
        ['email', 'Email is required'],
        ['password', 'Password is required'],
        ['category', 'Category is required'],
    ] as const)('should capitalise the field for %s', (field, expected) => {
        expect(ValidationMessage.Required(field)).toBe(expected)
    })

    it('should leave an already-capitalised field unchanged', () => {
        expect(ValidationMessage.Required('Name')).toBe('Name is required')
    })

    it('should capitalise only the first word of a multi-word field', () => {
        expect(ValidationMessage.Required('email address')).toBe('Email address is required')
    })
})

describe('ValidationMessage.Invalid', () => {
    it.each([
        ['email', 'Email is not valid'],
        ['date', 'Date is not valid'],
        ['url', 'Url is not valid'],
    ] as const)('should capitalise the field for %s', (field, expected) => {
        expect(ValidationMessage.Invalid(field)).toBe(expected)
    })

    it('should leave an already-capitalised field unchanged', () => {
        expect(ValidationMessage.Invalid('Email')).toBe('Email is not valid')
    })

    it.each([
        ['email', 'a valid email address', 'Email must be a valid email address'],
        ['phone', 'a valid phone number', 'Phone must be a valid phone number'],
    ] as const)('should name what was expected for %s', (field, subject, expected) => {
        expect(ValidationMessage.Invalid(field, subject)).toBe(expected)
    })

    it('should capitalise only the first word of a multi-word field', () => {
        expect(ValidationMessage.Invalid('email address', 'a valid email address')).toBe(
            'Email address must be a valid email address',
        )
    })
})

describe('ValidationMessage.Bound', () => {
    it.each([
        ['name', 3, 'characters', 'at least', 'Name must be at least 3 characters'],
        ['phone', 10, 'digits', 'at least', 'Phone must be at least 10 digits'],
        ['selectedWords', 6, 'words', 'at least', 'SelectedWords must be at least 6 words'],
    ] as const)('should bound %s in the at least direction', (field, count, unit, mode, expected) => {
        expect(ValidationMessage.Bound(field, count, unit, mode)).toBe(expected)
    })

    it.each([
        ['name', 20, 'characters', 'under', 'Name must be under 20 characters'],
        ['bio', 500, 'characters', 'under', 'Bio must be under 500 characters'],
    ] as const)('should bound %s in the under direction', (field, count, unit, mode, expected) => {
        expect(ValidationMessage.Bound(field, count, unit, mode)).toBe(expected)
    })

    it('should render a zero count', () => {
        expect(ValidationMessage.Bound('name', 0, 'characters', 'at least')).toBe(
            'Name must be at least 0 characters',
        )
    })

    it('should capitalise only the first word of a multi-word field', () => {
        expect(ValidationMessage.Bound('full name', 3, 'characters', 'at least')).toBe(
            'Full name must be at least 3 characters',
        )
    })
})

describe('ValidationMessage.Matches', () => {
    it('should capitalise the field and lowercases the other', () => {
        expect(ValidationMessage.Matches('password', 'Confirmation')).toBe(
            'Password must match confirmation',
        )
    })

    it.each([
        ['password', 'password', 'Password must match password'],
        ['email', 'Contact Email', 'Email must match contact email'],
    ] as const)('should match %s against %s', (field, other, expected) => {
        expect(ValidationMessage.Matches(field, other)).toBe(expected)
    })

    it('should leave an already-capitalised field unchanged', () => {
        expect(ValidationMessage.Matches('Password', 'confirmation')).toBe(
            'Password must match confirmation',
        )
    })
})

describe('ValidationMessage.Unique', () => {
    it.each([
        ['email', 'Email must be unique'],
        ['username', 'Username must be unique'],
        ['slug', 'Slug must be unique'],
    ] as const)('should capitalise the field for %s', (field, expected) => {
        expect(ValidationMessage.Unique(field)).toBe(expected)
    })

    it('should leave an already-capitalised field unchanged', () => {
        expect(ValidationMessage.Unique('Email')).toBe('Email must be unique')
    })

    it('should capitalise only the first word of a multi-word field', () => {
        expect(ValidationMessage.Unique('user name')).toBe('User name must be unique')
    })
})

describe('ValidationMessage', () => {
    it('should expose every builder', () => {
        expect(Object.keys(ValidationMessage).sort()).toEqual([
            'Allowed',
            'Bound',
            'Invalid',
            'Matches',
            'Required',
            'Unique',
        ])
    })

    it.each([
        ['Required', ' is required'],
        ['Invalid', ' is not valid'],
        ['Unique', ' must be unique'],
    ] as const)('should handle an empty field for %s', (key, expected) => {
        expect(ValidationMessage[key]('')).toBe(expected)
    })
})
