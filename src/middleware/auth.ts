import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import config from "../config";

const auth = () =>
{
    return(req:Request, res:Response,next: NextFunction) =>
    {
        const token = req.headers.authorization;

        if(!token)
        {
            return res.status(500).json({message: "you are not Auythorized"});
        }

        const decoded = jwt.verify(token,config.jwtsecret as string);
        console.log({decoded});
       // console.log({authtoken:token});
       return next();
    };
};

export default auth;


 