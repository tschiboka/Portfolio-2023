// Shared types for admin / auth / session and API requests / responses
// NOTE: Every request / response type should be defined here, so we have a single source of truth for the API
//
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

// CATEGORY TYPES
export type Category = {
    name: string
    isParent: boolean
    parentId?: string
    status?: string
    description: string
    icon: string
    color?: string
}

// GET /api/categories response
export type GetCategoryResponse = Category & { _id: string }

// POST /api/categories request
export type PostCategoryRequest = Category

// CONFIRM TYPES
// POST /api/confirm request
export type PostConfirmRequest = {
    token: string
}

// POST /api/confirm response
export type PostConfirmResponse = {
    success: boolean
    token: { token: string; created: Date }
}

// HEALTH TYPES
// GET /api/ response
export type GetHealthResponse = {
    success: boolean
}

// SCHEDULE TYPES
// POST /api/schedule/daily-breakdown response
export type PostDailyBreakdownResponse = {
    success: boolean
    error?: unknown
}

// SESSION TYPES
// GET /api/session response
export type GetSessionResponse = {
    success: boolean
    data: {
        user: User
        settings: Settings
    }
}

// MESSAGE TYPES
// POST /api/message request
export type PostMessageRequest = {
    name: string
    email: string
    phone?: string
    message: string
}

// POST /api/message response
export type PostMessageResponse = {
    success: boolean
    message: string
}

// POST /api/message error (validation failure)
export type PostMessageError = {
    success: boolean
    error: string
}

// LOG TYPES
export type Log = {
    _id: string
    timestamp: string
    name: string
    message: string
    stack: string
}

// GET /api/log query params
export type GetLogQuery = {
    sortBy?: string
    page?: string
    limit?: string
    desc?: string
    select?: string
}

// GET /api/log response (no query — full table)
export type GetLogTableResponse = {
    success: boolean
    table: Log[]
}

// GET /api/log response (with query — paginated)
export type GetLogResponse = {
    log: Log[]
    total: number
}

// DELETE /api/log/:ids response
export type DeleteLogResponse = {
    acknowledged: boolean
    deletedCount: number
}

// LIKE TYPES
export type LikeSummary = Record<string, number>

// GET /api/like query params (path optional — no path returns summary)
export type GetLikeQuery = {
    path?: string
}

// GET /api/like?path= query params (path required)
export type GetLikeByPathQuery = Required<GetLikeQuery>

// GET /api/like response (all likes grouped by path)
export type GetLikeSummaryResponse = {
    success: boolean
    likes: LikeSummary
}

// GET /api/like?path= response (single path count)
export type GetLikeResponse = {
    success: boolean
    likes: number
}

// POST /api/like request
export type PostLikeRequest = {
    path: string
}

// POST /api/like response
export type PostLikeResponse = {
    success: boolean
    like: { path: string; likeDate: Date }
}

// POST /api/like error
export type PostLikeError = {
    success: boolean
    error: string
}

// SETTINGS TYPES
export type Settings = {
    maxUsers: number
    enableMaintenanceMode: boolean
    enableUserRegistration: boolean
    enableAutomaticLogoff: boolean
    enabledFeatures: string[]
    registrationTokensExpireInMs: number
    sessionTokensExpireInMs: number
}

// GET /api/settings response
export type GetSettingsResponse = {
    success: boolean
    data: Settings
}

// POST /api/settings request
export type PostSettingsRequest = Settings

// POST /api/settings response
export type PostSettingsResponse = {
    success: boolean
    data: Settings
}

// VERSION TYPES
// GET /version.json response
export type GetVersionResponse = {
    sha: string
    message: string
    date: string
}

// VISIT TYPES
export type VisitSummary = Record<string, number>

// GET /api/visit query params (path optional — no path returns summary)
export type GetVisitQuery = {
    path?: string
}

// GET /api/visit query params (path required)
export type GetVisitByPathQuery = Required<GetVisitQuery>

// GET /api/visit response (all visits grouped by path)
export type GetVisitSummaryResponse = {
    success: boolean
    visits: VisitSummary
}

// GET /api/visit?path= response (single path count)
export type GetVisitResponse = {
    success: boolean
    visits: number
}

// POST /api/visit request
export type PostVisitRequest = {
    path: string
}

// POST /api/visit response
export type PostVisitResponse = {
    success: boolean
    visit: { path: string; visitDate: Date }
}

// POST /api/visit error (validation failure)
export type PostVisitError = {
    success: boolean
    error: string
}

// USER TYPES
export type User = {
    id?: string
    userName: string
    email: string
    password: string
    fullName: string
    isAdmin?: boolean
    avatarId?: string
    created?: Date
    updated?: Date
    lastLogin?: Date
}

// GET /api/user response (all users)
export type GetUsersResponse = {
    success: boolean
    data: User[]
}

// GET /api/user/:id response (single user)
export type GetUserResponse = {
    success: boolean
    data: User
}

// POST /api/user request (registration)
export type PostUserRequest = Pick<User, 'fullName' | 'userName' | 'email' | 'password'>

// POST /api/user response
export type PostUserResponse = {
    success: boolean
    message: string
}

// POST /api/user error (validation / conflict)
export type PostUserError = {
    success: boolean
    message: string
    error?: unknown
}

// LOGIN TYPES
// POST /api/login request
export type PostLoginRequest = {
    email: string
    password: string
}

// POST /api/login response
export type PostLoginResponse = {
    success: boolean
    token: string
    user: User
    settings: Settings[]
}

// POST /api/login error (validation failure)
export type PostLoginError = {
    success: boolean
    message: string
    error?: unknown
}
