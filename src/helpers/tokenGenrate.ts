import jwt from "jsonwebtoken"
import "dotenv/config"
export const tokenGenrate = async(payload:any)=>{
   const token = jwt.sign(payload,process.env.jwt_Secret as string, { expiresIn: "1d" });
   return token
}