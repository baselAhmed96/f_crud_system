import userModel from "../../DB/model/user.model.js";
import { verifyToken } from "../utils/GenerateAndVerifyToken.js";
// const auth  = async  (req,res,next) => {

//     const{token} = req.headers;
//         if(!token) 
//         {
//             return res.json({ message: 'Token is required'});
//         }
//         const decoded = jwt.verify(token,process.env.TOKEN_SIGNATURE)
//         if(!decoded?.id||!decoded.isLoggedIn){
//             return res.json({ message: 'In-valid token payload' });
//         }
//         const authUser = await userModel.findById(decoded.id).select('name email')
//         if(!authUser){
//             return res.json({ message: 'Not registered account' });
//         }
//         req.user = authUser
//         return next()
// }
const auth = async (req, res, next) => {
try {
    const {authorization} = req.headers;
    console.log(authorization); 
    if(!authorization){
        return res.json({ message: 'Authorization is required' });
    }
    console.log(authorization.startsWith('Bearer '));
    if(!authorization.startsWith(process.env.BEARER_KEY)){
        return res.json({ message: 'In-valid Bearer key' });
    }
    const token = authorization.split(process.env.BEARER_KEY)[1]
    console.log({token});
    if(!token){
        return res.json({message:'Token is required'});
    }
    // const decoded = jwt.verify(token,process.env.TOKEN_SIGNATURE)
    const decoded = verifyToken({
        token
    })
    console.log({decoded});
    const authUser = await userModel.findById(decoded.id).select('name email');
    console.log(authUser);
    if(!authUser){
        return res.json({message:'Not register account'})
    }
    req.user = authUser
    return next()
} catch (error) {
    return res.json({message:'Catch Error',error,tokenErr:error?.message});
}
}

export default auth



