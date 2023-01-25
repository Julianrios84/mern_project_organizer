import express from "express";
const router = express.Router()

import { register, autenticate } from '../controllers/user.controller.js'

router.post('/', register)
router.post('/login', autenticate)


export default router