import {Router} from 'express'
import auth from '../../middleware/auth.js';
import * as productController from  './controller/product.js'
const router = Router();


router.get("/" ,auth,productController.getAllProducts)
router.get("/:id" ,auth,productController.getProductById)
router.post("/",auth,productController.addProduct)
router.put("/",auth,productController.updateProduct)
router.delete("/:id",auth,productController.deleteProduct)


export default  router