import express from "express";
import { uploadCourse, editCourse, getSingleCourse, getAllCourses, getCourseByUser, addQuestion, addAnswer, addReview, addReplyToReview } from "../controllers/course.controller";
// import {authorizeRoles, isAutheticated} from "../middleware/auth"

const courseRouter = express.Router();

// courseRouter.post(
//     "/create-course",
//     isAuthenticated,
//     autherizeRoles("admin"),
//     uploadCourse
// )

// courseRouter.put(
//     "/edit-coruse/:id",
//     isAuthenticated,
//     autherizeRoles("admin"),
//     editCourse
// )

// courseRouter.get(
//     "/get-course/:id",
//     getSingleCourse
// )

// courseRouter.get(
//     "/get-courses",
//     getAllCourses
// )

// courseRouter.get(
//     "/get-couse-content/:id",
//     isAuthenticated,
//     getCourseByUser
// )

// courseRouter.put(
//     "/add-question",
//     isAuthenticated,
//     addQuestion
// )

// courseRouter.put(
//     "/add-answer",
//     isAuthenticated,
//     addAnswer
// )

// courseRouter.put(
//     "/add-review/:id",
//     isAuthenticated,
//     addReview
// )

// courseRouter.put(
//     "/add-reply",
//     isAuthenticated,
//     autherizeRoles("admin"),
//     addReplyToReview
// )

export default courseRouter; 