import { Request,Response, NextFunction } from "express";
import ErrorHandler from "../util/ErrorHandler";
import CatchAsyncError from "../middleware/catchAsyncError";
import { generateLast2MonthsData } from "../util/analytics.generator";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model.";

//get users analytics -- only for admin
export const getUserAnalytics = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await generateLast2MonthsData(userModel);

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

//get courses analytics -- only for admin
export const getCoursesAnalytics = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const course = await generateLast2MonthsData(CourseModel);

        res.status(200).json({
            success: true,
            course,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

//get order analytics -- only for admin
export const getOrdersAnalytics = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await generateLast2MonthsData(OrderModel);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
});