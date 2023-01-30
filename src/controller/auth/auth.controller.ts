import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { createUser, findUserByEmail, findUserById, updateUserParams } from '../../database/repository/user.repo';
import { AuthFailureError, NotFoundError } from '../../core/ApiError';
import { generatepassword } from '../../utils/randoms';
import { SuccessResponse } from '../../core/ApiResponse';
import { signJwt } from '../../utils/jwt';
import { LoginBody, RegisterUserBody } from '../../schema_validation/auth.schema';
import { sendRegistrationMail } from '../../services/mailer/functions';
import argon2 from 'argon2';

const registerUser = asyncHandler(async (req: Request<RegisterUserBody>, res: Response) => {
  const { firstname, lastname, email, academic_session, password, userType } = req.body;
  const user = await findUserByEmail(email);
  if (user) throw new AuthFailureError('User with email already exists');
  const passwords = password ? password : await generatepassword();
  const newUser = await createUser({
    firstname,
    lastname,
    email,
    userType,
    password: passwords,
    academic_session: academic_session,
  });
  const token = await signJwt({ id: newUser?._id });
  const details = { to: email, password: passwords, fullname: `${firstname} + ${lastname}` };
  const result = await sendRegistrationMail(details);
  if (!result) throw new AuthFailureError('email not send, validation error');
  new SuccessResponse('user created successfully', { user: newUser, token: token }).send(res);
});

const loginUser = asyncHandler(async (req: Request<LoginBody>, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  console.log(password, 'password');
  const user = await findUserByEmail(email);
  console.log(user);
  if (!user) throw new AuthFailureError('user not found');
  if (!(await user.comparePassword(password))) throw new AuthFailureError('password mismatch');
  const token = await signJwt({ id: user?._id });
  console.log(token, 'token');
  new SuccessResponse('user logged in successfully', { user: user, token: token }).send(res);
});

const userProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const user = await findUserById(id);
  if (!user) throw new AuthFailureError('user not found');
  new SuccessResponse('user logged in successfully', { user }).send(res);
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const { password } = req.body;
  const user = await updateUserParams({ _id: id }, { password: await argon2.hash(password) });
  if (!user) throw new NotFoundError('Error updating user');
  new SuccessResponse('User password updated successfully', { user }).send(res);
});

export { registerUser, loginUser, userProfile, changePassword };
