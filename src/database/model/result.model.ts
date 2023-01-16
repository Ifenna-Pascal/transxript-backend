import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Student } from './student.model';

export class Result {
  @prop({ required: true, ref: () => Student })
  public studentId!: Ref<Student>;

  @prop({ required: true })
  public level!: string;

  @prop({ required: true })
  public semester!: string;

  @prop({ required: true })
  public courseTitle!: string;

  @prop({ required: true })
  public courseCode!: string;

  @prop({ required: true })
  public creditLoad!: string;

  @prop({ required: true })
  public grade!: string;
}

export const ResultModel = getModelForClass(Result, {
  schemaOptions: { timestamps: true },
});
