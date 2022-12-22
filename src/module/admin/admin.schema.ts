import { object, string, TypeOf } from 'zod';

export const registerUserSchema = {
  body: object({
    firstname: string({
      required_error: 'firstname is required',
    }),
    lastname: string({
      required_error: 'lastname is required',
    }),
    session: string().optional(),
    email: string({
      required_error: 'email is required',
    }).email('email must be valid'),
  }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
