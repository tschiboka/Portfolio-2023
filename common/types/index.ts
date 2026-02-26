// NAMING CONVENTION:
// Each type must be scoped to a single endpoint and direction (request or response).
// Even when the shape is identical, define separate types per endpoint to keep them
// independently evolvable and easy to trace back to a specific route.
//
//   Core entity (exported — reusable across endpoints and consumers):
//     {Entity}                          e.g. User, Settings, Category
//
//   GET:
//     Get{Entity}Response               e.g. GetSettingsResponse
//
//   POST:
//     Post{Entity}Request              e.g. PostCategoryRequest
//     Post{Entity}Response             e.g. PostCategoryResponse
//
//   PUT:
//     Put{Entity}Request               e.g. PutSettingsRequest
//     Put{Entity}Response              e.g. PutSettingsResponse
//
//   DELETE:
//     Delete{Entity}Request             e.g. DeleteLogRequest
//     Delete{Entity}Response            e.g. DeleteLogResponse
//
// If two endpoints genuinely share the same shape, create a core entity type
// and compose endpoint-specific types from it (e.g. via intersection or Pick/Omit).

export * from './app'
export * from './projects/typist'
export * from './projects/wda'
export * from './projects/xmas'

import type { Request, Response } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import type { ParsedQs } from 'qs'

export type TypedRequest<
    T extends {
        params?: Record<string, string>
        body?: Record<string, unknown>
        query?: Record<string, string | undefined>
    } = Record<string, never>,
> = Request<
    T extends { params: infer P } ? P : ParamsDictionary,
    unknown,
    T extends { body: infer B } ? B : unknown,
    T extends { query: infer Q } ? Q : ParsedQs
>

export type TypedResponse<T = unknown> = Response<T>

// Generic error response for all API endpoints
export type ErrorResponse = {
    success: boolean
    message: string
}
