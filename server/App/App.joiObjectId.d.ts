declare module 'joi-objectid' {
    /** Creates a Joi `objectId()` schema factory registered onto Joi.root. */
    function joiObjectId(joi: typeof import('joi'), message?: string): () => Schema
    export default joiObjectId
}
