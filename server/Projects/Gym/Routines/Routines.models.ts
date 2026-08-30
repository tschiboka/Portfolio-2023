import { ROUTINE_SOURCES } from '../../../../common/types'
import type { IGymRoutine } from './Routines.types'
import mongoose from 'mongoose'

const schema = new mongoose.Schema<IGymRoutine>({
    name: { type: String, required: true, trim: true },
    entries: {
        type: [
            {
                exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'GymExercise' },
                order: { type: Number, required: true },
            },
        ],
        default: [],
    },
    source: { type: String, enum: ROUTINE_SOURCES, required: true },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
})

export const RoutineModel = mongoose.model<IGymRoutine>('GymRoutine', schema)
