import { Student, studentModel } from '../model/student.model';

function findBySession(session: string) {
  return studentModel.find({ academic_session: session }).lean<Student>().exec();
}

function findStudentByReqNo(regNo: string) {
  return studentModel.findOne({ regNumber: regNo }).lean<Student>().exec();
}

async function createStudent(student: Student) {
  return studentModel.create(student);
}

export { findBySession, findStudentByReqNo, createStudent };
