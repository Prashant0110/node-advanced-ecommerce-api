// import { NextFunction, Request, Response } from "express";
// import { z, ZodError, ZodObject } from "zod"; // Import `z` and `ZodObject`
// import logger from "../config/logger.config";

// /**
//  *
//  * @param schema - Zod schema to validate the request body
//  * @returns - Middleware function to validate the request body
//  */
// export const validateRequestBody = (schema: ZodObject<any>) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       logger.info("Validating request body");
//       await schema.parseAsync(req.body);
//       logger.info("Request body is valid");
//       next();
//     } catch (error: ZodError<any>) {
//       // Handle Zod validation errors specifically
//       if (error instanceof ZodError) {
//         logger.error("Request body validation failed", error.errors);
//         return res.status(400).json({
//           message: "Invalid request body",
//           success: false,
//           errors: error.errors.map((error) => error.message), // Return specific validation errors
//         });
//       }

//       // Handle other unexpected errors
//       logger.error("Unexpected error during body validation", error);
//       res.status(500).json({
//         message: "Internal server error",
//         success: false,
//       });
//     }
//   };
// };

// /**
//  *
//  * @param schema - Zod schema to validate the request query params
//  * @returns - Middleware function to validate the request query params
//  */
// export const validateQueryParams = (schema: ZodObject<any>) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync(req.query);
//       logger.info("Query params are valid");
//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         logger.error("Query params validation failed", error.errors);
//         return res.status(400).json({
//           message: "Invalid query params",
//           success: false,
//           errors: error.errors, // Return specific validation errors
//         });
//       }

//       logger.error("Unexpected error during query params validation", error);
//       res.status(500).json({
//         message: "Internal server error",
//         success: false,
//       });
//     }
//   };
// };
