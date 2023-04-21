import { Usir } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import cookieParser from "cookie-parser";
// first install jsonwebtoken and bcrypt by npm i jsonwebtoken and npm i

export const getAllusers = async(req,res)=>{
    const users =await Usir.find({});

    res.json({
        success:true,
        user:users,
    })
}

export const login =async(req,res,next)=>{
    const {email ,password} = req.body;
    const user =await Usir.findOne({email}).select("+password");  // this to .select is used to grab all info with password (as we have hide the password)

    if(!user){
        return res.status(404).json({
            success:false,
            message:"Invalid email and password",
        })
    }
    const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(404).json({
            success:false,
            message:"Invalid email and password",
        })
    }

    sendCookie(user,res,`welcome back, ${user.name}`,200);

}

export const logout =()=>{
    res.status(200).cookie("token","",{expires:new Date(Date.now)}).json({
        success:true,
        message:"Log -out",
        sameSite: process.env.NODE_ENV=="Developement" ? "lax" : "none",
        secure :process.env.NODE_ENV=="Developement" ? false :true,
    })
}







export const register = async (req,res)=>{
   const {name ,email ,password} = req.body;

   const user =await Usir.findOne({email});

   if(user){
    return res.status(404).json({
        success:false,
        message:"User already exist"
    })
   }
   const hashpasswrd =await bcrypt.hash(password,10)          // 10 is how strong u want
   const cuser = await Usir.create({name,email,password:hashpasswrd,});
   
   sendCookie(cuser,res,"Registered Successfully",201);


}


export const getMyProfile =async (req,res)=>{
       
    // firstly we have to check whether user is login or not for that we have made a function isauthenticated in middlewares
    

      res.status(200).json({
        success:true,
        user:req.user,
      })

}
// like this we can export all functions which is routes>user.js