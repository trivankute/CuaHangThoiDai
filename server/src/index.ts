import express, { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import ExpressError from '../utils/expressError';
if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', async (req : Request, res : Response) => {
    res.send("Hello World");
})
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new ExpressError('Not Found', StatusCodes.NOT_FOUND))
})
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message)
})
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
})