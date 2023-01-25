import express from "express";
const router = express.Router()

import { register, autenticate, confirm } from '../controllers/user.controller.js'

router.post('/', register)
router.post('/login', autenticate)
router.get('/confirm/:token', confirm)


export default router