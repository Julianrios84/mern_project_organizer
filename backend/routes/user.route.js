import express from "express";
const router = express.Router()

import { register, autenticate, confirm, reset, check} from '../controllers/user.controller.js'

router.post('/', register)
router.post('/login', autenticate)
router.get('/confirm/:token', confirm)
router.post('/reset/password', reset)
router.post('/reset/password/:token', check)


export default router