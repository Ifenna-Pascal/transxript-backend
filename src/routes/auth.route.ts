import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import isAuth from '../middleware/isAuth';
import { loginUser, registerUser, userProfile, changePassword } from '../controller/auth/auth.controller';
import { loginSchema, registerUserSchema } from '../schema_validation/auth.schema';
import isAdmin from '../middleware/isAdmin';
const router = Router();

router.post('/register_adviser', [processRequestBody(registerUserSchema.body), isAuth, isAdmin], registerUser);
router.post('/login', [processRequestBody(loginSchema.body)], loginUser);
router.get('/profile', isAuth, userProfile);
router.put('/changePassword', isAuth, changePassword);

export default router;
