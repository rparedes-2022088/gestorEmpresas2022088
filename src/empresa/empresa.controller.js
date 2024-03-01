'use strict'

import Empresa from './empresa.model.js'

export const newEmpresa = async(req, res)=>{
    try{
        let data = req.body
        let empresa = new Empresa(data)
        await empresa.save()
        return res.send({message: `Corporation ${empresa.name} saved succesfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error creating company'})
    }
}

export const viewByTrajectory = async(req, res)=>{
    try{
        let orderedCorporations = await Empresa.find().sort({trajectory: -1})
        return res.send(orderedCorporations)
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error viewing corporations'})
    }
}