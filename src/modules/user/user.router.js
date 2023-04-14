import {Router} from 'express'
import auth from '../../middleware/auth.js';
import * as userController from  './controller/user.js'
const router = Router();


router.get("/" , auth,userController.getAllUsers)
router.get("/profile",auth, userController.profile)
// router.post("/", userController.insertMany)
router.put("/" ,auth, userController.updateUser)
router.delete("/" ,auth, userController.deleteUser)


router.get("/start/:x/:y" , userController.searchBySNameAge)
router.get("/end/:x" , userController.searchByEName)
router.get("/med/:x" , userController.searchByMName)
router.get("/name/:x" , userController.searchByName)
export default  router