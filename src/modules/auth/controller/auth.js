import userModel from "../../../../DB/model/user.model.js";
import { compare, hash } from "../../../utils/Hash&compare.js";
import { generateToken } from "../../../utils/GenerateAndVerifyToken.js";

export const getAuthModule =   (req, res, next) => {
    return res.json({ message: "Auth module" })
}

export const signup = async  (req, res, next) => {
    try {
        const {name,email,password,confirmPassword,age} = req.body
        if(password !=confirmPassword) {
            return res.json({message: "password and confirmation password mismatch" })
        }
        const checkUser = await userModel.findOne({ email});
        console.log(checkUser);
        if(checkUser){
            return res.json({message: 'Email already exists'});
        }  
        const hashPassword = hash({plaintext:password})
        console.log(hashPassword);
        const user = await userModel.create({name,email,password:hashPassword,age});
        return res.json({message:'Done',user:{
            id:user._id
        }});
    } catch (error) {
        return res.json({ message:'Catch Error',error});
    }
}

export const login = async (req, res,next) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({message:'In-valid Password'})
        }  

        const match = compare({plaintext:password,hashValue:user.password})
        if(!match){
            return res.json({message:'In-valid Password'})
        }
        const token = generateToken({
            payload:{id:user._id,name:user.name,email:user.email,isLoggedIn:true},
            signature:process.env.TOKEN_SIGNATURE
        })                                                           
        return  res.json({ message:'Done',token }) ;
        
    } catch (error) {
        return res.json({ message:'Catch Error',error,stack:error.stack});
    }
};


export const logout = async (req, res, next) => {


}