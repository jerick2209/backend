const express = require("express");
const api = express.Router();
const { userRouter } = require("./user.router");
const projectRouter = require("./project.router");
const reportRouter = require("./report.router");
api
  .use("/user", userRouter)
  .use("/project", projectRouter)
  .use("/report", reportRouter);

  module.exports = api;
