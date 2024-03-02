'use strict'

import { Router } from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { newEmpresa, updateEmpresa, viewByTrajectory, viewByCategorieAZ, viewByCategorieZA, createReport} from './empresa.controller.js'

const api = Router()

api.post('/newEmpresa', validateJwt, newEmpresa)
api.put('/updateEmpresa/:id', validateJwt, updateEmpresa)
api.get('/viewByTrajectory', validateJwt, viewByTrajectory)
api.get('/viewByCategorieAZ', validateJwt, viewByCategorieAZ)
api.get('/viewByCategorieZA', validateJwt, viewByCategorieZA)
api.get('/createReport', createReport)

export default api