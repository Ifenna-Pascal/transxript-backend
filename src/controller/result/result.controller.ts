import { Request, Response } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from 'express-async-handler';
import { createResult, findResult } from '../../database/repository/result.repo,';
import { NotFoundError } from '../../core/ApiError';
import { ResultBody } from '../../schema_validation/result.schema';

const addResult = asyncHandler(async (req: Request<any>, res: Response) => {
  const data = req.body;

  const docs = await Promise.all(data.map((x: any) => createResult(x)));
  console.log(docs);

  if (!docs) throw new NotFoundError('result not created');
  new SuccessResponse('result created successfully', { result: docs }).send(res);
});

const findResults = asyncHandler(async (req: Request, res: Response) => {
  const data = req.params?.regNo;
  const results = await findResult({ regNo: data });
  new SuccessResponse('result parsed successfully', { result: results }).send(res);
});

const allResults = asyncHandler(async (req: Request, res: Response) => {
  const results = await findResult(req.body);
  if (!results) throw new NotFoundError('results not found');
  new SuccessResponse('results found', { results: results }).send(res);
});

export { addResult, findResults, allResults };
