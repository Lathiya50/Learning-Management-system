import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getCoursesAnalytics, getOrdersAnalytics, getUserAnalytics } from '../controllers/analytics.controller';

const analyticsRouter = express.Router();

analyticsRouter.get("/get-user-analytics",isAuthenticated, authorizeRoles("admin"),getUserAnalytics);
analyticsRouter.get("/get-course-analytics",isAuthenticated, authorizeRoles("admin"),getCoursesAnalytics);
analyticsRouter.get("/get-order-analytics",isAuthenticated, authorizeRoles("admin"),getOrdersAnalytics);

export default analyticsRouter;