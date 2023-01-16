import { Request, Response } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from 'express-async-handler';
import { createResult, findResult } from '../../database/repository/result.repo,';
import { NotFoundError } from '../../core/ApiError';
import { ResultBody } from '../../schema_validation/result.schema';

const addResult = asyncHandler(async (req: Request<ResultBody>, res: Response) => {
  const data = req.body;
  const new_result = await createResult(data);
  if (!new_result) {
    throw new NotFoundError('result not created');
  }
  new SuccessResponse('result created successfully', { user: new_result }).send(res);
});

const findResults = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const results = await findResult(data);
  new SuccessResponse('result parsed successfully', { result: results }).send(res);
});

export { addResult, findResults };
