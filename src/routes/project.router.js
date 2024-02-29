const express = require("express");
const {
  getAllProejcts,
  postCreateProject,
  putUpdateProjectUsers,
} = require("../controller/project.controller");
const projectRouter = express.Router();

projectRouter.get("/all", getAllProejcts);
projectRouter.post("/create", postCreateProject);
projectRouter.put("/updateUsers/:projectId", putUpdateProjectUsers);

module.exports = projectRouter;
