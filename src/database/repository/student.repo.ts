import { Student, studentModel } from '../model/student.model';

function findBySession(session: string) {
  return studentModel.find({ session: session }).lean<Student>().exec();
}

function findStudentById(userId: string) {
  return studentModel.findById(userId);
}

async function createStudent(student: Student) {
  return studentModel.create(student);
}

export { findBySession, findStudentById, createStudent };
