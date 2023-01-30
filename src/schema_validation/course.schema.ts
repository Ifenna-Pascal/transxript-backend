import { array, object, string, TypeOf } from 'zod';

export const courseSchema = {
  body: object({
    year: string({
      required_error: 'year is required',
    }),
    semester: string({
      required_error: 'semester is required',
    }),
  }),
  newCourse: array(
    object({
      year: string({
        required_error: 'year is required',
      }),
      semester: string({
        required_error: 'semester is required',
      }),
      courseTitle: string({
        required_error: 'course title is required',
      }),
      courseCode: string({
        required_error: 'course code is required',
      }),
      creditLoad: string({
        required_error: 'credit load is required',
      }),
    }),
  ),
};

export type LoginBody = TypeOf<typeof courseSchema.body>;
export type newCourse = TypeOf<typeof courseSchema.newCourse>;
