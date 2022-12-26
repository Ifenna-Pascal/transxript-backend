import { createStudent } from '../../database/repository/student.repo';
import { Request, Response } from 'express';
import { AuthFailureResponse } from '../../core/ApiResponse';
import { SuccessResponse } from '../../core/ApiResponse';
import asyncHandler from 'express-async-handler';

const addStudent = asyncHandler(async (req: Request, res: Response) => {});
