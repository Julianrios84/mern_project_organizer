import express from "express";
const router = express.Router()

import { register, autenticate, confirm, reset } from '../controllers/user.controller.js'

router.post('/', register)
router.post('/login', autenticate)
router.get('/confirm/:token', confirm)
router.post('/reset/password', reset)


export default router