import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";


export const newTask =async (req,res,next)=>{
        const {title ,description }= req.body;
        await Task.create({
            title,
            description,
            user: req.user
        })
        res.status(201).json({
            success:true,
            message:"Task added Successfully",
        })
        
}

export const mytask =async (req,res,next)=>{
    const userid =req.user._id;
    const alltask =await Task.find({user: userid});

    res.status(200).json({
        success:true,
        Your_Task : alltask,
    })
}

export const updatetask = async (req,res,next)=>{
    const {id} =req.params;
      
   const task =await Task.findById(id);
   task.isCompleted =!task.isCompleted;
   await task.save(); 
    req.json({
        success:true,
    })
}

export const deletetask = async (req,res,next)=>{

    const {id} =req.params;
      
    const task =await Task.findById(id);
    if(!task) return next(new ErrorHandler("this is a invalid type",300));                //this is call error handling  ,it goes to  middleware error.js
    await task.deleteOne();                                                            // we can do this anywhere where we want it to be


    req.json({
        success:true,
    })
}