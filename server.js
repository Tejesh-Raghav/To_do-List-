import {app} from "./app.js"
import { connectDb } from "./data/database.js";


connectDb();            // calling to call the mongodb



app.listen(process.env.PORT,()=>{
        console.log(`server is working on port no. : ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
    })



// value of process.env.PORT is 4000 which is store in data>config.env    

// for server deployment we have import cors by npm i cors