import { LoginController } from '@src/controllers'
import { Router as expresRouter } from 'express'
const router = expresRouter()

router.post('/login', LoginController.login)

export default router
