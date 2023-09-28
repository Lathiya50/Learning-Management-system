import { Response } from "express";
import userModel from "../models/user.model";
import { redis } from "../util/redis";

//get user info
export const getUserById = async (id: string, res: Response) => {
    const userJson = await redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(201).json({
            succss: true,
            user,
        })
    }
};