import { object, string, TypeOf } from 'zod';

export const courseSchema = {
  body: object({
    year: string({
      required_error: 'year is required',
    }),
    semester: string({
      required_error: 'semester is required',
    }),
  }),
};

export type LoginBody = TypeOf<typeof courseSchema.body>;
