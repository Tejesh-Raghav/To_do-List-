// we have install express ,mongoose, dotenv, cookie-parser
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";           // connecting for variables store in config.env and use in server.js and database.js
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app =express();

config({
    path:"./data/config.env"
})
app.use(express.json())
app.use(cookieParser())         // this is used to get token from cookie


// method 1 to call mongo db
// mongoose.connect("mongodb://127.0.0.1:27017",{
//     dbName:"backendapi"
// }).then(()=> console.log("Database connected"))
// .catch((e)=> console.log(e));
// we have write all above mongoose code in data>database.js 



// now we have to create a model

const schema =new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

const User =mongoose.model("User",schema);

app.get('/',(req,res)=>{
    res.send("Welcome this is / page")
})

app.get('/users/all',async (req,res)=>{

   const allusers =await User.find({})     // it will find all users in db

    res.json({
        sucess:true,
        users:allusers,
    })
})

app.post("/user/new",async (req,res)=>{  // as this is a post request u cant be able to see it in browser becoz browser accept only get request
                                           //use postman or make frontend just like previous
    // const newuser = await User.create({           this is manually creation
    //     name:"lakadbagga",
    //     email:"ladaku.btele17@pec.edu.in",
    //     password:"myname",
    // })

    // now we create through postman no need of frontend but for that we have to use a middleware app.use(express.json())
    const {name ,email ,password} =req.body;
    await User.create({                         // u have to fill values of name ,email ,password through postman for that go to body > raw> select JSON
        name: name,
        email : email,

        password: password,
    })
    res.status(201).cookie("temp1","lol").json({                   // status code 201 means created
        sucess:true,
        message:"Registered",
    })
})





// now we are doing dynamic api

app.get("/userid",async (req,res)=>{         // put the value of id in postman by "id": "hereis id"
    const {id} =req.body
    const useri =await User.findById(id);

    res.json({
        success:true,
        user: useri,
    })
})


// upr wala tarika kaafi lengthy hai like for every id we have to give input in postman body

app.get("/userid/:id",async (req,res)=>{         // put the value of id in postman by "id": "hereis id"
    const {id} =req.params;
    const useri =await User.findById(id);

    res.json({
        success:true,
        user: useri,
    })
})

// in above if we type url userid/abhishek  toh yeh hme abhishek ka user dedega but id to real mein 64397dc7784b1fede427f470 yeh ha .likh kr daal

// Now we will learn route splitting ,in future we will make route by this only 
//make folder of everything like routes,schema,functions(that is under routes functions we have put it in controller folder);
import userRouter from "./routes/user.js";
import taskrouter from "./routes/task.js";
app.use(taskrouter);
app.use(userRouter);
// as we know that in routes user.js we have all urls starting with /usir so we can remove /usir from user.js 
// and we can do like this app.use("/usir",userRouter)     //it is called prefix

// using errorMiddleware
app.use(errorMiddleware)         // this is use for error;