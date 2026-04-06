import { Request, Response } from "express";
import { masterplan } from "../../entities/masterplan";
import { createResponse } from "../../helpers/createResponse";

export const createMasterPlans =async (req:Request,res:Response)=>{
    const {name,desc,credit,price,offer,duration,is_rec,status}= req.body;
    try{
    const isExist = await masterplan.findOne({where:{name}});
 if(isExist){
  return  createResponse(res,false,400,"Plan already exists",[],true)
 }else{
    const result = await masterplan.save({name,desc,credit,price,offer,duration,is_rec,status})
  return  createResponse(res,true,200,"Plan created Successfully",result,false)

 }
 }catch(err){
    return  createResponse(res,false,500,"Internal Srever Error",[],true)
 }
}
export const getMasterPlans =async (req:Request,res:Response)=>{
    try{
     const result = await masterplan.find()
    return  createResponse(res,true,200,"Plans Fetch Successfully",result,false)

 }catch(error){
    return  createResponse(res,false,500,"Internal Srever Error",[],true)
 }
}
export const deleteMasterPlans =async (req:Request,res:Response)=>{
    try{
      const {id} = req.params;
     const is_exit = await masterplan.findOne({where:{id}})
     if(is_exit){
         const result = await masterplan.delete({id})
         return createResponse(res,true,200,"Plan deleted Successfully",result,false)
     }else{
         return createResponse(res,false,404,"Plan not found",[],true)
     }

 }catch(error){
    return  createResponse(res,false,500,"Internal Srever Error",[],true)
 }
}
export const updateMasterPlans =async (req:Request,res:Response)=>{
    try{
      const {id} = req.params;
      const {name,desc,credit,price,offer,duration,is_rec,status} = req.body;
    if(id){
      const is_exist =  await masterplan.findOne({where:{name}});
      if(!is_exist){
       
       const result = await masterplan.update({id},{name,desc,credit,price,offer,duration,is_rec,status})
     return  createResponse(res,true,200,"Plan updated Successfully",result,false)
      }else{
       return createResponse(res,false,404,"Plan Already Exit",[],true)
      }
    }else{
    return  createResponse(res,false,400,"Plan Not Found",[],true)

    }

 }catch(error){
    return  createResponse(res,false,500,"Internal Srever Error",[],true)
 }
}