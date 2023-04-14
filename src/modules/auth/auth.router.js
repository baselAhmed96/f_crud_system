import {Router} from 'express'
import * as authController from  './controller/auth.js'
// import loginRouteRateLimit from './controller/redis-client.js';
const router = Router();



router.get("/" , authController.getAuthModule)
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout',authController.logout)

export default  router