import bcrypt from "bcrypt";
import { createResponse } from "../../helpers/createResponse";
import { sendEmail } from "../../helpers/sendEmail";
import { User } from "../../entities/user";

export const userSendOtp = async (req:any,res:any)=>{
    const {email}=req.body;
    try{
       const is_exist = await User.findOne({where:{email}});
        if(!is_exist) return createResponse(res,false,404,"User Not Found",[],true);
        
        //OTP
        const otp = Math.floor(100000+Math.random()*900000).toString()
        //Send OTP
        const sendOTP= await sendEmail(email,"Verify OTp",`<p>Your OTP is ${otp} </p>`)
        if(!sendOTP.success) return createResponse(res,false,500,sendOTP.Email_sending_Error,[],true)
        is_exist.otp = otp;
        is_exist.otp_expiry= new Date(Date.now()+ 5*60*1000);
        await is_exist.save();  

        return createResponse(res, true, 200, "OTP sent to email.Please check your email!",sendOTP, false);
    }catch(err){
        console.log("ForgetPassword Error:",err);
        return createResponse(res,false,500,"Internal Server Problem",[],true)
    }
}

export const userResetPassword = async(req:any,res:any)=>{
    const {otp,email,newPassword}= req.body;
    try{
         const user = await User.findOne({where:{email}});
         if(!user) return  createResponse(res,false,404,"User Not Found",[],true);
         if(otp !== user.otp) return  createResponse(res, false, 400, "Invalid OTP", [], true);
         if(new Date()> user.otp_expiry) return createResponse(res, false, 400, "OTP expired", [], true);
         const hashPassword = await bcrypt.hash(newPassword,10)
         user.password=hashPassword;
         user.otp=null;
         user.otp_expiry=null;
         const result = await user.save()
         return createResponse(res, true, 200, "Password reset successful",result, false);

    }catch(err){
        console.log("ForgetPassword Error:",err);
        return createResponse(res,false,500,"Internal Server Problem",[],true)
    }
}