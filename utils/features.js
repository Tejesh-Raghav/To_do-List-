import jwt from "jsonwebtoken";




export const sendCookie =(cuser,res,message,statusCode=200)=>{
    const token =jwt.sign({_id:cuser._id},process.env.JWT_Secret);    // creating a token of user id

   res.status(statusCode).cookie("token",token,{
    httpOnly:true,
    maxAge:15*60*1000 , // 15 min
    sameSite: process.env.NODE_ENV=="Developement" ? "lax" : "none",
    secure :process.env.NODE_ENV=="Developement" ? false :true,
   }).json({
    success:true,
    message:message
   })
}