const express = require("express");
const {
  postCreateReport,
  putUpdateReportStatus,
  putUpdateDevResponsible,
  putUpdateStakeholderResponsible,
  getFindAcceptedReport,
  getFindReportByProjectId,
  getReportsByStatusProgressSolved,
} = require("../controller/report.controller");
const reportRouter = express.Router();

reportRouter.get("/acceptedReport", getFindAcceptedReport);
reportRouter.get("/reportByProjectId/:projectId", getFindReportByProjectId);
reportRouter.get("/reportsByStatusProgressSolved", getReportsByStatusProgressSolved);
reportRouter.post("/create", postCreateReport);
reportRouter.put("/updateStatus/:reportId", putUpdateReportStatus);
reportRouter.put("/updateDevResponsible/:reportId", putUpdateDevResponsible);
reportRouter.put("/updateStakeholderResponsible/:reportId", putUpdateStakeholderResponsible);

module.exports = reportRouter;
