import { array, number, object, string, TypeOf } from 'zod';

export const ResultSchema = {
  body: array(
    object({
      session: string({ required_error: 'session feild is required' }),
      total: string({ required_error: 'total is required' }),
      regNo: string({ required_error: 'registration number is required' }),
      level: string({ required_error: 'level is required' }),
      semester: string({ required_error: 'semester is required' }),
      courseTitle: string({ required_error: 'coursetitle is required' }),
      courseCode: string({ required_error: 'coursecode is required' }),
      creditLoad: number({ required_error: 'credit load is required' }),
      grade: string({ required_error: 'grade is required' }),
    }),
  ),
  getBody: object({
    session: string({ required_error: 'session feild is required' }),
    level: string({ required_error: 'level is required' }),
    semester: string({ required_error: 'semester is required' }),
    courseTitle: string({ required_error: 'coursetitle is required' }),
  }),
};

export const getResult = {
  body: object({
    regNo: string({ required_error: 'student regNumber is required' }),
  }),
};

export type ResultBody = TypeOf<typeof ResultSchema.body>;
export type GetResultBody = TypeOf<typeof getResult.body>;
export type QueryBody = TypeOf<typeof ResultSchema.getBody>;
