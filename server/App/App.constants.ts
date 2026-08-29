/** CORS / HTTP config for the app — single source of truth for server bootstrap. */
export const AppConstants = {
    /** Allow any origin (otherwise restrict to `allowedOrigins`). */
    allowAllOrigins: true,
    /** Allowed origins when `allowAllOrigins` is false. */
    allowedOrigins: ['https://tschiboka.com'] as string[],
    /** HTTP methods permitted across CORS. */
    corsMethods: ['GET', 'POST', 'PUT', 'DELETE'] as string[],
    /** Content types the JSON body parser accepts. */
    jsonContentTypes: ['application/json', 'text/plain'] as string[],
    /** Default server listen port. */
    defaultPort: 5000,
} as const
