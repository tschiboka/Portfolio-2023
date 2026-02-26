import '@testing-library/jest-dom'
import {
    validateName,
    validateEmail,
    validatePhone,
    validateMessage,
    MAX_MESSAGE_CHARACTERS,
} from './Contact'

// VALIDATE NAME
// Function Accepts a String
// Returns an Object of Interface Validation Result
// { valid: bool, error: string }
describe('Validate Name', () => {
    it('Should Always Return an Object of Validation Result Type', () => {
        const result = validateName('')
        const emptyOrAnyString = /^$|^.+$/
        expect(result).toMatchObject({
            valid: false,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            error: expect.stringMatching(emptyOrAnyString), // Empty String or Anything
        })
    })

    it('Should Return Invalid if Name Length is 0 Character Long', () => {
        const result = validateName('')
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Return Valid if Name Length is 1 Character Long', () => {
        const result = validateName('A')
        expect(result).toMatchObject({ valid: true })
    })

    it('Should Return Valid if Name Length is 50 Characters Long', () => {
        const FIFTY_CHARS = 'A'.repeat(50)
        const result = validateName(FIFTY_CHARS)
        expect(result).toMatchObject({ valid: true })
    })

    it('Should Return Invalid if Name Length is 51 Characters Long', () => {
        const FIFTY_ONE_CHARS = 'A'.repeat(51)
        const result = validateName(FIFTY_ONE_CHARS)
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Not Accept Special Characters', () => {
        const result = validateName('John@Doe')
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Return Valid for Valid Name Inputs', () => {
        const result = validateName('John Doe')
        expect(result).toMatchObject({ valid: true })
    })
})

// VALIDATE EMAIL
// Function Accepts a String
// Returns an Object of Interface Validation Result
// { valid: bool, error: string }
describe('Validate Email', () => {
    it('Should Always Return an Object of Validation Result Type', () => {
        const result = validateEmail('')
        const emptyOrAnyString = /^$|^.+$/
        expect(result).toMatchObject({
            valid: false,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            error: expect.stringMatching(emptyOrAnyString), // Empty String or Anything
        })
    })

    it('Should Return Invalid if Email Length is 0 Character Long', () => {
        const result = validateEmail('')
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Return Valid if Email Length is 6 Character Long', () => {
        const result = validateEmail('x@x.co')
        expect(result).toMatchObject({ valid: true })
    })

    it('Should Return Valid if Email Length is 254 Characters Long', () => {
        const $254_CHARS = 'a@' + 'a'.repeat(249) + '.com'
        const result = validateEmail($254_CHARS)
        expect(result).toMatchObject({ valid: true })
    })

    it('Should Return Invalid if Email Length is 255 Characters Long', () => {
        const $255_CHARS = 'a@' + 'a'.repeat(250) + '.com'
        const result = validateEmail($255_CHARS)
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Not Accept Invalid Email Format', () => {
        const result = validateEmail('John@Doe&')
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Return Valid for Valid Email Inputs', () => {
        const result = validateEmail('john.doe@gmail.com')
        expect(result).toMatchObject({ valid: true })
    })
})

// VALIDATE PHONE
// Function Accepts a String
// Returns an Object of Interface Validation Result
// { valid: bool, error: string }
describe('Validate Phone', () => {
    it('Should Always Return an Object of Validation Result Type', () => {
        const result = validatePhone('')
        const emptyOrAnyString = /^$|^.+$/
        expect(result).toMatchObject({
            valid: true,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            error: expect.stringMatching(emptyOrAnyString), // Empty String or Anything
        })
    })

    it('Should Return Valid if Phone Input is Empty', () => {
        const result = validatePhone('')
        expect(result).toMatchObject({ valid: true })
    })

    it('Should Return Invalid if Phone Length is 9 Characters Long', () => {
        const NINE_DIGIT = '123456789'
        const result = validatePhone(NINE_DIGIT)
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Return Valid if Phone Length is 10 Characters Long', () => {
        const TEN_DIGIT = '1234567890'
        const result = validatePhone(TEN_DIGIT)
        expect(result).toMatchObject({ valid: true })
    })

    it('Should Return Valid if Phone Length is 16 Characters Long', () => {
        const SIXTEEN_DIGIT = '1234567890123456'
        const result = validatePhone(SIXTEEN_DIGIT)
        expect(result).toMatchObject({ valid: true })
    })

    it('Should Return Valid if Phone Length is 17 Characters Long', () => {
        const SEVENTEEN_DIGIT = '12345678901234567'
        const result = validatePhone(SEVENTEEN_DIGIT)
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Not Accept Invalid Phone Format', () => {
        const result = validatePhone('12-34-56-78-90')
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Return Valid for Valid Phone Inputs', () => {
        const result = validatePhone('12345678901234')
        expect(result).toMatchObject({ valid: true })
    })
})

// VALIDATE MESSAGE
// Function Accepts a String
// Returns an Object of Interface Validation Result
// { valid: bool, error: string }
describe('Validate Message', () => {
    it('Should Always Return an Object of Validation Result Type', () => {
        const result = validateMessage('')
        const emptyOrAnyString = /^$|^.+$/
        expect(result).toMatchObject({
            valid: false,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            error: expect.stringMatching(emptyOrAnyString), // Empty String or Anything
        })
    })

    it('Should Return Invalid if Message Input is Empty', () => {
        const result = validateMessage('')
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Return Invalid if Message Length is 9 Characters Long', () => {
        const NINE_DIGIT = '123456789'
        const result = validateMessage(NINE_DIGIT)
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Return Valid if Message Length is 10 Characters Long', () => {
        const TEN_DIGIT = '1234567890'
        const result = validateMessage(TEN_DIGIT)
        expect(result).toMatchObject({ valid: true })
    })

    it('Should Return Valid if Message Length is 3000 Characters Long', () => {
        const $3000_CHARS = 'A'.repeat(MAX_MESSAGE_CHARACTERS)
        const result = validateMessage($3000_CHARS)
        expect(result).toMatchObject({ valid: true })
    })

    it('Should Return Valid if Message Length is 3001 Characters Long', () => {
        const $3001_CHARS = 'A'.repeat(MAX_MESSAGE_CHARACTERS + 1)
        const result = validateMessage($3001_CHARS)
        expect(result).toMatchObject({ valid: false })
    })

    it('Should Return Valid for Valid Message Inputs', () => {
        const result = validateMessage('Hi, Tivadar! Happy Coding!')
        expect(result).toMatchObject({ valid: true })
    })
})
