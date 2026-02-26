import { Request, Response, NextFunction } from 'express'
import { HttpStatus } from '../common/HttpStatus/HttpStatus'

export default function (req: Request, res: Response, next: NextFunction) {
    if (!(req as any).user.isAdmin)
        return res
            .status(HttpStatus.FORBIDDEN)
            .json({ success: false, message: 'Forbidden: access denied!' })
    next()
}
