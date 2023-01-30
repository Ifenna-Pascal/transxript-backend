import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { getCourses, findCourse, addCourse } from '../controller/courses/course.controller';
import isAdmin from '../middleware/isAdmin';
import isAuth from '../middleware/isAuth';
import { courseSchema } from '../schema_validation/course.schema';

const router = Router();

router.post('/select_course', [processRequestBody(courseSchema.body), isAuth], getCourses);
router.post('/create_course', [processRequestBody(courseSchema.newCourse), isAuth, isAdmin], addCourse);
router.get('/:id', isAuth, findCourse);

export default router;
