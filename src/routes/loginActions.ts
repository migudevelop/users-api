import { LoginController } from '@src/controllers'
import { Router as expresRouter } from 'express'
const router = expresRouter()

router.post('/login', LoginController.login)
router.post('/logout', (_req, res) => res.send('logout'))

export default router
