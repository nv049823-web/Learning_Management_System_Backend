import path from "node:path";
import { User } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";
import fs from "node:fs";
import { Not } from "typeorm";
import bcrypt from "bcryptjs";

export const getUserProfile = async(req:any,res:any)=>{
   try{
    const user_id = req.user.id;
    const result = await User.findOne({where:{id:user_id}})
    createResponse(res,true,200,"Profile fetch Successfully",result,false)
   }catch(err){
    createResponse(res,false,500,"Internal Server Problem",[],true)
   }
}
export const updateUserProfile =async (req:any,res:any)=>{
   const profile = req?.files?.profile;
   let profileIMG = profile.name;
   const {name,email,mobile,adress}=req.body;
   const id = req.user.id;
   try{
       const isExist = await User.findOne({where:{id}});
   if(isExist?.id){
       const isExistByEmail = await User.findOne({where:{email, id:Not(id)}});
 if(isExistByEmail){
  return  createResponse(res,false,400,"User already exist",[],true)
 }else{
        if(isExist.profile){
         const fileProfileIMG = path.join(__dirname, "..", "..", "uploads/user_profile/", isExist.profile);
         if (fs.existsSync(fileProfileIMG)) {
          await fs.unlinkSync(fileProfileIMG);
         }
        }
   const findprofileIMG = await User.findOne({where:{profile:profileIMG} });
   if (findprofileIMG) {
      const ext = profileIMG.split(".").pop(); // get extension
      profileIMG = Date.now() + "." + ext;
    }
   await profile.mv("uploads/user_profile/" + profileIMG)
   
 const result = await User.update({id}, {name,email,mobile,adress,profile:profileIMG});
  return  createResponse(res,true,200,"User  Successfully",result,false)
 }
    }else{
      return createResponse(res,false,404,"User nobdvkcdusgv;ound",[],true)
    }
 }catch(err:any){
    return  createResponse(res,false,500,err.message,[],true)
 }
}
export const updateUserPassword = async (req:any,res:any)=>{
   const user_id = req.user.id;
   const {oldPassword,newPassword} = req.body;

   const isExist = await User.findOne({where:{id:user_id}});
   if(!isExist) return createResponse(res,false,404,"User Not Found",[],true)

   if(!oldPassword||!newPassword) return createResponse(res,false,400,"All Field Are Required",[],true);
   const isMatch = await bcrypt.compare(oldPassword,isExist.password);

   if(!isMatch) return createResponse(res,false,400,"Old Password is Incorrect",[],true);
    const hashPassword = await bcrypt.hash(newPassword,10);
     isExist.password = hashPassword
     const result =await isExist.save();
    return createResponse(res,false,200,"Password Changed Successfully",result,true)
}