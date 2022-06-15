import { UserController } from '@src/controllers'
import { authenticated } from '@src/middlewares'
import { Router as expresRouter } from 'express'
const router = expresRouter()

router.post('/users/create', UserController.save)
router.put('/users/update', authenticated, UserController.update)
router.get('/user/:userId', authenticated, UserController.getUser)
router.delete('/user/delete/:userId', authenticated, UserController.delete)
router.get('/users', authenticated, UserController.getUsers)

export default router
