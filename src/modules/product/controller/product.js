import productModel from "../../../../DB/model/product .model.js"

export const getAllProducts = async (req, res, next) => {
    try {
        if(!req.user._id){
            return res.json({ message:'Not authorized'});
        }
        const products = await productModel.find().populate({
            path:'createdBy',
            select:'name email'
        })
        return res.json({ message: "Done" ,products})
    } catch (error) {
        return res.json({ message: "Catch error" ,error})
    }
}


export const addProduct =  async (req, res, next) => {
    try {
        if(!req.user._id){
            return res.json({ message:'Not authorized'});
        }
        const {title,content}=req.body;
        const addProduct = await productModel.create({title,content,createdBy:req.user._id})
        return res.json({ message:'Done', addProduct})
    }catch (error) {
        return res.json({ message: "Catch error" ,error})
    }
}

export const updateProduct = async (req, res, next) => { 
    const {title,content}=req.body;
    const {id} = req.params
    const product = await productModel.findOneAndUpdate({_id:id,createdBy:req.user._id},{title,content},{new:true});
    return product? res.json({ message:'Updated product',product})
                    :res.json({ message:'In-valid product'})
}
export const deleteProduct = async (req, res, next) => { 
    try {
        const {id} = req.params;
        const deleteProduct = await productModel.findOneAndDelete({_id:id,createdBy:req.user._id});
        return deleteProduct? res.json({ message:'Deleted product',deleteProduct})
                            : res.json({ message:'Not authorized to delete'});
    } catch (error) {
        return res.json({ message:'Catch error', error,stack:error.stack });
    }
}

export const getProductById = async (req, res, next) => {
    try {
        if(!req.user._id){
            return res.json({ message:'Not authorized'});
        }
        const {id} = req.params;
        const products = await productModel.findById(id)
        
        return res.json({ message: "Done" ,products})
    } catch (error) {
        return res.json({ message: "Catch error" ,error})
    }
}




