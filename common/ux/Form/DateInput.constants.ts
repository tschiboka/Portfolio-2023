export const DateInputConstants = {
    /** Digits a full `ddmmyyyy` occupies, so typing stops there. */
    digitCount: 8,
    decimalRadix: 10,
    /** A week, and the Monday-based index the weekend opens at. */
    daysPerWeek: 7,
    weekendStart: 5,
    monthCount: 12,
    longestMonth: 31,
    minYear: 1900,
    maxYear: 2100,
    /** Where the day and month segments end in typing, so `1203` becomes `12/03`. */
    segmentEnds: [2, 4],
}
