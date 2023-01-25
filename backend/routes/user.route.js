import express from "express";
const router = express.Router()

import { register, autenticate, confirm, reset, check, newpassword, profile} from '../controllers/user.controller.js'

import checkAuth from '../middlewares/check.auth.middleware.js'

router.post('/', register)
router.post('/login', autenticate)
router.get('/confirm/:token', confirm)
router.post('/reset/password', reset)
// router.get('/reset/password/:token', check)
// router.post('/reset/password/:token', newpassword)
router.route('/reset/password/:token').get(check).post(newpassword)

router.get('/profile', checkAuth, profile)

export default router