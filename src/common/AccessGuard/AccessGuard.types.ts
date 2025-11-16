export type Role = 'admin'
export type Feature = 'xmas2025'
export type RolesMap = Record<Role, boolean>
export type AccessMap = {
    roles: RolesMap
    features: Record<string, any>
}