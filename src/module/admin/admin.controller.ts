import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { IUser } from './interface';
import { createUser, findUserByEmail } from '../../database/repository/user.repo';
import { AuthFailureError } from '../../core/ApiError';
import generatepassword from '../../utils/generatepassword';
import { SuccessResponse } from '../../core/ApiResponse';
import { signJwt } from '../../utils/jwt';

const registerUser = asyncHandler(async (req: Request<IUser>, res: Response) => {
  const { firstname, lastname, email, userType } = req.body;
  const user = await findUserByEmail(email);
  if (user) throw new AuthFailureError('User with email already exists');
  const password = await generatepassword();
  const newUser = await createUser({
    firstname,
    lastname,
    email,
    userType,
    password,
  });
  const token = await signJwt(newUser?._id);
  new SuccessResponse('user created successfully', { user: newUser, token: token }).send(res);
});

export { registerUser };
