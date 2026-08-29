/** Test-only capture type for the minimal Express `Response` mock. */
export type ResponseMockState = {
    statusCode: number
    body: unknown
    sent: boolean
}
