import { EQUIPMENT_OPTIONS } from '../../../../common/types'
import { Option } from '@utils'
import { muscleGroupOptions } from '../MuscleGroup/MuscleGroup.options'

/** Option `value`s for muscle groups (used as the enum set for the muscle-group fields). */
export const MUSCLE_GROUP_VALUES = Option.getValues(muscleGroupOptions)
/** Option `value`s for equipment (used as the enum set for the equipment field). */
export const EQUIPMENT_VALUES = Option.getValues(EQUIPMENT_OPTIONS)
