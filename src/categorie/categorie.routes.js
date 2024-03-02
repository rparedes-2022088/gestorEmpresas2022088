'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { newCategorie, deleteCategorie, updateCategorie } from './categorie.controller.js'

const api = Router()

api.post('/newCategorie', validateJwt, newCategorie)
api.delete('/deleteCategorie/:id', validateJwt, deleteCategorie)
api.put('/updateCategorie/:id', validateJwt, updateCategorie)

export default api