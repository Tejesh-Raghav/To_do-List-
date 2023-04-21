import mongoose from "mongoose";



export const connectDb =()=>{
    mongoose.connect(process.env.MONGO_URI,{      // instead of giving URI i have given a variable which is store in data>config.js ,also we have to connect it to app.js
    dbName:"backendapi"
}).then(()=> console.log("Database connected"))
.catch((e)=> console.log(e));
}

// value of process.env.MONGO_URI is  mongodb://127.0.0.1:27017 which is store in data>config.env   