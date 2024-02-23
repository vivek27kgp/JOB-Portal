import express from 'express';
import { updateUserController } from '../controller/userController.js';
import userAuth from '../middlewares/authMiddleware.js';

// route object
const router = express.Router();

// routes
// GET USER || GET

// UPDATE USER || PUT
router.put('/update-user', userAuth, updateUserController);

export default router;
