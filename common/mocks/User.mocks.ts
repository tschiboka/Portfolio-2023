import { MockBuilder } from '@common-ux/Test'
import { TestMocks } from './TestMocks'
import type { User } from '@common-types'

export const MockUser = MockBuilder<User>({
    id: TestMocks.userId,
    userName: TestMocks.userName,
    email: TestMocks.userEmail,
    password: '',
    fullName: TestMocks.userFullName,
    isAdmin: false,
    avatarId: undefined,
    created: undefined,
    updated: undefined,
    lastLogin: undefined,
})
