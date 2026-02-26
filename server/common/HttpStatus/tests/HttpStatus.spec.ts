import { describe, it, expect } from 'vitest'
import { HttpStatus } from '../HttpStatus'

describe('HttpStatus', () => {
    describe('1xx Informational', () => {
        it.each([
            ['CONTINUE', 100],
            ['SWITCHING_PROTOCOLS', 101],
            ['PROCESSING', 102],
            ['EARLY_HINTS', 103],
        ])('%s should be %i', (key: string, value: number) => {
            expect(HttpStatus[key as keyof typeof HttpStatus]).toBe(value)
        })
    })

    describe('2xx Success', () => {
        it.each([
            ['OK', 200],
            ['CREATED', 201],
            ['ACCEPTED', 202],
            ['NON_AUTHORITATIVE_INFORMATION', 203],
            ['NO_CONTENT', 204],
            ['RESET_CONTENT', 205],
            ['PARTIAL_CONTENT', 206],
            ['MULTI_STATUS', 207],
            ['ALREADY_REPORTED', 208],
            ['IM_USED', 226],
        ])('%s should be %i', (key: string, value: number) => {
            expect(HttpStatus[key as keyof typeof HttpStatus]).toBe(value)
        })
    })

    describe('3xx Redirection', () => {
        it.each([
            ['MULTIPLE_CHOICES', 300],
            ['MOVED_PERMANENTLY', 301],
            ['FOUND', 302],
            ['SEE_OTHER', 303],
            ['NOT_MODIFIED', 304],
            ['TEMPORARY_REDIRECT', 307],
            ['PERMANENT_REDIRECT', 308],
        ])('%s should be %i', (key: string, value: number) => {
            expect(HttpStatus[key as keyof typeof HttpStatus]).toBe(value)
        })
    })

    describe('4xx Client Error', () => {
        it.each([
            ['BAD_REQUEST', 400],
            ['UNAUTHORIZED', 401],
            ['PAYMENT_REQUIRED', 402],
            ['FORBIDDEN', 403],
            ['NOT_FOUND', 404],
            ['METHOD_NOT_ALLOWED', 405],
            ['NOT_ACCEPTABLE', 406],
            ['PROXY_AUTHENTICATION_REQUIRED', 407],
            ['REQUEST_TIMEOUT', 408],
            ['CONFLICT', 409],
            ['GONE', 410],
            ['LENGTH_REQUIRED', 411],
            ['PRECONDITION_FAILED', 412],
            ['PAYLOAD_TOO_LARGE', 413],
            ['URI_TOO_LONG', 414],
            ['UNSUPPORTED_MEDIA_TYPE', 415],
            ['RANGE_NOT_SATISFIABLE', 416],
            ['EXPECTATION_FAILED', 417],
            ['IM_A_TEAPOT', 418],
            ['MISDIRECTED_REQUEST', 421],
            ['UNPROCESSABLE_ENTITY', 422],
            ['LOCKED', 423],
            ['FAILED_DEPENDENCY', 424],
            ['TOO_EARLY', 425],
            ['UPGRADE_REQUIRED', 426],
            ['PRECONDITION_REQUIRED', 428],
            ['TOO_MANY_REQUESTS', 429],
            ['REQUEST_HEADER_FIELDS_TOO_LARGE', 431],
            ['UNAVAILABLE_FOR_LEGAL_REASONS', 451],
        ])('%s should be %i', (key: string, value: number) => {
            expect(HttpStatus[key as keyof typeof HttpStatus]).toBe(value)
        })
    })

    describe('5xx Server Error', () => {
        it.each([
            ['INTERNAL_SERVER_ERROR', 500],
            ['NOT_IMPLEMENTED', 501],
            ['BAD_GATEWAY', 502],
            ['SERVICE_UNAVAILABLE', 503],
            ['GATEWAY_TIMEOUT', 504],
            ['HTTP_VERSION_NOT_SUPPORTED', 505],
            ['VARIANT_ALSO_NEGOTIATES', 506],
            ['INSUFFICIENT_STORAGE', 507],
            ['LOOP_DETECTED', 508],
            ['NOT_EXTENDED', 510],
            ['NETWORK_AUTHENTICATION_REQUIRED', 511],
        ])('%s should be %i', (key: string, value: number) => {
            expect(HttpStatus[key as keyof typeof HttpStatus]).toBe(value)
        })
    })

    describe('structural guarantees', () => {
        it('should have all values as numbers', () => {
            const values = Object.values(HttpStatus).filter((v) => typeof v === 'number')
            expect(values.length).toBeGreaterThan(0)
            values.forEach((v) => expect(v).toBeGreaterThanOrEqual(100))
            values.forEach((v) => expect(v).toBeLessThan(600))
        })

        it('should have no duplicate values', () => {
            const values = Object.values(HttpStatus).filter((v) => typeof v === 'number')
            expect(new Set(values).size).toBe(values.length)
        })

        it('should have exactly 61 status codes', () => {
            const values = Object.values(HttpStatus).filter((v) => typeof v === 'number')
            expect(values.length).toBe(61)
        })
    })
})
