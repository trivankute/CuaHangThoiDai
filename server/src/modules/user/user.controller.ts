import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { signJwt } from "../../utils/jwt.utils";
import { LoginUserInput, RegisterUserInput } from "./user.schema";
import { loginUserService, registerUserService } from "./user.service";

export const registerCustomerController = async (req: Request<{},{},RegisterUserInput>, res: Response) => {   
    if(req.body.userType !== 'customer') {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid User Type");
    }
    const user = await registerUserService(req.body);
    res.send(user);
}

export const loginUserController = async (req: Request<{},{},LoginUserInput>, res: Response) => {
    const {email , password : candidatePassword} = req.body;
    const user = await loginUserService(email, candidatePassword);
    const {password, ...rest} = user;
    const accessTokenTtl = process.env.ACCESS_TOKEN_TTL || '15m';
    const accessToken = signJwt(
        {...rest},
        {expiresIn : accessTokenTtl}
    )
    const refreshTokenTtl = process.env.REFRESH_TOKEN_TTL || '7d';
    const refreshToken = signJwt(
        {...rest},
        {expiresIn : refreshTokenTtl}
    )
    res.status(StatusCodes.OK).send({accessToken, refreshToken});
}

export const getCurrentUserController = async (req: Request, res: Response) => {
    const {user} = res.locals;
    return res.status(StatusCodes.OK).send(user);
}

export const logoutController = async (req: Request, res: Response) => {
    res.locals.user = null;
    res.send({
        accessToken : null,
        refreshToken : null
    })
}

export const registerEmployeeController = async (req: Request<{},{},RegisterUserInput>, res: Response) => {
    if(req.body.userType !== 'employee') {
        return res.status(StatusCodes.BAD_REQUEST).send("Invalid User Type");
    }
    const user = await registerUserService(req.body);
    res.send(user);
}