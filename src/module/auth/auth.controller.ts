import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../../database/repository/user.repo';
import { AuthFailureError } from '../../core/ApiError';
import generatepassword from '../../utils/generatepassword';
import { SuccessResponse } from '../../core/ApiResponse';
import { signJwt } from '../../utils/jwt';
import { LoginBody, RegisterUserBody } from './auth.schema';

const registerUser = asyncHandler(async (req: Request<RegisterUserBody>, res: Response) => {
  const { firstname, lastname, email, session, password, userType } = req.body;
  const user = await findUserByEmail(email);
  if (user) throw new AuthFailureError('User with email already exists');
  const passwords = password ? password : ((await generatepassword()) as string);
  const newUser = await createUser({
    firstname,
    lastname,
    email,
    userType,
    password: passwords,
    academic_session: session,
  });
  const token = await signJwt({ id: newUser?._id });
  new SuccessResponse('user created successfully', { user: newUser, token: token }).send(res);
});

const loginUser = asyncHandler(async (req: Request<LoginBody>, res: Response) => {
  const { email, password } = req.body;
  console.log(password, 'password');
  const user = await findUserByEmail(email);
  if (!user) throw new AuthFailureError('user not found');
  if (!(await user.comparePassword(password))) throw new AuthFailureError('password mismatch');
  console.log(await user.comparePassword(password));
  const token = await signJwt({ id: user?._id });
  new SuccessResponse('user created successfully', { user: user, token: token }).send(res);
});

export { registerUser, loginUser };
