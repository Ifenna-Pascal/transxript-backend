import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import { findCourses } from '../../database/repository/course.repo';

const getCourses = expressAsyncHandler(async (req: Request, res: Response) => {
  console.log('showw');
  const data = req.body;
  console.log(data, 'dataa');
  const courses = await findCourses(data);
  if (!courses) throw new NotFoundError('courses not found');
  new SuccessResponse('student created successfully', { courses: courses }).send(res);
});

export { getCourses };
