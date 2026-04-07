import { Request, Response } from "express";
import { User } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";
import bcrypt from "bcrypt";
import { tokenGenrate } from "../../helpers/tokenGenrate";
export const userRegister =async (req:Request,res:Response)=>{
    const {name,email,password="Test@1234",mobile}= req.body;
    try{
    const isExist = await User.findOne({where:{email:email}});
 if(isExist){
  return  createResponse(res,false,400,"User already exists",[],true)
 }else{
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await User.save({name,email,password:hashedPassword,mobile})
    return  createResponse(res,true,201,"User registered successfully",result,false)
 }
 }catch(err){
    return  createResponse(res,false,500,"Internal Srever Error",[],true)
 }
}
export const userLogin=async (req:Request,res:Response)=>{
    const {email,password="Test@1234",mobile}= req.body;
    try{
      const isExist = await User.findOne({where:{email:email}});
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
   