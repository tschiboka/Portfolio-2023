/**
 * Truncates a number to a specified number of decimal places.
 * This does NOT round — it cuts off digits beyond the specified precision.
 * Works correctly with negative numbers (truncates toward zero).
 * @param n - The number to truncate
 * @param dp - The number of decimal places to keep
 * @returns The truncated number
 * @example
 * ```ts
 * Numbers.toDecimalPlaces(3.14159, 2)   // 3.14 (truncated, not rounded)
 * Numbers.toDecimalPlaces(3.14999, 2)   // 3.14 (truncated, not 3.15)
 * Numbers.toDecimalPlaces(-3.14159, 2)  // -3.14 (truncates toward zero)
 * Numbers.toDecimalPlaces(1.005, 2)     // 1 (truncated)
 * Numbers.toDecimalPlaces(3.1, 2)       // 3.1
 * ```
 */
export const truncateTo = (n: number, dp: number) => Math.trunc(n * 10 ** dp) / 10 ** dp
