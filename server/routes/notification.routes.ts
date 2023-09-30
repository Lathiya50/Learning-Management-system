import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { getNotifications, updateNotification } from '../controllers/notification.controller';

const notificationRoute = express.Router();

notificationRoute.get("/get-all-notifications",isAuthenticated,authorizeRoles("admin"),getNotifications);
notificationRoute.put("/update-notification/:id",isAuthenticated,authorizeRoles("admin"),updateNotification);

export default notificationRoute;  