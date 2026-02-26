declare module 'joi-objectid' {
    import type Joi from 'joi'
    function joiObjectId(joi: typeof Joi): () => Joi.StringSchema
    export default joiObjectId
}
