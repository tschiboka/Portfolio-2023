import {
    Expected,
    Home,
    HomeMessage,
    Name,
    NameMessage,
    PlacementMessage,
} from '../SingleLocalType.constants'

/** A file whose home is `Login.types.ts`, so the home message has one shape. */
export const fileName = 'C:/project/src/app/Login/Login.queries.ts'

/** The home message a declaration earns, with its own file's types name. */
export const getHomeMessage = (name: string, home = 'Login.types.ts'): string =>
    HomeMessage.replace(Name, name).replace(Home, home)

/** The rename message a declaration claims by its suffix. */
export const getNameMessage = (name: string, expected: string): string =>
    NameMessage.replace(Name, name).replace(Expected, expected)

/** The placement message a well-named declaration earns away from its function. */
export const getPlacementMessage = (name: string): string => PlacementMessage.replace(Name, name)
