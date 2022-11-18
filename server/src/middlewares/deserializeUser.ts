import { NextFunction, Request, Response } from "express";
import _ from 'lodash'
import { signJwt, verifyJwt } from "../utils/jwt.utils";
const reIssueAccessToken = async (refreshToken: string) => {
    const { decoded, expired } = verifyJwt(refreshToken);
    if (decoded && !expired) {
        const {email} = decoded as {email : string};
        const accessTokenTtl = process.env.ACCESS_TOKEN_TTL || '15m';
        const accessToken = signJwt(
            { email },
            { expiresIn: accessTokenTtl }
        )
        console.log("New Access Token Issued");
        return accessToken;
    }
    return null;
}
const deserializeUser = async (req: Request, res: Response, next : NextFunction) => {
    const accessToken =  _.get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );
    const refreshToken = _.get(req, "headers.x-refresh", "") as string;
    if(!accessToken) {
        return next();
    }
    const {decoded , expired} = verifyJwt(accessToken);
    if(decoded) {
        res.locals.user = decoded;
        return next();
    }
    if(expired && refreshToken) {
        const newAccessToken = await reIssueAccessToken(refreshToken);
        if (newAccessToken) {
            const { decoded } = verifyJwt(newAccessToken as string);
            res.setHeader("x-access-token", newAccessToken);
            res.locals.user = decoded;
            return next();
        }
    }
    return next();
}
export default deserializeUser