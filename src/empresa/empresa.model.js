'use strict'

import { Schema, model } from 'mongoose'

const empresaSchema = Schema({
    name: {
        type: String,
        required: true
    },
    impact: {
        type: String,
        uppercase: true,
        enum: ['ALTO','MEDIO','BAJO'],
        required: true
    },
    trajectory: {
        type: Number,
        required: true
    },
    categorie: {
        type: Schema.ObjectId,
        ref: 'categorie',
        required: true
    }
})

export default model('empresa', empresaSchema)