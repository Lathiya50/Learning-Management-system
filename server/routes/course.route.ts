import express from "express";
import { uploadCourse, editCourse, getSingleCourse, getAllCourses, getCourseByUser, addQuestion, addAnswer, addReview, addReplyToReview, getAllCourse, deleteCourse } from "../controllers/course.controller";
import {authorizeRoles, isAuthenticated} from "../middleware/auth"

const courseRouter = express.Router();

courseRouter.post(
    "/create-course",
    isAuthenticated,
    authorizeRoles("admin"),
    uploadCourse
)

courseRouter.put(
    "/edit-coruse/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    editCourse
)

courseRouter.get(
    "/get-course/:id",
    getSingleCourse
)

courseRouter.get(
    "/get-courses",
    getAllCourses
)

courseRouter.get(
    "/get-couse-content/:id",
    isAuthenticated,
    getCourseByUser
)

courseRouter.put(
    "/add-question",
    isAuthenticated,
    addQuestion
)

courseRouter.put(
    "/add-answer",
    isAuthenticated,
    addAnswer
)

courseRouter.put(
    "/add-review/:id",
    isAuthenticated,
    addReview
)

courseRouter.put(
    "/add-reply",
    isAuthenticated,
    authorizeRoles("admin"),
    addReplyToReview
)

courseRouter.get(
    "/get-all-courses",
    isAuthenticated,
    authorizeRoles("admin"),
    getAllCourse 
);

courseRouter.delete(
    "/delete-courses",
    isAuthenticated,
    authorizeRoles("admin"),
    deleteCourse
);

export default courseRouter; 