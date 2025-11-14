import express from "express";
import orderRouter from "../v1/ping.router";

const v1Router = express.Router();

v1Router.use("/", orderRouter);
v1Router.use("/", orderRouter);

export default v1Router;
