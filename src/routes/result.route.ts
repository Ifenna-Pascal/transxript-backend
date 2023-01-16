import { Router } from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { addResult, findResults } from '../controller/result/result.controller';
import isAuth from '../middleware/isAuth';
import { getResult, ResultSchema } from '../schema_validation/result.schema';

const router = Router();

router.post('/create_result', [processRequestBody(ResultSchema.body), isAuth], addResult);
router.get('/get_result', [processRequestBody(getResult.body)], findResults);

export default router;
