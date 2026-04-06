import { In } from "typeorm";
import { course } from "../../entities/course";
import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan";
import { plans } from "../../entities/plans";
import { User } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";

export const purchasePlan = async (req: any, res: any) => {
    try {
      const { plan_id } = req.params;
      const user_id = req.user.id;
  
      // 1. Validate input
      if (!plan_id) {
        return createResponse(res, false, 400, "Plan ID is required", [], true);
      }
      // 2. Check plan exists
      const planData = await masterplan.findOne({
        where: { id: plan_id }
      });
  
      if (!planData) {
        return createResponse(res, false, 404, "Plan not found", [], true);
      }
      // User Exists
      const userRes = await User.findOne(
      {  where:{id:user_id}}
      )
      if (!userRes) {
        return createResponse(res, false, 404, "User not found", [], true);
      }
      // 3. Check if user already purchased
      const existingPurchase = await plans.findOne({
        where: { user_id, plan_id }
      });
  
      if (existingPurchase) {
        return createResponse(res, false, 400, "Plan already purchased", [], true);
      }
  
      // 4. Save purchase
      const purchase = await plans.save({
        user_id,
        plan_id,
       
      });
      //User Credit Update
      const finaleCredit:any = parseInt(planData.credit||0)+parseInt(userRes.credit||0);
      await User.update({id:user_id},{credit:finaleCredit})

      // 5. Response
      return createResponse(res, true, 200, "Plan purchased successfully", purchase, false);
  
    } catch (error) {
      console.log("ERROR:", error);
      return createResponse(res, false, 500, "Internal server error", [], true);
    }
  };
export const purchaseCourse = async (req: any, res: any) => {
    try {
      const { course_id } = req.params;
      const user_id = req.user.id;
  
      // 1. Validate input
      if (!course_id) {
        return createResponse(res, false, 400, "Course ID is required", [], true);
      }
  
      // 2. Check Course exists
      const CourseData = await mastercourse.findOne({
        where: { id: course_id }
      });
  
      if (!CourseData) {
        return createResponse(res, false, 404, "Course not found", [], true);
      }
      // User Exists
      const userRes = await User.findOne(
      {  where:{id:user_id}}
      )
      if (!userRes) {
        return createResponse(res, false, 404, "User not found", [], true);
      }
  
      // 3. Check if user already purchased
      const existingPurchase = await course.findOne({
        where: { user_id, course_id }
      });
  
      if (existingPurchase) {
        return createResponse(res, false, 400, "Course already purchased", [], true);
      }
  
      // 4. Save purchase
      const purchase = await course.save({
        user_id,
        course_id,
       
      });
  
      // 5. Response
      return createResponse(res, true, 200, "Course purchased successfully", purchase, false);
  
    } catch (error) {
      console.log("ERROR:", error);
      return createResponse(res, false, 500, "Internal server error", [], true);
    }
  };
export const getUserPurchasedPlans =async (req:any,res:any)=>{
      const user_id = req.user.id;
      try{
       const isExits = await User.findOne({where:{id:user_id}})
       if(!isExits){
        return  createResponse(res,false,404,"Users Not Found",[],true)
       }
      
      //User plans
       const userPlanData = await plans.find({where:{user_id}});
      if(!userPlanData){
        return  createResponse(res,false,404,"Users Plan Not Found",[],true)
         
      }
       const plansIDs = userPlanData.map((p:any)=>p.plan_id);
       const userPlans = await masterplan.find({where:{id:In(plansIDs)}});    
      return  createResponse(res,true,200,"User Plans",userPlans,false)
  
   }catch(error){
      const message = error instanceof Error ? error.message : String(error)
      return  createResponse(res,false,500,message,[],true)
   }
  }
export const getUserPurchasedCourse =async (req:any,res:any)=>{
      const user_id = req.user.id;
      try{
       const isExits = await User.findOne({where:{id:user_id}})
       if(!isExits){
        return  createResponse(res,false,404,"Users Not Found",[],true)
       }
      
      //User plans
       const userCourseData = await course.find({where:{user_id}});
      if(!userCourseData){
        return  createResponse(res,false,404,"Users Course Not Found",[],true)
         
      }
       const CourseIDs = userCourseData.map((p:any)=>p.plan_id);
       const userCourse = await mastercourse.find({where:{id:In(CourseIDs)}});    
      return  createResponse(res,true,200,"User Courses",userCourse,false)
  
   }catch(error){
      const message = error instanceof Error ? error.message : String(error)
      return  createResponse(res,false,500,message,[],true)
   }
  }