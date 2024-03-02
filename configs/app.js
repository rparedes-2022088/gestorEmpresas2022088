'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'
import categorieRoutes from '../src/categorie/categorie.routes.js'
import userRoutes from '../src/user/user.routes.js'
import empresaRoutes from '../src/empresa/empresa.routes.js'

const app = express()
config()
const port = process.env.PORT

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/categorias', categorieRoutes)
app.use('/usuarios', userRoutes)
app.use('/empresas', empresaRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}