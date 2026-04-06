import express from "express";
import { adminDelteControl, adminGetController, adminLogin, adminRegister, AlladminGetController, updateAdminProfile } from "../../controller/adminController/adminController";
import { createMasterPlans, deleteMasterPlans, getMasterPlans, updateMasterPlans } from "../../controller/adminController/masterplanController";
import { createMasterCourse, deleteMasterCourse, getMasterCourse, updateMasterCourse } from "../../controller/adminController/masterCourseController";
import { adminmanageDeleteUser, getUser, getUserDetail } from "../../controller/adminController/adminUserManageController";
import { getDashboardStats } from "../../controller/adminController/getDashboardStats";
import { verifyToken } from "../../middleware/authMiddleWare";
export const adminRouter=express.Router();
adminRouter.post("/admin-resiter",adminRegister)
adminRouter.post("/admin-login",adminLogin)
adminRouter.get("/get-all-admin",verifyToken,AlladminGetController)
adminRouter.get("/get-admin-profile",verifyToken,adminGetController)
adminRouter.delete("/delete-admin/:id",verifyToken,adminDelteControl)
adminRouter.put("/update-admin",verifyToken,updateAdminProfile)

// master plans
adminRouter.post("/create-master-plan",verifyToken,createMasterPlans)
adminRouter.get("/get-master-plan",getMasterPlans)
adminRouter.delete("/delete-master-plan/:id",verifyToken,deleteMasterPlans)
adminRouter.put("/update-master-plan/:id",verifyToken,updateMasterPlans)

//master course
adminRouter.post("/create-master-course",createMasterCourse)
adminRouter.get("/get-master-course",getMasterCourse)
adminRouter.delete("/delete-master-course/:id",verifyToken,deleteMasterCourse)
adminRouter.put("/update-master-course/:id",verifyToken,updateMasterCourse)

// users
adminRouter.get("/all-users",verifyToken,getUser)
adminRouter.get("/user-details/:id",getUserDetail)
adminRouter.delete("/delete-user/:id",verifyToken,adminmanageDeleteUser)
//dashboard
adminRouter.get("/get-dashboard",verifyToken,getDashboardStats)