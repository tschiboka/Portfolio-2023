export const Description = 'A validation bound, pattern or comparison comes from a constant.'

export const BoundMessage =
    "A validation bound must come from a constant — the feature's own constants file."

export const PatternMessage =
    'A validation pattern must come from Regexp, or from a constants file when it is not shared.'

export const ComparisonMessage =
    'A validation comparison must compare against a constant, never a written number.'

/** The methods whose first argument is a numeric bound. */
export const BoundMethods = ['length', 'max', 'min']

/** The operators a numeric comparison carries. */
export const ComparisonOperators = ['<', '<=', '>', '>=']

/** The method whose callback compares against a bound. */
export const ComparingMethod = 'test'

/** The one number that asserts presence rather than declaring a bound. */
export const PresenceBound = 1
