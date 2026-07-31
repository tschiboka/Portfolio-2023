import type { EquipmentResource } from '@common/types'
import type { SearchInputOption } from '@common/ux'

export const equipmentOptions: SearchInputOption<EquipmentResource>[] = [
    { value: 'barbell', label: 'Barbell' },
    { value: 'dumbbell', label: 'Dumbbell' },
    { value: 'kettlebell', label: 'Kettlebell' },
    { value: 'cable', label: 'Cable' },
    { value: 'machine', label: 'Machine' },
    { value: 'smith_machine', label: 'Smith Machine' },
    { value: 'ez_bar', label: 'EZ Bar' },
    { value: 'resistance_band', label: 'Resistance Band' },
    { value: 'bodyweight', label: 'Bodyweight' },
    { value: 'medicine_ball', label: 'Medicine Ball' },
    { value: 'stability_ball', label: 'Stability Ball' },
    { value: 'foam_roller', label: 'Foam Roller' },
    { value: 'trap_bar', label: 'Trap Bar' },
    { value: 'pull_up_bar', label: 'Pull-Up Bar' },
    { value: 'dip_station', label: 'Dip Station' },
    { value: 'bench', label: 'Bench' },
    { value: 'step', label: 'Step' },
]
