import express from "express";
import { userLogin, userRegister } from "../../controller/userController/userAuthController";
import { userPurchasePlanController } from "../../controller/userController/userMasterDataController";
import { verifyToken } from "../../middleware/authMiddleWare";
import { getUserProfile, updateUserProfile } from "../../controller/userController/userProfileController";
import { getUserPurchasedCourse, getUserPurchasedPlans, purchaseCourse, purchasePlan } from "../../controller/userController/userPurchaseController";
import { userResetPassword, userSendOtp } from "../../controller/userController/userforgetPasswordController";
import { userGlobalSearch } from "../../controller/userController/globalSearchController";
export const userRouter=express.Router();
userRouter.post("/resiter",userRegister)
userRouter.post("/login",userLogin)

//UserProfile
userRouter.put("/update-user",verifyToken,updateUserProfile)
userRouter.get("/user-profile",verifyToken,getUserProfile);


userRouter.post("/user-purchaseing-plan/:id",verifyToken,purchasePlan)
userRouter.post("/user-purchaseing-course/:id",verifyToken,purchaseCourse)
userRouter.get("/user-purchased-plans",verifyToken,getUserPurchasedPlans)
userRouter.get("/user-purchased-courses",verifyToken,getUserPurchasedCourse)

//forgetPassword user
userRouter.post("/user-send-otp",userSendOtp);
userRouter.post("/user-verify-otp",userResetPassword);

//search data
userRouter.get("/user-search",verifyToken,userGlobalSearch)