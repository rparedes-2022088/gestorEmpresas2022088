'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { register, login, eliminarAdmin, updateAdmin } from './user.controller.js'

const api = Router()

api.post('/register', register)
api.post('/login', login)
api.delete('/eliminarAdmin/:id', validateJwt, eliminarAdmin)
api.put('/updateAdmin/:id', validateJwt, updateAdmin)

export default api