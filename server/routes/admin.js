import express from 'express';
import { isAuth, isAdmin } from "../middlewares/isAuth.js";
import { addLectures, createCourse } from "../controllers/admin.js";
import { uploadFiles } from "../middlewares/multer.js";

const router =express.Router();

router.post('/course/new', isAuth, isAdmin, uploadFiles, createCourse);

router.post('/course/:id', isAuth, isAdmin, uploadFiles, addLectures);

export default router;