import  express  from "express";
import { newTask ,mytask, updatetask, deletetask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router =express.Router();


router.post("/new",isAuthenticated ,newTask);          // is authenticated is present in middleware folder

router.get("/mytasks",isAuthenticated,mytask);

router.route("/:id").put(updatetask).delete(deletetask);                // we have made two functions put for update in a task 
                                                    //                          delete for delete a task        
export default router;                                  