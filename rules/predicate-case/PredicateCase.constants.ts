export const LengthMessage =
    'A collection is tested with `isEmpty` or `isNonEmpty`, never with its length.'

export const TypeofMessage = 'A type is tested with a `Predicate` guard, never with `typeof`.'

export const NullishMessage =
    'An absence is tested with `isDefined`, `isNull`, `isUndefined` or `isNullish`, never with `null`.'

/** The assertion, as the registrar states it. */
export const Description = 'An exact predicate case calls `Predicate` instead of restating it.'

/** The `typeof` results a guard already names. */
export const GuardedTypes = ['boolean', 'function', 'number', 'object', 'string', 'undefined']

export const InstanceMessage =
    'An instance is tested with `isDate`, `isError`, `isRegExp`, `isPromise` or `isInstanceOf`, never with `instanceof`.'

export const ArrayMessage = 'A collection is tested with `isArray`, never with `Array.isArray`.'

export const TruthyMessage = 'A truthy test is written `isTruthy` or `isFalsy`, never `Boolean`.'

/** The operators that ask about absence. */
export const NullishOperators = ['==', '!=', '===', '!==']
