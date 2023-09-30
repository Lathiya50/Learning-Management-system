import NotificationModel from "../models/notification.model";
import { NextFunction, Request, Response } from "express";
import CatchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../util/ErrorHandler";

//get all notifications -- only for admin
export const getNotifications = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await NotificationModel.find().sort({createdAt: -1});

        res.status(201).json({
            success: true,
            notifications,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message,500));
    }
});

//update notification status -- only for admin
export const updateNotification = CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationModel.findById(req.params.id);
        notification?.status ? "read" : notification?.status;

        await notification?.save();

        const notifications = await NotificationModel.find().sort({createdAt: -1});

        res.status(201).json({
            success: true,
            notifications
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message,500));
    }
});

//