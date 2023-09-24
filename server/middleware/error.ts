import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../util/ErrorHandler';

export const ErrorMiddleware  = (err: any, req: Request, res: Response, next: NextFunction)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'internal  server error';
    // wrong mongodb id error
    if (err.name === 'CastError') {
        const message = `Response not found. Invalid:${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // dublicate key error message
    if (err.code == 11000) {
        const message = `Dublicate Error: ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }
       // wrong jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json Web Token  invalid. Please try again`;
        err = new ErrorHandler(message, 400);
    }

    //JWT expiration Error
    if (err.name == 'JWTExpiredError') { 
        const message = `Json Web Token  expired. Please try again`;
        err = new ErrorHandler(message, 400);
    }
    res.status(err.statusCode).json({
        success: true,
        message:err.message
    })
}