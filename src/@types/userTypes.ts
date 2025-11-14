import { Response } from "express";

export interface AuthUserResponse extends Response {
  user?: any;
}
