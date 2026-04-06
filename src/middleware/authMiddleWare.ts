import jwt from "jsonwebtoken";
import { createResponse } from "../helpers/createResponse";
import "dotenv/config";

export const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return createResponse(res, false, 401, "Token not Found", [], true);
    }

    if (!authHeader.startsWith("Bearer ")) {
      return createResponse(res, false, 401, "Invalid Token Format", [], true);
    }

    const token = authHeader.split(" ")[1];
  
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    req.user = decode;
    next();
  } catch (err: any) {
    return createResponse(res, false, 401, err.message, [], true);
  }
};