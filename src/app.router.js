import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js'
import productRouter from './modules/product/product.router.js';
import connectDB from '../DB/connection.js';

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMsg: 15 * 60 * 1000,
    max:100
})


const initApp = (app, express) => {

    app.use(express.json({}))
    
    app.get('/', (req, res) => res.send('<h1>Hello World! <br> welcome to product API</h1>'))
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/product', productRouter)

    app.use("*" , (req,res)=>{
        return res.json({message:"404 Page Not Found"})
    })
    connectDB()
}
export default initApp