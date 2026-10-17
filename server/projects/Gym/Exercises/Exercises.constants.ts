import { Option } from '@common-utils'
import { MuscleGroupOptions } from '../MuscleGroup/MuscleGroup.options'
import { EQUIPMENT_OPTIONS } from '../../../../common/types'

const muscleGroupValues = Option.getValues(MuscleGroupOptions)
const equipmentValues = Option.getValues(EQUIPMENT_OPTIONS)

/** Option `value`s for muscle groups and equipment — the enum sets model and schema both enforce. */
export const ExercisesConstants = { muscleGroupValues, equipmentValues }
