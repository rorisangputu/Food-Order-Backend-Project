import {Router, Request, Response, NextFunction} from 'express'
const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('This is the vendor area')
})

export default router;