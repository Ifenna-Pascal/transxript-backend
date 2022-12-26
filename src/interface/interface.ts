export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  userType: string;
  sessions?: string;
}
