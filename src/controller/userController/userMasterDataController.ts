import { masterplan } from "../../entities/masterplan";
import { plans } from "../../entities/plans";
import { User } from "../../entities/user";
import { createResponse } from "../../helpers/createResponse";

export const userPurchasePlanController = async (req:any,res:any)=>{
    try{
        const {plan_id}=req.body;
    const user_id = req.user.id;
    const masterPlanRes = await masterplan.findOne({where:{id:plan_id}});
    if(!masterPlanRes){
       return createResponse(res,false,404,"Plan not found",[],true)
    }
    const userRes = await User.findOne({where:{id:user_id}});
    if(!userRes){
       return createResponse(res,false,404,"User not found",[],true)
    }
    await plans.save({user_id,plan_id})
    const finaleCredit:any = parseInt(masterPlanRes.credit||0)+parseInt(userRes.credit||0);
    await User.update({id:user_id},{credit:finaleCredit})
    return createResponse(res,true,202,"Plan Purchased Successsfully",finaleCredit,true)
    }catch(error){
       return createResponse(res,false,500,"Internal Server Problem",[],true)
    }
    
}