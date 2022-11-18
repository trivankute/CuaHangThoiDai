import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import {requireAdmin, requireUser} from '../../middlewares/requireUser';
import catchAsync from '../../utils/catchAsync';
import { getCurrentUserController, loginUserController, logoutController, registerCustomerController, registerEmployeeController } from './user.controller';
import { loginUserSchema, registerUserSchema } from './user.schema';

const userRouter = express.Router();

userRouter.post('/registerCustomer',processRequestBody(registerUserSchema),catchAsync(registerCustomerController));
userRouter.post('/registerEmployee',requireAdmin,processRequestBody(registerUserSchema),catchAsync(registerEmployeeController));
userRouter.post('/login',processRequestBody(loginUserSchema),catchAsync(loginUserController));
userRouter.get('/me',requireUser,catchAsync(getCurrentUserController));
userRouter.get('/logout',requireUser,catchAsync(logoutController));
export default userRouter;