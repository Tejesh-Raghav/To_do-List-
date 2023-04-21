import express from "express";

import { getAllusers,register ,getMyProfile, login,logout} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router =express.Router();



router.get("/usir/all",getAllusers);

router.post("/usir/login",login);

router.get("usir/logout" ,logout);

router.post("/usir/new",register);

router.get("/usir/me", isAuthenticated ,getMyProfile);


export default router;








//router.get("/usir/special",(req,res)=>{
    //     res.json({
    //         message:"Just kidding",
    //     })
    // })