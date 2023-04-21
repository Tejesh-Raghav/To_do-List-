import mongoose from "mongoose";

const schema2 = new mongoose.Schema({
    title :{
        type:String,
        required:true,
   },
    description :{
         type:String,
         required:true,
    },
    isCompleted:{
        type :Boolean,
        default:false,
    },
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref:"Usir",
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }
});

export const Task =mongoose.model("Task",schema2);