import { Request, Response, NextFunction } from "express";
import userModel,{IUser} from "../models/user.model";
import ErrorHandler from "../util/ErrorHandler";
import CatchAsyncError from "../middleware/catchAsyncError";
import  jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
require("dotenv").config();
import sendMail from "../util/sendMail";

//Register User  
interface IRegistrationBody{
    name: string;
    email: string;
    password: string;
    avtar?:string
}
interface IActivationToken{
    token: string,
    activationCode: string
}

export const registrationUser = CatchAsyncError(async (req:Request,res:Response,next:NextFunction) => {    
    try {
        const { name, email, password } = req.body;
        const isEmailExitsr = await userModel.findOne({email});
        if (isEmailExitsr) {
            return next(new ErrorHandler("Email already exists", 400));
        }
        const user: IRegistrationBody = {
            name,
            email,
            password
        }
        const activationToken = createActivationToken(user);
        const activationCode=activationToken.activationCode;        
        const data = { user: { name: user.name }, activationCode };
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);
        try {
            await sendMail({
                email: user.email,
                subject: "Activate your mail",
                template: "activation-mail.ejs",
                data
            });
            console.log("Registration routes call");
            res.status(201).json({
                success: true,
                message: `Please check your email:${user.email} to activate your account`,
                activationToken:activationToken.token
            })
        } catch (error: any) {
            console.log("email  send error:- ",error.message)
            return next(new ErrorHandler(error.message, 400));
        }
    } catch (error:any) {
        console.log("Registration main:-",error.message)
        return next(new ErrorHandler(error.message, 400));
    }
})

export const createActivationToken=(user:any):IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_SECRET as Secret , {
        expiresIn:"50m",
    });
    return { token, activationCode };
}

//activate user
interface IActivationRequest{
    activation_token: string;
    activation_code: string;
}

export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { activation_token, activation_code } = req.body as IActivationRequest
        
        const newUser: { user: IUser; activationCode: string } = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string
        ) as { user: IUser; activationCode: string };
        
        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler("Invalid activation code",400))
        }
        const { name, email, password } = newUser.user;
        console.log("newUser.user", newUser.user);
        const exitUser = await userModel.findOne({ email });
        if (exitUser) {
            return next(new ErrorHandler("Email already exist",400))
        }
        const user = await userModel.create({ name, email, password });
console.log("user",user)
        res.status(201).json({
            success: true,
        })

      } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
    }
})