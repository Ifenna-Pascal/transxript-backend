import { array, object, string, TypeOf } from 'zod';

export const addStudentSchema = {
  body: array(
    object({
      firstname: string({
        required_error: 'firstname is required',
      }),
      lastname: string({
        required_error: 'lastname is required',
      }),
      academic_session: string({
        required_error: 'academic session is required',
      }),
      regNumber: string({
        required_error: 'registration number is required',
      }),
    }),
  ),
};

export const profileSchema = {
  body: object({
    regNumber: string({
      required_error: 'regNumber is required',
    }),
  }),
};

export type studentBody = TypeOf<typeof addStudentSchema.body>;
export type studentProfile = TypeOf<typeof profileSchema.body>;
