import { createStudent, findStudentByReqNo } from '../../database/repository/student.repo';
import { Request, Response } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from 'express-async-handler';
import { NotFoundError } from '../../core/ApiError';
import { generateRegNumber } from '../../utils/randoms';
import { studentBody } from '../../schema_validation/student.schema';
import { findUserById } from '../../database/repository/user.repo';
import { findBySession } from '../../database/repository/student.repo';

const addStudent = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const docs = await Promise.all(
    data.map((x: any) => {
      const { firstname, lastname, academic_session, regNumber } = x;
      createStudent({
        firstname,
        lastname,
        regNumber,
        academic_session,
      });
    }),
  );
  new SuccessResponse('student created successfully', { students: docs }).send(res);
});

const getStudentBySession = asyncHandler(async (req: Request, res: Response) => {
  const { id } = res.locals.user;
  const user = await findUserById(id);
  const students = await findBySession(user?.academic_session as string);
  if (!students) throw new NotFoundError('students not found');
  new SuccessResponse('student created successfully', { students: students }).send(res);
});

const studentProfile = asyncHandler(async (req: Request, res: Response) => {
  const { regNumber } = req.body;
  const student = await findStudentByReqNo(regNumber);
  if (!student) throw new NotFoundError('students not found');
  new SuccessResponse('student created successfully', { students: student }).send(res);
});

export { addStudent, getStudentBySession, studentProfile };
