import { Request, Response } from "express";
import { ILike } from "typeorm";
import { createResponse } from "../../helpers/createResponse";
import { User } from "../../entities/user";
import { mastercourse } from "../../entities/mastercourse";
import { masterplan } from "../../entities/masterplan";


export const adminGlobalSearch = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
     
    if (!q) {
    return createResponse(res,false,400,"Query Not Found",[],true)
     
    }

    const users = await User.find({
      where: [
        { name: ILike(`%${q}%`) },
        { email: ILike(`%${q}%`) },
        { mobile: ILike(`%${q}%`) },
      ],
    });

    const courses = await mastercourse.find({
      where: [
        { title: ILike(`%${q}%`) },
        { desc: ILike(`%${q}%`) },
        { type: ILike(`%${q}%`) },
      ],
    });

    const plans = await masterplan.find({
      where: [
        { name: ILike(`%${q}%`) },
      ],
    });

    return createResponse(res,true,200,"Result",{
        plans,courses,users
    },true)

  } catch (error) {
    return createResponse(res,false,500,"Internal Server Problem",[],true)
    
  }
};