import { Repository } from '../../common/utils/Server'
import { MessageModel } from './Message.model'
import type { IMessage } from './Message.types'

/** Data-access layer for messages — generic CRUD over the message model. */
export const MessageRepository = Repository.define<typeof MessageModel, IMessage>(MessageModel)
