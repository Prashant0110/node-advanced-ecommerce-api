import { Request } from "express";
import { AuthenticationData } from "../validators/input.validator";
import { AuthUserResponse } from "../../@types/userTypes";

declare global {
  namespace Express {
    interface Request {
      validatedBody?: AuthenticationData;
      user?: AuthUserResponse;
    }
  }
}
