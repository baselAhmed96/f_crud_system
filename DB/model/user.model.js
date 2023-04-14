import { model, Schema, Types } from "mongoose";

const userSchema = new Schema({

    name:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: false
    }
},
{timestamps:true})

const userModel = model('User', userSchema);
export default userModel
