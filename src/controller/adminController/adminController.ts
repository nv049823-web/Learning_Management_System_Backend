import { Request, Response } from "express";
import { createResponse } from "../../helpers/createResponse";
import bcrypt from "bcrypt";
import { tokenGenrate } from "../../helpers/tokenGenrate";
import { admin } from "../../entities/admin";
import path from "node:path";
import fs from "node:fs"
import { Op } from "sequelize";
import { Not } from "typeorm";
export const adminRegister =async (req:Request,res:Response)=>{
    const {name,email,password="Test@1234",mobile}= req.body;
    try{
    const isExist = await admin.findOne({where:{email:email}});
 if(isExist){
  return  createResponse(res,false,400,"User already exists",[],true)
 }else{
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await admin.save({name,email,password:hashedPassword,mobile})
    return  createResponse(res,true,201,"User registered successfully",result,false)
 }
 }catch(err){
    return  createResponse(res,false,500,"Internal Srever Error",[],true)
 }
}
export const adminLogin=async (req:Request,res:Response)=>{
    const {email,password="Test@1234",mobile}= req.body;
    try{
      const isExist = await admin.findOne({where:{email:email}});
      if(!isExist){
       return  createResponse(res,false,404,"User not found",[],true)
      }else{
        const isMatched = await bcrypt.compare(password,isExist.password);
        if(!isMatched){
       return  createResponse(res,false,404,"Please enter valid password",[],true)
        }else{
         const payload = {email:isExist.email,id:isExist.id}  
         const token = await tokenGenrate(payload)
        return  createResponse(res,true,200,"User Login successfully",{...isExist,token},false)
        }
      }
    }catch(err){
       return  createResponse(res,false,500,"Internal Srever Error",[],true)
    }
   }
export const AlladminGetController = async(req:any,res:any)=>{
 try{
   const result = await admin.find();
 return createResponse(res,true,201,"User get successfully",result,false)
 }catch(err){
       return  createResponse(res,false,500,"Internal Srever Error",[],true)
 }
}
export const adminGetController =async (req:any,res:any)=>{
   
   try{
   const id = req.user.id;
   const result = await admin.findOne({where:{id}});
    return createResponse(res,true,201,"User get successfully",result,false)
    }catch(err){
          return  createResponse(res,false,500,"Internal Srever Error",[],true)
    }
}

export const adminDelteControl =async (req:any,res:any)=>{
   
   try{
   const {id} = req.params;
   const is_exit = await admin.findOne({where:{id}})
   if(!is_exit){
      return  createResponse(res,false,404,"User not found",[],true)
   }
   const result = await admin.delete({id})
   return  createResponse(res,true,201,"User Delete Successfully",result,true)
   
    }catch(err){
          return  createResponse(res,false,500,"Internal Srever Error",[],true)
    }

}
export const updateAdminProfile =async (req:any,res:any)=>{
   const profile = req?.files?.profile;
   let profileIMG = profile.name;
   const {name,email,mobile,adress}=req.body;
   const id = req.user.id;
    try{
       const isExist = await admin.findOne({where:{id}});
       const isExistByEmail = await admin.findOne({where:{email, id:Not(id)}});
    if(isExist){
 if(isExistByEmail){
  return  createResponse(res,false,400,"User already exist",[],true)
 }else{
      //Delete Previous Profile
        if(isExist.profile){
         const fileProfileIMG = path.join(__dirname, "..", "..", "uploads/admin_profile/", isExist.profile);
         if (fs.existsSync(fileProfileIMG)) {
          await fs.unlinkSync(fileProfileIMG);
         }
        }
   const findprofileIMG = await admin.findOne({where:{profile:profileIMG} });
   if (findprofileIMG) {
      const ext = profileIMG.split(".").pop(); // get extension
      profileIMG = Date.now() + "." + ext;
    }
  
    profile.mv("uploads/admin_profile/" + profileIMG, (err:any) => {
      if (err) return createResponse(res,false,500,err,[],true)
      })
   
 const result = await admin.update({id}, {name,email,mobile,adress,profile:profileIMG});
  return  createResponse(res,true,200,"User Updated Successfully",result,false)

 }
    }else{
      return createResponse(res,false,404,"User not Found",[],true)
    }
 }catch(err:any){
    return  createResponse(res,false,500,err.message,[],true)
 }
}