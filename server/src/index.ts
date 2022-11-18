import express, { NextFunction, Request, Response } from 'express';
import logger from './utils/logger';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import ExpressError from './utils/expressError';
import userRouter from './modules/user/user.route';
import deserializeUser from './middlewares/deserializeUser';
if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);
app.get('/', async (req : Request, res : Response) => {
    res.send("Hello World");
})
app.use('/api/users', userRouter);
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