import express, { Application } from 'express'
import mongoose from 'mongoose'
import Joi from 'joi'
import joiObjectId from 'joi-objectid'
import cors from 'cors'
import { ApiMessage } from '../../common/utils/Server'
import { AppRoutes } from './App.routes'
import { AppMiddleware } from './App.middlewares'
import { AppConstants } from './App.constants'

/** Application composition root — builds the Express app and (optionally) boots it. */
export const App = {
    /** Boot-time setup steps, grouped under `App.Boot`. */
    Boot: {
        /** Connects to MongoDB; throws if `DB_STRING` is not set in the environment. */
        connectDb: async () => {
            const dbString = process.env.DB_STRING
            if (!dbString) throw new Error(ApiMessage.missingEnv('DB_STRING'))

            await mongoose.connect(dbString)
            console.log(ApiMessage.dbConnected())
        },

        /** Registers the `Joi.objectId()` extension once at bootstrap. */
        setupValidation: () => (Joi.objectId = joiObjectId(Joi)),
    },

    /** Builds and wires the Express application: middleware, routes, and the error handler. */
    create: (): Application => {
        const app = express()
        app.use(express.json())
        app.use(express.json({ type: AppConstants.jsonContentTypes }))

        // Cross-Origin Shared Resources
        app.use(
            cors({
                methods: AppConstants.corsMethods,
                origin: AppConstants.allowAllOrigins ? '*' : AppConstants.allowedOrigins,
            }),
        )

        App.Boot.setupValidation()
        AppMiddleware.prod(app)
        AppRoutes.register(app)

        app.use(AppMiddleware.error)

        return app
    },

    /** Boots the app: connects to the DB, then returns the built application. */
    start: async (): Promise<Application> => {
        const app = App.create()
        await App.Boot.connectDb()
        return app
    },
}
