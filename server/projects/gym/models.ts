import { GymExerciseResponse, GymUserRoutineResponse } from '@common/types'
import Joi from 'joi'
import mongoose from 'mongoose'

const gymExerciseSchema = new mongoose.Schema<GymExerciseResponse>({
    name: { type: String, required: true },
})
const gymRoutineSchema = new mongoose.Schema<GymUserRoutineResponse>({
    name: { type: String, required: true },
})

const GymExercise = mongoose.model<GymExerciseResponse>('GymExercise', gymExerciseSchema)
const GymRoutine = mongoose.model<GymUserRoutineResponse>('GymRoutine', gymRoutineSchema)

const validateGymExercise = (exercise: GymExerciseResponse) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    })
    return schema.validate(exercise)
}

const validateGymRoutine = (routine: GymUserRoutineResponse) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    })
    return schema.validate(routine)
}

export { GymExercise, GymRoutine, validateGymExercise, validateGymRoutine }
export type { GymExerciseResponse, GymUserRoutineResponse }
