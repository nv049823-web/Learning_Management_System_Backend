import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan";
import { User } from "../../entities/user"
import { createResponse } from "../../helpers/createResponse";

 export const getDashboardStats = async (req:any,res:any)=>{
   try{
    //User
    const totalUsers = await User.count();
    const activeUsers = await User.count({where:{status:1}})

    //plans
    const totalMasterPlans = await masterplan.count();
    const activeMasterPlans = await masterplan.count({where:{status:"Active"}});
    
    
    //Course
    const totalCourse= await mastercourse.count();
    const activeCourse= await mastercourse.count({where:{status:"Active"}})

    //months 
    const months =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return  createResponse(res,true,200,"Dashboard get Successfully",{user:{totalUsers,activeUsers},
        masterPlan:{totalMasterPlans,activeMasterPlans},
        masterCourse:{totalCourse,activeCourse}},false)

    
   }catch(error){
    return  createResponse(res,false,500,"Internal Srever Error",[],true)
    
   }
}