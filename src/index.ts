import express from "express";
import { AppdataSoucre } from "./dbconfig/dbConfig";
import { userRouter } from "./routes/users/userrouter";
import { adminRouter } from "./routes/admin/adminRouter";
import cors from "cors"
import fileupload from "express-fileupload";
import path from "node:path";
const app = express();
app.use(express.json());
app.use(cors())
app.use(fileupload())
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
AppdataSoucre.initialize().then(()=>{
    console.log("Db connect")
   

}).catch((err)=>{
    console.log("Db not connect",err)

})
app.use("/api",userRouter)
app.use("/api",adminRouter)
app.listen(9000,()=>{
    console.log("Server Strat")
})