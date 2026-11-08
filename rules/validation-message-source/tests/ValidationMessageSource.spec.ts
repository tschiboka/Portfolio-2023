import { ruleTester } from '../../config'
import { MessageErrorMessage } from '../ValidationMessageSource.constants'
import { Rules } from '../ValidationMessageSource.rules'

ruleTester.run('validation-message-source', Rules.Eslint.ValidationMessageSource9, {
    valid: [
        {
            name: 'should accept a required message built by ValidationMessage',
            code: "yup.string().required(ValidationMessage.Required('name'))",
        },
        {
            name: 'should accept a bound whose message is built',
            code: "yup.string().min(8, ValidationMessage.Bound('password', 8, 'characters', 'at least'))",
        },
        {
            name: 'should accept a test whose message is built',
            code: "yup.string().test('phone', ValidationMessage.Invalid('phone'), () => true)",
        },
        {
            name: 'should accept an options object whose message is built',
            code: 'yup.string().test({ name: "phone", message: ValidationMessage.Invalid("phone") })',
        },
        {
            name: 'should accept a required that names no message',
            code: 'yup.string().required()',
        },
        {
            name: 'should accept a bound that names no message',
            code: 'yup.string().min(8)',
        },
        {
            name: 'should accept the literal ValidationMessage itself is called with',
            code: "yup.string().required(ValidationMessage.Invalid('option'))",
        },
        {
            name: 'should ignore a method outside the yup surface',
            code: "yup.string().label('Email')",
        },
        {
            name: 'should ignore a computed method name it cannot read',
            code: 'yup.string()[name](8, "Min 8 characters")',
        },
        {
            name: 'should ignore a template that carries nothing but a value',
            code: 'yup.string().min(8, `${limit}`)',
        },
        {
            name: 'should ignore a template whose own text is only spacing',
            code: 'yup.string().min(8, `  ${limit}  `)',
        },
        {
            name: 'should ignore a message that no yup call carries',
            code: 'const outcome = { allowed: false, message: "This session is full" }',
        },
        {
            name: 'should ignore a computed key, which cannot be read',
            code: 'yup.string().test({ name: "phone", [key]: "Enter a valid phone" })',
        },
        {
            name: 'should ignore a pattern that declares no message',
            code: 'yup.string().matches(/^[0-9]+$/)',
        },
    ],
    invalid: [
        {
            name: 'should throw for a required message written out',
            code: "yup.string().required('Name is required')",
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for an email message written out',
            code: "yup.string().email('Enter a valid email')",
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for a bound message written out',
            code: "yup.string().min(8, 'Min 8 characters')",
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for a pattern message written out',
            code: "yup.string().matches(/^[0-9]+$/, 'Digits only')",
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for a test message written out',
            code: "yup.string().test('phone', 'Enter a valid phone', () => true)",
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for an options object message written out',
            code: 'yup.string().test({ name: "phone", message: "Enter a valid phone" })',
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for a message written as a template with nothing in it',
            code: 'yup.string().required(`Name is required`)',
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for a template message that carries words and a value',
            code: 'yup.string().min(8, `Min ${limit} characters`)',
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for an options object message written as a template',
            code: 'yup.string().test({ name: "phone", message: `Enter ${count} valid digits` })',
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for a list message written out',
            code: "yup.string().oneOf(['draft', 'sent'], 'Pick one')",
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for a format message written out',
            code: "yup.string().uuid('Enter a valid id')",
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw for a quoted message key written out',
            code: 'yup.string().test({ name: "phone", "message": "Enter a valid phone" })',
            errors: [{ message: MessageErrorMessage }],
        },
        {
            name: 'should throw once per message written out',
            code: "yup.string().min(8, 'Min 8 characters').max(40, 'Max 40 characters')",
            errors: [{ message: MessageErrorMessage }, { message: MessageErrorMessage }],
        },
    ],
})
