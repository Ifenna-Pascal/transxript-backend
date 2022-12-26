import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import isAuth from '../middleware/isAuth';
import isAdmin from '../middleware/isAdmin';
import { addStudent, getStudentBySession } from '../controller/student/student.controller';
import { addStudentSchema } from '../schema_validation/student.schema';

const router = Router();

router.post('/add_student', [processRequestBody(addStudentSchema.body), isAuth, isAdmin], addStudent);
router.get('/all_student', isAuth, getStudentBySession);

export default router;
