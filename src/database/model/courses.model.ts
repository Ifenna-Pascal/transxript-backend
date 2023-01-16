import { prop, getModelForClass, Ref } from '@typegoose/typegoose';

export class Course {
  @prop({ required: true })
  public year!: string;

  @prop({ required: true })
  public semester!: string;

  @prop({ required: true })
  public courseTitle!: string;

  @prop({ required: true })
  public courseCode!: string;

  @prop({ required: true })
  public creditLoad!: string;
}

export const courseModel = getModelForClass(Course, {
  schemaOptions: { timestamps: true },
});
