import { Router, Request, Response } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import isadmin from '../../middleware/isAdmin';
import isAuth from '../../middleware/isAuth';
import { loginUser, registerUser } from '../../controller/auth/auth.controller';
import { loginSchema, registerUserSchema } from './auth.schema';
const router = Router();

router.post('/register_adviser', [processRequestBody(registerUserSchema.body)], registerUser);
router.post('/login', [processRequestBody(loginSchema.body)], loginUser);

export default router;
