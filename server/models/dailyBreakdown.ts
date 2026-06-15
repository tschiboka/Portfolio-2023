import mongoose, { Document } from 'mongoose'

// ── DailyBreakdown ──────────────────────────────────────────────────────
// Single document per (date, path) holding both visit and like counts.
// Both POST /api/visit and POST /api/like upsert into this same collection.
// Eliminates the need to pull raw records for summary queries.

interface IDailyBreakdown extends Document {
    date: string
    path: string
    visits: number
    likes: number
}

const dailyBreakdownSchema = new mongoose.Schema<IDailyBreakdown>({
    // Calendar date in YYYY-MM-DD format (e.g. "2026-06-15")
    date: {
        type: String,
        required: true,
    },
    // Normalised URL path (e.g. "/home", "/projects/riffmaster")
    path: {
        type: String,
        required: true,
        lowercase: true,
        maxLength: 100,
        trim: true,
    },
    // Running total of visits for this (date, path) combination
    visits: {
        type: Number,
        default: 0,
    },
    // Running total of likes for this (date, path) combination
    likes: {
        type: Number,
        default: 0,
    },
})

// Enforce one document per path per day
dailyBreakdownSchema.index({ date: 1, path: 1 }, { unique: true })

const DailyBreakdown = mongoose.model<IDailyBreakdown>('DailyBreakdown', dailyBreakdownSchema)

export { DailyBreakdown }
