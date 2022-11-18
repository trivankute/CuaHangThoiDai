import { NextFunction, Request, Response } from "express";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.user) {
        return res.status(401).send("Unauthorized");
    }
    return next();
}
export const requireEmployee = (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.user) {
        return res.status(401).send("Unauthorized");
    }
    if(res.locals.user.userType === 'employee' || res.locals.user.userType === 'admin') {
        return next();
    }
    return res.status(401).send("Unauthorized");
}
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.user) {
        return res.status(401).send("Unauthorized");
    }
    if(res.locals.user.userType === 'admin') {
        return next();
    }
    return res.status(401).send("Unauthorized");
}
