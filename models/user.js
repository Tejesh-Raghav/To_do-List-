import mongoose from "mongoose";

const schema2 = new mongoose.Schema({
    name:{
        type :String,
        required:true,
    },
    email:{
        type :String,
        required:true,
        unique: true,
    },
    password:{
        type :String,
        required :true,
        select:false,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }
});

export const Usir =mongoose.model("Usir",schema2);