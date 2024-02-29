const { Schema, model } = require("mongoose");
const { findUser } = require("./user.model");
// Define schema for Report entity
const reportSchema = new Schema({
  description: String,
  project_id: String,
  tester: {
    user_id: String,
    user_name: String,
  },
  severity: String,
  status: String,
  stakeholder_responsible: {
    user_id: String,
    user_name: String,
  },
  dev_responsible: {
    user_id: String,
    user_name: String,
  },
  media: {
    image: [String],
    video: [String],
  },
});
const Report = model("Report", reportSchema);

async function createReport(report) {
  try {
    const newReport = new Report(report);
    const savedReport = await newReport.save();
    return savedReport;
  } catch (error) {
    // Handle error
    console.error("Error creating report:", error);
    throw error; // Re-throw the error for handling at a higher level
  }
}
async function updateReportStatus(reportId, status) {
  try {
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { status: status },
      { new: true }
    );
    return updatedReport;
  } catch (error) {
    // Handle error
    console.error("Error updating report status:", error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

async function updateDevResponsible(reportId, devId) {
  try {
    const user = await findUser({ _id: devId });
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { dev_responsible: { user_id: devId, user_name: user.name } },
      { new: true }
    );
    return updatedReport;
  } catch (error) {
    // Handle error
    console.error("Error updating device responsible:", error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

async function updateStakeholderResponsible(reportId, stakeholderId) {
  try {
    const user = await findUser({ _id: stakeholderId });
    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { stakeholder_responsible: { user_id: stakeholderId, user_name: user.name } },
      { new: true }
    );
    return updatedReport;
  } catch (error) {
    // Handle error
    console.error("Error updating stakeholder responsible:", error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

async function findAcceptedReport() {
  try {
    const reports = await Report.find({ status: "Accepted" }).sort({
      priority: -1,
    }); // Sort by priority descending
    return reports;
    return reports;
  } catch (error) {
    // Handle error
    console.error("Error finding accepted reports:", error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

async function findReportsByProjectId(projectId) {
  try {
    const reports = await Report.find({ project_id: projectId });
    return reports;
  } catch (error) {
    // Handle error
    console.error("Error finding reports by project id:", error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

async function findReportsByStatusProgressSolved() {
  try {
    const reports = await Report.find({ status: { $in: ["Solved", "In Progress"] } });
    return reports;
  } catch (error) {
    // Handle error
    console.error("Error finding reports by status 'Solved' or 'In Progress':", error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

module.exports = {
  createReport,
  updateReportStatus,
  updateDevResponsible,
  updateStakeholderResponsible,
  findAcceptedReport,
  findReportsByProjectId,
  findReportsByStatusProgressSolved,
};
