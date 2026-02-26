import { Request, Response, NextFunction } from 'express'

export default function (req: Request, res: Response, next: NextFunction) {
    if (!(req as any).user.isAdmin)
        return res.status(403).json({ success: false, message: 'Forbidden: access denied!' })
    next()
}
