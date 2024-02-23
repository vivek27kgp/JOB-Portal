import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import {
  createJobController,
  deleteJobController,
  getAllJobsController,
  jobStatsController,
  updateJobController,
} from '../controller/jobsController.js';

// route object
const router = express.Router();

// Routes
// CREATE JOBS || POST
router.post('/create-job', userAuth, createJobController);

// GET JOBS || GET
router.get('/get-jobs', userAuth, getAllJobsController);

// UPDATE JOBS || PUT || PATCH
router.patch('/update-job/:id', userAuth, updateJobController);

// DELETE JOBS || DELETE
router.delete('/delete-job/:id', userAuth, deleteJobController);

// JOBS STATS || GET
router.get('/job-stats', userAuth, jobStatsController);

// export route
export default router;
