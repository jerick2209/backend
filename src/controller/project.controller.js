const { allProjects, updateProjectUsers, createProject } = require("../model/project.model");
const { findUser } = require("../model/user.model");
const { getRolefromToken } = require("../utils/getUserRole");

async function getAllProejcts(req, res, next) {
  const authorized =
    getRolefromToken(req.headers.authorization) === "administrator";
  if (authorized) {
    const projects = await allProjects();
    if (projects) {
      return res.status(200).json(projects);
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Unathorized, need administrator",
    });
  }
}

async function postCreateProject(req, res, next) {
  const authorized =
    getRolefromToken(req.headers.authorization) === "tester" ||
    getRolefromToken(req.headers.authorization) === "administrator";
  if (authorized) {
    const project = req.body;
    const newProject = await createProject(project);
    if (newProject) {
      return res.status(200).json(newProject);
    } else {
      return res.status(500).json({
        success: false,
        message: "Project creation failed",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Unathorized, need tester or administrator",
    });
  }
}

async function putUpdateProjectUsers(req, res, next) {
  const projectId = req.params.projectId;
  const newUserId = req.body.userId;
  const authorized =
    getRolefromToken(req.headers.authorization) === "administrator";
  if (authorized) {
    try {
        const user = await findUser({ _id: newUserId });
      const updatedProject = await updateProjectUsers(projectId, user);
      res.status(200).json(updatedProject);
    } catch (error) {
      // Handle error
      console.error("Error updating project users:", error);
      res.status(500).json({ error: "Failed to update project users" });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "Unathorized, need administrator",
    });
  }
}

module.exports = {
  getAllProejcts,
  postCreateProject,
  putUpdateProjectUsers,
};
