'use strict'

import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const register = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: 'User registered succesfully'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user'})
    }
}

export const login = async(req, res)=>{
    try{
        let { username, email, password } = req.body
        let user = await User.findOne({
            $or: [{
                username: username
            },
            {
                email: email
            }]
        })
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${loggedUser.username}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Failed login'})
    }
}

export const eliminarAdmin = async(req, res)=>{
    try{
        let { id } = req. params
        if(id == req.user._id){
            let deletedUser = await User.findOneAndDelete({_id: id})
            if(!deletedUser) return res.status(404).send({message: 'User not found not deleted'})
            return res.send({message: 'User deleted succesfully', deletedUser})
        }
        return res.status(401).send({message: 'You are not the deleted user'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting admin'})
    }
}

export const updateAdmin = async(req, res)=>{
    try{
        let { id } = req.params
        let data = req.body
        let updatedAdmin = await User.findOneAndUpdate(
            {_id: id},
            data,
            {new: true}
        )
        if(!updatedAdmin) return res.status(404).send({message: 'User not found, not updated'})
        return res.send({message: 'User updated succesfully', updatedAdmin})
    }catch(err){
        console.error(err)
        return res.status(500).send()
    }
}