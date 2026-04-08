import { createTransport } from "nodemailer";
import type { TransportOptions } from "nodemailer";
import "dotenv/config"
export const sendEmail = async(to:string,subject:string,html:string)=>{
    try{
        const transporter = createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:{
                user:process.env.transporter_email as string,
                password:process.env.transporter_password as string
            }
        } as TransportOptions)
        const res = await transporter.sendMail({
            from:process.env.transporter_email as string,
            to:to,
            subject:subject,
            html:html       
        })
        return {
            result:res,
            success:true
        }
            
        }catch(err){
        console.log("Email Sending Error:",err)
        return  {
            Email_sending_Error:err,
            success:false
        }
    }
}