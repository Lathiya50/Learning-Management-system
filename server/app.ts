import { ErrorMiddleware } from './middleware/error';
require("dotenv").config();
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import courseRouter from './routes/course.route';

export const app = express(); 
import userRouter from './routes/user.route';
 


//body parser
app.use(express.json({ limit: "50mb" }))

//cookies parser
app.use(cookieParser());

//cors => cross orign resouces sharing
app.use(cors({ origin: process.env.ORIGIN }))

//routes
app.use("/api/v1",courseRouter);
app.use("/api/v1", userRouter);


//testing API
app.get("/test", (req:Request,res:Response,next:NextFunction) => {
    res.status(200).json({
        success: true,
        messsage:"API is working",
    })
})
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
}) 

app.use(ErrorMiddleware);