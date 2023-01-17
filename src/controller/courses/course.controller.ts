import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import { findCourses, findCourseById } from '../../database/repository/course.repo';

const getCourses = expressAsyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const courses = await findCourses(data);
  if (!courses) throw new NotFoundError('courses not found');
  new SuccessResponse('student created successfully', { courses: courses }).send(res);
});

const findCourse = expressAsyncHandler(async (req: Request, res: Response) => {
  const data = req.params?.id;
  const course = await findCourseById(data);
  if (!course) throw new NotFoundError('courses not found');
  new SuccessResponse('student created successfully', { course: course }).send(res);
});

export { getCourses, findCourse };
