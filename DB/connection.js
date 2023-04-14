import mongoose from "mongoose";
mongoose.set('strictQuery',true)
const connectDB = async () =>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(result => {
        console.log(`DB connected successfully`)
        // console.log(result);
    }).catch(err => console.log(`Fail to connectDB: ${err}`));
}

export default connectDB
