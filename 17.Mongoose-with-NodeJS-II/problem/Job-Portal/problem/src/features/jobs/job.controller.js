// Please don't change the pre-written code
// Import the necessary modules here
import mongoose from "mongoose";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { applyJobRepo, createNewJob, findJobRepo } from "./job.repository.js";

import { userSchema } from "../user/user.schema.js"
const userModel = new mongoose.model("User", userSchema);

async function validRecruiterFn(id) {
    let isRecruiter = await userModel.findById(id);
    return isRecruiter.type == "recruiter" ? true : false;
}

export const postJob = async (req, res, next) => {
  // Enhance the functionality of this controller to ensure that only users of the 'recruiter' type can post a new job.
  const user_id = req.user._id;
  console.log(user_id, "idd...");
  const validRecruiter = await validRecruiterFn(user_id); 
  console.log(validRecruiter, "recruiterr...");

  if(validRecruiter) {
    try {
      const resp = await createNewJob(req.body);
      console.log(resp, "resppp...");
      if (resp) {
        res.status(201).json({
          success: true,
          msg: "job posted successfully with ",
          job_description: resp,
        });
      } else {
        res.status(400).json({ success: false, msg: "bad request" });
      }
    } catch (error) {
      next(new customErrorHandler(400, error));
    }
  } else {
    res.status(400).json({ success: false, msg: "Recruiter only can post job."})
  }
};
export const applyJob = async (req, res, next) => {
  const job_id = req.params.id;
  const user_id = req.user._id;
  try {
    const job_description = await findJobRepo(job_id);
    if (!job_description) {
      return next(new customErrorHandler(400, "job not found"));
    }
    const resp = await applyJobRepo(job_id, user_id);
    if (resp) {
      res
        .status(201)
        .json({ success: true, msg: "job applied successfully", resp });
    } else {
      res
        .status(400)
        .json({ success: false, msg: "you have already applied for this job" });
    }
  } catch (error) {
    next(new customErrorHandler(400, error));
  }
};
