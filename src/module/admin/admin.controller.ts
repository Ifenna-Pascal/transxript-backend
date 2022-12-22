import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { createUser, findUserByEmail } from '../../database/repository/user.repo';
import { AuthFailureError } from '../../core/ApiError';
import generatepassword from '../../utils/generatepassword';
import { SuccessResponse } from '../../core/ApiResponse';
import { signJwt } from '../../utils/jwt';
import { RegisterUserBody } from './admin.schema';

const registerUser = asyncHandler(async (req: Request<RegisterUserBody>, res: Response) => {
  const { firstname, lastname, email, session } = req.body;
  const user = await findUserByEmail(email);
  if (user) throw new AuthFailureError('User with email already exists');
  const password = (await generatepassword()) as string;
  const newUser = await createUser({
    firstname,
    lastname,
    email,
    password,
    academic_session: session,
  });
  const token = await signJwt({ id: newUser?._id });
  new SuccessResponse('user created successfully', { user: newUser, token: token }).send(res);
});

export { registerUser };
