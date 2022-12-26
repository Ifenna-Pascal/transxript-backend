import { prop, pre, getModelForClass } from '@typegoose/typegoose';

export enum USERTYPE {
  ADMIN = 'admin',
  TEACHER = 'teacher',
}

export class Student {
  @prop()
  public firstname?: string;

  @prop()
  public lastname?: string;

  @prop()
  public regNumber?: string;

  @prop({ trim: true, lowercase: true })
  public academic_session?: string;
}

export const studentModel = getModelForClass(Student, {
  schemaOptions: {
    timestamps: true,
  },
});
