'use strict'

import Categoria from './categorie.model.js'
import Empresa from '../empresa/empresa.model.js'

export const newCategorie = async(req, res)=>{
    try{
        let data = req.body
        let categoria = new Categoria(data)
        await categoria.save()
        return res.send({message: 'Categorie saved succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error creating categorie :C'})
    }
}

export const deleteCategorie = async(req, res)=>{
    try{
        let { id } = req.params
        let foundedCategorie = await Categoria.findOneAndDelete({_id: id})
        if(!foundedCategorie) return res.status(404).send({message: 'Categorie not found, not deleted'})
        let defaultCategorie = await Categoria.findOne({categoria: "Default"})
        let empresaCategoria = await Empresa.updateMany({categoria: foundedCategorie._id},{$set: {categoria:defaultCategorie._id}})
        if(!empresaCategoria) return res.send({message: 'No hay empresas con esta categoria'})
        return res.send({message: `Categorie deleted ${foundedCategorie.categoria}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting categorie'})
    }
}

export const updateCategorie = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let foundedCategorie = await Categoria.findOne({_id: id})
        if(!foundedCategorie) return res.status(404).send({message: 'Categorie not found, not updated'})
        let updatedCategorie = await Categoria.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedCategorie) return res.status(500).send({message: 'Error updating categorie'})
        return res.send({message: 'Categorie updated', updatedCategorie})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating categorie'})
    }
}

export const defaultCategorie = async()=>{
    try{
        let data = {
            categoria: 'Default',
            description: 'Categoria de empresa eliminada'
        }
        let foundedCategorie = await Categoria.findOne({categoria: data.categoria})
        if(!foundedCategorie){
            let defaultCateg = new Categoria(data)
            await defaultCateg.save()
            console.log('Categorie default created succesfully')
        }
        console.log('Categorie default created previously')
    }catch(err){
        console.error(err)
        console.log('Error creating the default categorie')
    }
}