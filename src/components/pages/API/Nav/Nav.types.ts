type MenuLabel = { label: string }
type MenuWithoutChildren = MenuLabel & { path: string; submenu?: never }
type MenuWithChildren = MenuLabel & { submenu: Menu[]; path?: never }
export type Menu = MenuWithChildren | MenuWithoutChildren
