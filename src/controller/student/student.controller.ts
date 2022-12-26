import { createStudent } from '../../database/repository/student.repo';
import { Request, Response } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from 'express-async-handler';
import { NotFoundError } from '../../core/ApiError';
import { generateRegNumber } from '../../utils/randoms';
import { studentBody } from '../../schema_validation/student.schema';
import { findUserById } from '../../database/repository/user.repo';
import { findBySession } from '../../database/repository/student.repo';

const addStudent = asyncHandler(async (req: Request<studentBody>, res: Response) => {
  const { firstname, lastname, session } = req.body;
  const newStudent = await createStudent({
    firstname,
    lastname,
    regNumber: await generateRegNumber(session),
    academic_session: session,
  });
  new SuccessResponse('student created successfully', { user: newStudent }).send(res);
});

const getStudentBySession = asyncHandler(async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const user = await findUserById(id);
  console.log(user?.academic_session);
  const students = await findBySession(user?.academic_session as string);
  if (!students) throw new NotFoundError('students not found');
  new SuccessResponse('student created successfully', { students: students }).send(res);
});

export { addStudent, getStudentBySession };
