import { Request, Response } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from 'express-async-handler';
import { createResult, findResult } from '../../database/repository/result.repo,';
import { NotFoundError } from '../../core/ApiError';
import { ResultBody } from '../../schema_validation/result.schema';

const addResult = asyncHandler(async (req: Request<any>, res: Response) => {
  const data = req.body;
  const docs = await Promise.all(data.map((x: any) => createResult(x)));
  if (!docs) throw new NotFoundError('result not created');
  new SuccessResponse('result created successfully', { result: docs }).send(res);
});

const findResults = asyncHandler(async (req: Request, res: Response) => {
  const data = req.params?.id;
  const results = await findResult({ studentId: data });
  new SuccessResponse('result parsed successfully', { result: results }).send(res);
});

export { addResult, findResults };
