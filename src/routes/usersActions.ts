import { UserController } from '@src/controllers'
import { Router as expresRouter } from 'express'
const router = expresRouter()

router.post('/users/create', UserController.save)
router.post('/users/update', (_req, res) => res.send('update'))
router.get('/user/:userId', UserController.getUser)
router.delete('/user/delete/:userId', (_req, res) => res.send('user'))
router.get('/users', UserController.getUsers)

export default router
