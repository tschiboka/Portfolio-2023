import mongoose from 'mongoose'
import type { IBreakdown } from './Breakdown.types'
import { BreakdownFieldLimits } from './Breakdown.constants'

const breakdownSchema = new mongoose.Schema<IBreakdown>({
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
        maxLength: BreakdownFieldLimits.path.max,
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
breakdownSchema.index({ date: 1, path: 1 }, { unique: true })

/** Mongoose model for the daily visit/like breakdown (one doc per (date, path)). */
export const BreakdownModel = mongoose.model<IBreakdown>('DailyBreakdown', breakdownSchema)
