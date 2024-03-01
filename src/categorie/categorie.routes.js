'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { newCategorie, deleteCategorie, updateCategorie } from './categorie.controller.js'

const api = Router()

api.post('/newCategorie', newCategorie)
api.delete('/deleteCategorie', deleteCategorie)
api.put('/updateCategorie', updateCategorie)

export default api