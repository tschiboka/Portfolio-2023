/** Everything the category form alone fixes: how short and how long each field may be. */
export const CategoriesConstants = {
    fieldLimits: {
        name: { max: 20 },
        description: { min: 10, max: 255 },
    },
} as const
