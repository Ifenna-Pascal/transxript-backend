import { prop, pre, getModelForClass } from '@typegoose/typegoose';
import argon2 from 'argon2';

enum USERTYPE {
  ADMIN = 'admin',
  TEACHER = 'teacher',
}

@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    return next();
  }
})
export class User {
  @prop({ required: true })
  public firstname!: string;

  @prop({ required: true })
  public lastname!: string;

  @prop({
    unique: true,
    validate: {
      validator: (value: string) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
      },
      message: 'kindly enter a valid email address',
    },
  })
  public email!: string;

  @prop({ required: true, min: 6, max: 12 })
  public password!: string;

  @prop({ enum: USERTYPE, default: USERTYPE.TEACHER, select: false })
  public userType!: USERTYPE;

  @prop({ trim: true, lowercase: true })
  public academic_session?: string;

  public async comparePassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

export const userModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
  },
});
