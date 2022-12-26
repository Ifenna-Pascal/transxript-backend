import { Router, Request, Response } from 'express';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { authRoute, studentRoute } from './routes.imports';
const router = Router();

router.get('/ping_pong', (req: Request, res: Response) => {
  logger.info('WELCOME TO TRANSXRIPT SERVER APPLICATION');
  res.status(StatusCodes.OK).json('WELCOME TO TRANSXRIPT SERVER APPLICATION');
});

// all routes
router.use('/auth', authRoute.default);
router.use('/student', studentRoute.default);

export default router;
