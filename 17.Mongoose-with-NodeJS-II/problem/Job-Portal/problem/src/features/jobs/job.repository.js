// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import { jobSchema } from "./schema/newJob.schema.js";
import { applyJobSchema } from "./schema/applyJob.schema.js";

const jobModel = new mongoose.model("Job", jobSchema);
const applicantModel = new mongoose.model("Apply", applyJobSchema)

export const createNewJob = async (job) => {
  // Write your code here
  try {
    let jobDescription = new jobModel(job);
    let savedJob = await jobDescription.save();

    return savedJob;
  } catch (error) {
    console.log(error, "error in createNewJobRepo..");
  }
};

export const applyJobRepo = async (jobId, userId) => {
  // Write your code here
  try {
    let job = await jobModel.findById(jobId);
    console.log(job, "jobbb..");

    if(job) {
      job.applicants.push(userId);
      await job.save()
    }

    let applicant = {
      jobId, userId
    }

    let apply = new applicantModel(applicant);
    await apply.save();

    return job;
  } catch (error) {
    console.log(error, "error in applyJobRepoRepo..");
  }
};
export const findJobRepo = async (_id) => {
  // Write your code here
  try {
    let job = await jobModel.findById(_id);
    return job;
  } catch (error) {
    console.log(error, "error in findJobRepoRepo..");
  }
};
