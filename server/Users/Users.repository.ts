import { Repository } from '../../common/utils/Server'
import { UsersModel } from './Users.model'
import type { IUser } from './Users.types'

/** Data-access layer for users — generic CRUD over the user model. */
export const UsersRepository = Repository.define<typeof UsersModel, IUser>(UsersModel)
