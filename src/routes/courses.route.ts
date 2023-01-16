import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { getCourses } from '../controller/courses/course.controller';
import isAuth from '../middleware/isAuth';
import { courseSchema } from '../schema_validation/course.schema';

const router = Router();

router.post('/select_course', [processRequestBody(courseSchema.body), isAuth], getCourses);

export default router;
