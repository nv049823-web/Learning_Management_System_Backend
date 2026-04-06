import { In } from "typeorm"
import { course } from "../../entities/course"
import { mastercourse } from "../../entities/mastercourse"
import { masterplan } from "../../entities/masterplan"
import { plans } from "../../entities/plans"
import { User } from "../../entities/user"
import { createResponse } from "../../helpers/createResponse"

export const getUser =async (req:any,res:any)=>{
    try{
     const result = await User.find()
    return  createResponse(res,true,200,"Users Fetch Successfully",result,false)

 }catch(error){
    return  createResponse(res,false,500,"Internal Srever Error",[],true)
 }
}
export const getUserDetail =async (req:any,res:any)=>{
    const {id} = req.params;
    try{
     const isExits = await User.findOne({where:{id}})
     if(!isExits){
      return  createResponse(res,false,404,"Users Not Found",[],true)
     }
    
    //User plans
     const userPlanData = await plans.find({where:{user_id:id}});
    if(!userPlanData){
      return  createResponse(res,false,404,"Users Plan Not Found",[],true)
       
    }
     const plansIDs = userPlanData.map((p:any)=>p.plan_id);
     const userPlans = await masterplan.find({where:{id:In(plansIDs)}});    
     //USer course
     const userCoursesData = await course.find({where:{user_id:id}});
     const courseIDs = userCoursesData.map((p:any)=>p.course_id);
     const userCourses = await mastercourse.find({where:{id:In(courseIDs)}})
    return  createResponse(res,true,200,"User Detail",{userDetails:isExits,userPlans,userCourses},false)

 }catch(error){
    const message = error instanceof Error ? error.message : String(error)
    return  createResponse(res,false,500,message,[],true)
 }
}
export const adminmanageDeleteUser =async (req:any,res:any)=>{
    try{
      const {id} = req.params;
     const is_exit = await User.findOne({where:{id}})
     if(is_exit){
    const result = await User.delete({id})
    return  createResponse(res,true,200,"Users Deleted Successfully",result,false)

     }else{
         return createResponse(res,false,404,"User not found",[],true)  
     }

 }catch(error){
    return  createResponse(res,false,500,"Internal Server error",[],true)
 }
}