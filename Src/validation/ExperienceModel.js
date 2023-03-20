import mongoose, { model } from "mongoose"

const {Schema}=mongoose


const ExperienceSchema= new Schema({
    role:{type:String,required:true,minLength: 5, maxLength:13 },
    company:{type:String,required:true,minLength: 5, maxLength:13 },
    startDate:{type:Date,min:'1970-01-01'},
    endDate:{type:Date,max:new Date()},
    description:{type:String,required:true,minLength: 3, maxLength: 12},
    area:{type:String,required:true,minLength: 3, maxLength: 12},
    image:{type:String, default:""}
},{timestamps:true})


export default model("Experience",ExperienceSchema)