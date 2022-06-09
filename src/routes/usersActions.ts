import { UserController } from '@src/controllers'
import { Router as expresRouter } from 'express'
const router = expresRouter()

router.post('/users/create', UserController.save)
router.post('/users/update', (_req, res) => res.send('update'))
router.post('/users/:user', (_req, res) => res.send('user'))
router.post('/users/delete/:user', (_req, res) => res.send('user'))
router.post('/users/getUsers', (_req, res) => res.send('getUsers'))

export default router
