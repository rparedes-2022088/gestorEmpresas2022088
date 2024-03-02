'use strict'

import Empresa from './empresa.model.js'
import { Parser } from 'json2csv'

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

export const updateEmpresa = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedCompany = await Empresa.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCompany) return res.status(404).send({message: 'Company not found, not updated'})
        return res.send({message: 'Company updated succesfully', updatedCompany})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating categorie'})
    }
}

export const viewByTrajectory = async(req, res)=>{
    try{
        let orderedCorporations = await Empresa.find().sort({trajectory: 1})
        if(!orderedCorporations) return res.status(404).send({message: 'There are no companies'})
        return res.send(orderedCorporations)
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error viewing corporations'})
    }
}

export const viewByCategorieAZ = async(req, res)=>{
    try{
        let orderedCompanies = await Empresa.find().populate('categorie',['categoria'])
        orderedCompanies.sort((a, b) => {
            if (a.categorie.categoria < b.categorie.categoria) return -1
            if (a.categorie.categoria > b.categorie.categoria) return 1
            return 0
        })
        return res.send({orderedCompanies})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error viewing companies by categorie a-z'})
    }
}

export const viewByCategorieZA = async(req, res)=>{
    try{
        let orderedCompanies = await Empresa.find().populate('categorie',['categoria'])
        orderedCompanies.sort((a, b) => {
            if (a.categorie.categoria < b.categorie.categoria) return 1
            if (a.categorie.categoria > b.categorie.categoria) return -1
            return 0
        })
        return res.send({orderedCompanies})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error viewing companies by categorie a-z'})
    }
}

//en el navegador colocar localhost:2880/empresas/createReport
export const createReport = async(req, res)=>{
    try{
        let empresasEncontradas = await Empresa.find({})
        if(!empresasEncontradas) return res.status(404).send({message: 'Data not available'})
        let empresas = []
        empresasEncontradas.forEach((empresa)=>{
            const { id, name, impact, trajectory, categorie } = empresa
            empresas.push({ id, name, impact, trajectory, categorie })
        })
        const csvFields = ['Id', 'Name', 'Impact', 'Trajectory', 'Categorie']
        const csvParser = new Parser({ csvFields })
        const csvData = csvParser.parse(empresas)
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attatchment: filename=empresasData.csv')
        res.status(200).end(csvData)
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error generating report', err})
    }
}