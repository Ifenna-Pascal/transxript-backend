import { Course, courseModel } from '../model/courses.model';

export const findCourses = (filter: object) => {
  return courseModel.find(filter).lean<Course>().exec();
};
