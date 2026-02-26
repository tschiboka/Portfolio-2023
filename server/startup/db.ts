// mongodb://127.0.0.1:27017/portfolio-website
import mongoose from 'mongoose'

export default async function connectDb() {
    if (!process.env.DB_STRING) {
        throw new Error('DB_STRING not defined in environment')
    }
    await mongoose.connect(process.env.DB_STRING)
    console.log('Connected to MongoDB')
}
