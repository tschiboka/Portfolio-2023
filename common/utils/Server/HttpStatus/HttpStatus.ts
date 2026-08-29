export class HttpStatus {
    // 1xx Informational
    static CONTINUE = 100 as const
    static SWITCHING_PROTOCOLS = 101 as const
    static PROCESSING = 102 as const
    static EARLY_HINTS = 103 as const

    // 2xx Success
    static OK = 200 as const
    static CREATED = 201 as const
    static ACCEPTED = 202 as const
    static NON_AUTHORITATIVE_INFORMATION = 203 as const
    static NO_CONTENT = 204 as const
    static RESET_CONTENT = 205 as const
    static PARTIAL_CONTENT = 206 as const
    static MULTI_STATUS = 207 as const
    static ALREADY_REPORTED = 208 as const
    static IM_USED = 226 as const

    // 3xx Redirection
    static MULTIPLE_CHOICES = 300 as const
    static MOVED_PERMANENTLY = 301 as const
    static FOUND = 302 as const
    static SEE_OTHER = 303 as const
    static NOT_MODIFIED = 304 as const
    static TEMPORARY_REDIRECT = 307 as const
    static PERMANENT_REDIRECT = 308 as const

    // 4xx Client Error
    static BAD_REQUEST = 400 as const
    static UNAUTHORIZED = 401 as const
    static PAYMENT_REQUIRED = 402 as const
    static FORBIDDEN = 403 as const
    static NOT_FOUND = 404 as const
    static METHOD_NOT_ALLOWED = 405 as const
    static NOT_ACCEPTABLE = 406 as const
    static PROXY_AUTHENTICATION_REQUIRED = 407 as const
    static REQUEST_TIMEOUT = 408 as const
    static CONFLICT = 409 as const
    static GONE = 410 as const
    static LENGTH_REQUIRED = 411 as const
    static PRECONDITION_FAILED = 412 as const
    static PAYLOAD_TOO_LARGE = 413 as const
    static URI_TOO_LONG = 414 as const
    static UNSUPPORTED_MEDIA_TYPE = 415 as const
    static RANGE_NOT_SATISFIABLE = 416 as const
    static EXPECTATION_FAILED = 417 as const
    static IM_A_TEAPOT = 418 as const
    static MISDIRECTED_REQUEST = 421 as const
    static UNPROCESSABLE_ENTITY = 422 as const
    static LOCKED = 423 as const
    static FAILED_DEPENDENCY = 424 as const
    static TOO_EARLY = 425 as const
    static UPGRADE_REQUIRED = 426 as const
    static PRECONDITION_REQUIRED = 428 as const
    static TOO_MANY_REQUESTS = 429 as const
    static REQUEST_HEADER_FIELDS_TOO_LARGE = 431 as const
    static UNAVAILABLE_FOR_LEGAL_REASONS = 451 as const

    // 5xx Server Error
    static INTERNAL_SERVER_ERROR = 500 as const
    static NOT_IMPLEMENTED = 501 as const
    static BAD_GATEWAY = 502 as const
    static SERVICE_UNAVAILABLE = 503 as const
    static GATEWAY_TIMEOUT = 504 as const
    static HTTP_VERSION_NOT_SUPPORTED = 505 as const
    static VARIANT_ALSO_NEGOTIATES = 506 as const
    static INSUFFICIENT_STORAGE = 507 as const
    static LOOP_DETECTED = 508 as const
    static NOT_EXTENDED = 510 as const
    static NETWORK_AUTHENTICATION_REQUIRED = 511 as const
}
