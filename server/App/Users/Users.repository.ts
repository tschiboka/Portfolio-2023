import { Repository } from '@utils'
import { UsersModel } from './Users.model'
import type { IUser } from './Users.types'

/** Data-access layer for users â€” generic CRUD over the user model. */
export const UsersRepository = Repository.define<typeof UsersModel, IUser>(UsersModel)
