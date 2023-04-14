import { model, Schema, Types } from "mongoose";

const productSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    price: {
        type: Number,
        required: true,
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    },
    createdBy: {
        type:Types.ObjectId,
        ref:'User',
        required:true
    }
},
{timestamps:true})

const productModel = model('Product', productSchema);
export default productModel