// @ts-nocheck — skill example, outside the tsconfig include.

// The server's own network config. The port is named once here and read by the
// bootstrap; no call site writes a port number. CORS is part of the same file
// because both answer "what may reach this server".
export const AppConstants = {
    defaultPort: 5000,
    allowAllOrigins: true,
    allowedOrigins: ['https://tschiboka.example'] as string[],
    corsMethods: ['GET', 'POST', 'PUT', 'DELETE'] as string[],
} as const
