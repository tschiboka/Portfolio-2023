import { Repository } from '../../common/utils/Server'
import { LogModel } from './Log.model'
import type { ILog } from './Log.types'

/** Data-access layer for logs — generic CRUD over the log model. */
export const LogRepository = Repository.define<typeof LogModel, ILog>(LogModel).withQueries({
    findPaged: (sortString: string, skip: number, limit: number, select?: string) =>
        LogModel.find()
            .collation({ locale: 'en' })
            .sort(sortString)
            .skip(skip)
            .select(select as string)
            .limit(limit),
    deleteManyByIds: (ids: string[]) => LogModel.deleteMany({ _id: { $in: ids } }),
})
