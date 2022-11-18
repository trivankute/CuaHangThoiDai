import pool from "../../config/db";
import * as argon2 from 'argon2';
import { RegisterUserInput } from "./user.schema";

export const registerUserService = async (customer : RegisterUserInput) => {
    const { email, password, username, userType } = customer;
    const hashedPassword = await argon2.hash(password);
    return {email, password : hashedPassword, username, userType};
}

export const loginUserService = async (email : string, candidatePassword : string) => {
    return {email, password : candidatePassword};
}

export const getAllUsersService = async () => {
    const result = await pool.query(`SELECT * FROM "User";`);
    console.log(result.rows);
    return result.rows;
}