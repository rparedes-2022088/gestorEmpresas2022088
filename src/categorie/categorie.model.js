'use strict'

import { Schema, model } from 'mongoose'

const categorieSchema = Schema({
    categoria: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export default model('categorie', categorieSchema)