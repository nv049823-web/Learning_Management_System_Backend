import { admin } from "../../entities/admin";
import bcrypt from "bcrypt";
import { createResponse } from "../../helpers/createResponse";
import { sendEmail } from "../../helpers/sendEmail";

export const adminSendOtp = async (req:any,res:any)=>{
    const {email}=req.body;
    try{
       const is_exist = await admin.findOne({where:{email}});
        if(!is_exist) return createResponse(res,false,404,"User Not Found",[],true);
        //OTP
        const otp = Math.floor(100000+Math.random()*900000).toString();
       console.log(otp)
        //Send OTP
        const sendOTP= await sendEmail(email,"Verify OTp",`<p>Your OTP is ${otp} </p>`)
        if(sendOTP.success==false) return createResponse(res,false,404,sendOTP.Email_sending_Error,[],true);
        is_exist.otp = otp;
        is_exist.otp_expiry= new Date(Date.now()+ 5*60*1000);
        await is_exist.save();
        return createResponse(res, true, 200, "OTP sent to email.Please check your email!",sendOTP, false);
    }catch(err){
        console.log("ForgetPassword Error:",err);
        return createResponse(res,false,500,"Internal Server Problem",[],true)
    }
}

export const adminResetPassword = async(req:any,res:any)=>{
    const {otp,email,newPassword}= req.body;
    try{
         const Isadmin = await admin.findOne({where:{email}});
         if(!Isadmin) return  createResponse(res,false,404,"User Not Found",[],true);
         if(otp !== Isadmin.otp) return  createResponse(res, false, 400, "Invalid OTP", [], true);
         if(new Date()> Isadmin.otp_expiry) return createResponse(res, false, 400, "OTP expired", [], true);
         const hashPassword = await bcrypt.hash(newPassword,10)
         Isadmin.password=hashPassword;
         Isadmin.otp=null;
         Isadmin.otp_expiry=null;
         const result = await Isadmin.save()
         return createResponse(res, true, 200, "Password reset successful",result, false);

    }catch(err){
        console.log("ForgetPassword Error:",err);
        return createResponse(res,false,500,"Internal Server Problem",[],true)
    }
}