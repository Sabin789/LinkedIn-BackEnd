import  Express  from "express";
import createHttpError from "http-errors"
import ExperienceModel from "../../validation/ExperienceModel.js";

const ExperienceRouter=Express.Router()


ExperienceRouter.post("/users/:userId/experiences", async (req,res,next)=>{
    try{
        res.send("hello")
    }catch(err){
        next(err)
    }
})

ExperienceRouter.get("/users/:userId/experiences", async (req,res,next)=>{
    try{
        const Expereinces=await ExperienceModel.find()
        res.send(Expereinces)
    }catch(err){
        next(err)
    }
})


ExperienceRouter.get("/users/:userId/experiences/:expId", async (req,res,next)=>{
    try{
        const Experience=await ExperienceModel.findById(req.params.expId)
        if(Experience){
         res.send(Experience)
        }else{
            next(createHttpError(404, `Experience with id ${req.params.expId} not found!`))

        }
    }catch(err){
        next(err)
    }
})

ExperienceRouter.put("/users/:userId/experiences/:expId", async (req,res,next)=>{
    try{
        res.send("hello")
    }catch(err){
        next(err)
    }
})

ExperienceRouter.delete("/users/:userId/experiences/:expId", async (req,res,next)=>{
    try{
        res.send("hello")
    }catch(err){
        next(err)
    }
})


export default ExperienceRouter