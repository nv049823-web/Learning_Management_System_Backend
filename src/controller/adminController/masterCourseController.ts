import { Request, Response } from "express";
import { mastercourse } from "../../entities/mastercourse";
import { createResponse } from "../../helpers/createResponse";
import path from "node:path";
import fs from "node:fs";  

export const createMasterCourse =async (req:any,res:any)=>{
   if(!req.files||!req.files.thumbnail||!req.files.content){
      return createResponse(res,false,404,"Thumbnail And content required",[],true)
   }
   const thumbnail = req.files.thumbnail;
   let thumbnailName = thumbnail.name;
   const content = req.files.content;
   let contentName = content.name;
   const {title,desc,level,rating,duration,type,status,price,offer}=req.body;
    try{
    const isExist = await mastercourse.findOne({where:{title}});
 if(isExist){
  return  createResponse(res,false,400,"Course already exists",[],true)
 }else{
   const thumbnailFile = await mastercourse.findOne({where:{thumbnail:thumbnailName} });
   const contentFile = await mastercourse.findOne({where:{content:contentName} });
   if (thumbnailFile) {
      const ext = thumbnailName.split(".").pop(); // get extension
      thumbnailName = Date.now() + "." + ext;
    }
   if (contentFile) {
      const ext = contentName.split(".").pop(); // get extension
      contentName = Date.now() + "." + ext;
    }
   thumbnail.mv("uploads/thumbnail/" + thumbnailName, (err:any) => {
      if (err) return createResponse(res,false,500,err,[],true)
      })
   content.mv("uploads/content/" + contentName, (err:any) => {
      if (err) return createResponse(res,false,500,err,[],true)
      })
 const result = await mastercourse.save( {title,desc,level,rating,duration,type,status,price,offer,thumbnail:thumbnailName,content:contentName});
  return  createResponse(res,true,200,"Course created Successfully",result,false)

 }
 }catch(error){
   console.log(error)
    return  createResponse(res,false,500,"Internal Server Error",[],true);
    
 }
}
export const getMasterCourse =async (req:Request,res:Response)=>{
    try{
     const result = await mastercourse.find()
    return  createResponse(res,true,200,"Courses Fetch Successfully",result,false)

 }catch(error){
    return  createResponse(res,false,500,"Internal Srever Error",[],true)
 }
}
export const deleteMasterCourse =async (req:any,res:any)=>{
    try{
      const {id} = req.params;
     const is_exit = await mastercourse.findOne({where:{id}})
     if(is_exit){
      //Delete Thumbnail
      if (is_exit.thumbnail) {
         const filethumbnail = path.join(__dirname, "..", "..", "uploads/thumbnail", is_exit.thumbnail);
   
         if (fs.existsSync(filethumbnail)) {
           fs.unlinkSync(filethumbnail);
         }
       }
   
       // Delete content
       if (is_exit.content) {
         const fileContent = path.join(__dirname, "..", "..", "uploads/content", is_exit.content);
   
         if (fs.existsSync(fileContent)) {
           fs.unlinkSync(fileContent);
         }
       }
         const result = await mastercourse.delete({id})
         return createResponse(res,true,200,"Courses deleted Successfully",result,false)
     }else{
         return createResponse(res,false,404,"Courses not found",[],true)
     }

 }catch(error){
    return  createResponse(res,false,500,"Internal Server error",[],true)
 }
}
export const updateMasterCourse =async (req:any,res:any)=>{
   if(!req.files||!req.files.thumbnail||!req.files.content){
      return createResponse(res,false,404,"Thumbnail And content required",[],true)
   }
   const thumbnail = req.files.thumbnail;
   let thumbnailName = thumbnail.name;
   const content = req.files.content;
   let contentName = content.name;
   const {title,desc,level,rating,duration,type,status}=req.body;
   const {id} = req.params;
    try{

       const isExist = await mastercourse.findOne({where:{id}});
    if(isExist){
 if(title==isExist.title){
  return  createResponse(res,false,400,"Course already exist",[],true)
 }else{
      //Delete Thumbnail
         const filethumbnail = path.join(__dirname, "..", "..", "uploads/thumbnail", isExist.thumbnail);
   
         if (fs.existsSync(filethumbnail)) {
          await fs.unlinkSync(filethumbnail);
         }
       
   
       // Delete content
         const fileContent = path.join(__dirname, "..", "..", "uploads/content", isExist.content);
   
         if (fs.existsSync(fileContent)) {
          await fs.unlinkSync(fileContent);
         }

   const thumbnailFile = await mastercourse.findOne({where:{thumbnail:thumbnailName} });
   const contentFile = await mastercourse.findOne({where:{content:contentName} });
   if (thumbnailFile) {
      const ext = thumbnailName.split(".").pop(); // get extension
      thumbnailName = Date.now() + "." + ext;
    }
   if (contentFile) {
      const ext = contentName.split(".").pop(); // get extension
      contentName = Date.now() + "." + ext;
    }
    thumbnail.mv("uploads/thumbnail/" + thumbnailName, (err:any) => {
      if (err) return createResponse(res,false,500,err,[],true)
      })
    content.mv("uploads/content/" + contentName, (err:any) => {
      if (err) return createResponse(res,false,500,err,[],true)
      })
 const result = await mastercourse.update({id}, {title,desc,level,rating,duration,type,status,thumbnail:thumbnailName,content:contentName});
  return  createResponse(res,true,200,"Course Updated Successfully",result,false)

 }
    }else{
  return  createResponse(res,true,200,"Course not Found",[],false)
    }
 }catch(err){
    return  createResponse(res,false,500,"Internal Server Error",[],true)
 }
}