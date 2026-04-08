import { Request, Response } from "express";
import { ILike} from "typeorm";
import { masterplan } from "../../entities/masterplan";
import { mastercourse } from "../../entities/mastercourse";
import { createResponse } from "../../helpers/createResponse";


export const userGlobalSearch = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;

    if (!q) {
    return createResponse(res,false,400,"Query Not Found",[],true)
      
    }

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
        plans,courses
    },true)
   

  } catch (error) {
    return createResponse(res,false,500,"Internal Server Problem",[],true)
  }
};