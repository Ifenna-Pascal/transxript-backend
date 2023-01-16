import { object, string, TypeOf } from 'zod';

export const ResultSchema = {
  body: object({
    studentId: string({ required_error: 'studentid is required' }),
    level: string({ required_error: 'level is required' }),
    semester: string({ required_error: 'semester is required' }),
    courseTitle: string({ required_error: 'coursetitle is required' }),
    courseCode: string({ required_error: 'coursecode is required' }),
    creditLoad: string({ required_error: 'credit load is required' }),
    grade: string({ required_error: 'grade is required' }),
  }),
};

export const getResult = {
  body: object({
    studentId: string({ required_error: 'student id is required' }),
    level: string({ required_error: 'level is required' }),
    semester: string({ required_error: 'semester is required' }),
  }),
};

export type ResultBody = TypeOf<typeof ResultSchema.body>;
export type GetResultBody = TypeOf<typeof ResultSchema.body>;
