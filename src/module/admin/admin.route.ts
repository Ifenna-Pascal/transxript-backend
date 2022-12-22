import { Router, Request, Response } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import isadmin from '../../middleware/isAdmin';
import isAuth from '../../middleware/isAuth';
import { registerUser } from './admin.controller';
import { registerUserSchema } from './admin.schema';
const router = Router();

router.post('/register_adviser', [processRequestBody(registerUserSchema.body), isAuth, isadmin], registerUser);

export default router;
