import { Course, courseModel } from '../model/courses.model';

export const findCourses = (filter: object) => {
  return courseModel.find(filter).lean<Course>().exec();
};

export const findCourseById = (courseId: string) => {
  return courseModel.findById(courseId).lean<Course>().exec();
};
