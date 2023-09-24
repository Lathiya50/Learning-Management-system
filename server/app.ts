import express from 'express';
import cors from "cors";
import cookiParser from "cookie-parser";
export const app = express();

//body parser
app.use(express.json({limit:"50mb"}))
// this a app file