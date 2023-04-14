import productModel from "../../../../DB/model/product .model.js"
import userModel from "../../../../DB/model/user.model.js"


export const getAllUsers =  async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (user._id !== req.user.id){
            return res.json({ message: 'User not logged in'})
        }
        const users = await userModel.find({})
        return res.json({ message: "Done",users })
    } catch (error) {
        return res.json({ message: "Catch error" ,error,stack:error.stack})
    }
}

export const profile = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        const products = await productModel.find({createdBy: decoded.id});
        return res.json({ message: "Done" ,date:{
            user,
            products
        }})
    } catch (error) {
        return res.json({ message: "Catch error" ,error,stack:error.stack})
    }
}

export const insertMany =  async (req, res, next) => {
    try {
        const {users} = req.body;
        const insertUsers = await userModel.insertMany(users)
        return res.json({ message: "Done",insertUsers })
    } catch (error) {
        return res.json({ message: 'Catch error' ,error});
    }
}

export const updateUser =  async (req, res, next) => {
    try {
        const updateUser = await userModel.findByIdAndUpdate(req.user._id,req.body,{new:true});
        return updateUser? res.json({ message: "Done",updateUser })
                        : res.json({ message: "In-valid account"});
    } catch (error) {
        return res.json({ message: 'Catch error' ,error,stack:error.stack });
    }
}

export const deleteUser =  async (req, res, next) => {
    try {
        const deleteUser = await userModel.findByIdAndDelete(req.user._id,{new:true});
        return deleteUser? res.json({ message: "Done",deleteUser })
                        : res.json({ message: "In-valid account"});
    } catch (error) {
        return res.json({ message: 'Catch error' ,error,stack:error.stack });
    }
}

export const searchBySNameAge =  async (req, res, next) => {
    try {
        
        const {x,y} =req.params;
        console.log({x,y});
        const regex = new RegExp ('^'+x,'i');
    
        const users = await userModel.find({name:{$regex:regex},age:{$lt:y}})
        return res.json({ message: "Done",users })
    } catch (error) {
        return res.json({ message: 'Catch error' ,error,stack:error.stack });
    }
}

export const searchByEName =  async (req, res, next) => {
    try {
        const {x} =req.params;
        const regex = new RegExp (x+"$",'i');
        const users = await userModel.find({name:{$regex:regex}})
        return res.json({ message: "Done",users })
    } catch (error) {
        return res.json({ message: 'Catch error' ,error,stack:error.stack });
    }
}

export const searchByMName =  async (req, res, next) => {
    try {
        const {x} =req.params;
        const regex = new RegExp (x,'i');
        const users = await userModel.find({name:{$regex:regex}})
        return res.json({ message: "Done",users })
    } catch (error) {
        return res.json({ message: 'Catch error' ,error,stack:error.stack });
    }
}

export const searchByName =  async (req, res, next) => {
    const {x} =req.params;
    const regex = new RegExp ('^' + x + "$",'i');
    const users = await userModel.find({name:{$regex:regex}})
    return res.json({ message: "Done",users })
}