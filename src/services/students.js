import createHttpError from 'http-errors';
import { StudentsCollection } from '../db/models/student.js';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async studentId => {
  const student = await StudentsCollection.findById(studentId);

  if (!student) {
    throw new createHttpError(404, 'Student not found');
  }

  return student;
};

export const createStudent = async payload => {
  const student = await StudentsCollection.create(payload);
  return student;
};

export const deleteStudentById = async studentId => {
  await StudentsCollection.findOneAndDelete(studentId);
};

export const updateStudent = async (studentId, payload, options = {}) => {
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { _id: studentId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
    { upsert: true }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
