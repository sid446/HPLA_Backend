import { AnnualReport } from "../model/annualreport.model.js";
import { AsyncHandler } from "../utils/sexy boi.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAnnualReport = AsyncHandler(async (req, res) => {
  const { title, link } = req.body;
  console.log(req.body);
  if (!title || !link) {
    throw new ApiError(400, "All fields are required");
  }
  const existedReport = await AnnualReport.findOne({ title });
  if (existedReport) {
    throw new ApiError(409, "Annual report with this title already exists");
  }
  const annualReport = await AnnualReport.create({
    title,
    link,
  });
  if (!annualReport) {
    throw new ApiError(
      500,
      "Something went wrong while saving the annual report"
    );
  }
  return res
    .status(201)
    .json(
      new ApiResponse(200, annualReport, "Annual report saved successfully")
    );
});
const getAnnualReport = AsyncHandler(async (req, res) => {
  const annualReports = await AnnualReport.find();
  if (!annualReports) {
    throw new ApiError(404, "No annual reports exist");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, annualReports, "Successfully fetched annual reports")
    );
});
const deleteAnnualReport = AsyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new ApiError(400, "Annual report ID is required");
  }
  const report = await AnnualReport.findByIdAndDelete(id);
  if (!report) {
    throw new ApiError(404, "Annual report not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, null, "Annual report deleted successfully"));
});
const editAnnualReport = AsyncHandler(async (req, res) => {
  const { id, title, link } = req.body;
  if (!id || !title || !link) {
    throw new ApiError(400, "All fields are required");
  }
  const report = await AnnualReport.findById(id);
  if (!report) {
    throw new ApiError(404, "Annual report not found");
  }
  const updatedReport = await AnnualReport.findByIdAndUpdate(
    id,
    { title, link },
    { new: true }
  );
  if (!updatedReport) {
    throw new ApiError(500, "Failed to update annual report");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedReport, "Annual report updated successfully")
    );
});

export {
  createAnnualReport,
  getAnnualReport,
  deleteAnnualReport,
  editAnnualReport,
};
