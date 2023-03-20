import  Express  from "express";
import createHttpError from "http-errors"
import UsersModel from "../../validation/UsersModel.js";

const UsersRouter=Express.Router()


UsersRouter.post("/users", async (req,res,next)=>{
    try{
        const Users=await UsersModel.find()
        const newUser=new UsersModel(req.body)
        const exists=Users.find(a=>a.email===newUser.email)
        if(exists){
            res.send((createHttpError(400, `User with email ${newUser.email} already exists!`))) 
        }else{
        const {_id}=await newUser.save()
        res.status(201).send({_id:_id})
        }
    }catch(err){
        next(err)
    }
})

UsersRouter.get("/users", async (req,res,next)=>{
    try{
        const Users=await UsersModel.find()
        res.send(Users)
    }catch(err){
        next(err)
    }
})


UsersRouter.get("/users/:userId", async (req,res,next)=>{
    try{
        const User=await UsersModel.findById(req.params.userId)
        if(User){

        
        res.send(User)
        }else{
            if(updated){
                res.send(updated)
            }else{
                next(createHttpError(404, `User with id ${req.params.userId} not found!`))
            
            }
        }
    }catch(err){
        next(err)
    }
})

UsersRouter.put("/users/:userId", async (req,res,next)=>{
    try{
       const updated= await UsersModel.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {new:true,runValidators:true}
       )

        if(updated){
            res.send(updated)
        }else{
            next(createHttpError(404, `User with id ${req.params.userId} not found!`))
        
        }
    }catch(err){
        next(err)
    }
})

UsersRouter.delete("/users/:userId", async (req,res,next)=>{
    try{
       const deleted=await UsersModel.findByIdAndDelete(req.params.userId)
       if(deleted){
        res.status(204).send()
       }
    }catch(err){
        next(err)
    }
})


export default UsersRouter