import { hasLength, isEmpty, isValidObjectId } from '../../common/utils/Predicate'
import { ApiMessage, ApiResponder } from '../../common/utils/Server'
import type {
    CurrentUser,
    GetSessionResponse,
    PostConfirmRequest,
    PostConfirmResponse,
    PostLoginRequest,
    PostLoginResponse,
    PostUserRequest,
    User,
} from '@common/types'
import { UsersRepository } from './Users.repository'
import { UsersSchema } from './Users.schema'
import { UsersAuth } from './Users.auth'
import { sendConfirmationEmail } from './Users.utils'
import { SettingsService } from '../Settings/Settings.service'
import type { IUser } from './Users.types'
import { TokenModel } from '../Token'

/** Business logic for users & auth — persistence via the repository, validation via the schema. */
export const UsersService = {
    /** Lists all users (admin-facing). */
    list: async (): Promise<User[]> => {
        const users = await UsersRepository.find()
        if (isEmpty(users)) throw ApiResponder.notFound('users')

        return users.map((user) => user.toObject())
    },

    /** Returns a single user by id. */
    get: async (id: string): Promise<User> => {
        if (!isValidObjectId(id)) throw ApiResponder.invalidId('user')
        const user = await UsersRepository.findById(id)

        if (!user) throw ApiResponder.notFound('user')
        return user.toObject()
    },

    /** Registers a new user, sending a confirmation email. */
    register: async (input: PostUserRequest): Promise<string> => {
        const { fullName, userName, email, password: plainPassword } = input
        const { error } = UsersSchema.validateUser(input)
        if (error) throw ApiResponder.badRequest(error)

        const password = await UsersAuth.password.hash(plainPassword)

        const duplicateUserName = await UsersRepository.find({ userName: input.userName })
        if (hasLength(duplicateUserName))
            throw ApiResponder.conflict(ApiMessage.exists('user name'))

        const duplicateEmail = await UsersRepository.find({ email: input.email })
        if (hasLength(duplicateEmail)) throw ApiResponder.conflict(ApiMessage.exists('email'))

        const setting = await SettingsService.get()
        const { registrationTokensExpireInMs: expires, maxUsers } = setting
        const users = await UsersRepository.find()
        if (users.length >= maxUsers) throw ApiResponder.forbidden()

        const userToken = UsersAuth.token.buildRegistration(
            {
                fullName,
                userName,
                email,
                password,
                isAdmin: false,
                active: false,
                verified: false,
            },
            expires,
        )
        const tokenString = UsersAuth.token.generate(userToken)
        await new TokenModel({ token: tokenString }).save()

        await sendConfirmationEmail(input.email, tokenString)
        return ApiMessage.sent('confirmation email')
    },

    /** Confirms a registration token and creates the user. */
    confirm: async (input: PostConfirmRequest): Promise<PostConfirmResponse> => {
        const { error } = UsersSchema.validateToken({ token: input.token })
        if (error) throw ApiResponder.badRequest(error)

        const token = await TokenModel.findOne({ token: input.token })
        if (!token) throw ApiResponder.notFound('verification token')

        const decoded = UsersAuth.token.verify(token.token) as Record<string, unknown>

        const { expires, iat, ...userFields } = decoded
        const activeUser: Record<string, unknown> = { ...userFields, verified: true, active: true }

        const userNameExists = await UsersRepository.find({
            userName: activeUser.userName as string,
        })
        if (hasLength(userNameExists)) throw ApiResponder.conflict(ApiMessage.exists('user'))
        const emailExists = await UsersRepository.find({ email: activeUser.email as string })
        if (hasLength(emailExists)) throw ApiResponder.conflict(ApiMessage.exists('user'))

        const user = UsersRepository.create(activeUser as unknown as Partial<IUser>)
        await UsersRepository.save(user)
        return { token }
    },

    /** Logs a user in, returning an auth token, the user and current settings. */
    login: async (input: PostLoginRequest): Promise<PostLoginResponse> => {
        const { error } = UsersSchema.validateLogin(input)
        if (error) throw ApiResponder.badRequest(error)

        const user = await UsersRepository.findOne({ email: input.email })
        if (!user) throw ApiResponder.badRequest(ApiMessage.invalidCredentials())

        const auth = await UsersAuth.password.verify(input.password, user.password)
        if (!auth) throw ApiResponder.badRequest(ApiMessage.invalidCredentials())

        const { _id, isAdmin } = user
        const token = UsersAuth.token.generate({ id: _id, isAdmin })

        const settings = await SettingsService.get()
        return {
            token,
            user: { ...user.toObject(), id: _id },
            settings: [settings],
        }
    },

    /** Returns the current session's user and settings. */
    session: async (user: CurrentUser): Promise<GetSessionResponse> => {
        const found = await UsersRepository.findById(String(user._id))
        if (!found) throw ApiResponder.notFound('user')

        const settings = await SettingsService.get()
        return { user: { ...found.toObject(), id: found._id }, settings }
    },
}
