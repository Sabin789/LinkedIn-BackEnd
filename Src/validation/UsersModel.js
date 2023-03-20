import mongoose, { model } from "mongoose"

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}
const {Schema}=mongoose

const UsersSchema=new Schema({
    name:{ type: String, required: true , minLength: 3, maxLength: 12},
    surname:{type:String,required:true,minLength: 3, maxLength: 12},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    bio:{type:String,required:true,minLength: 10, maxLength: 60},
    title:{type:String,required:true,minLength: 3, maxLength: 12},
    area:{type:String,required:true,minLength: 3, maxLength: 12},
    image:{type:String, default:""},

},{timestamps:true})

export default model("User", UsersSchema)
