'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from 'dotenv'

const app = express()
config()
const port = process.env.PORT

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(helmet())
app.use(cors())
