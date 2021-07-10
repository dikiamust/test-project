import mongoose from "mongoose";

interface IStudentModel {
  fullname: string;
  email: string;
  password: string;
  grades: number;
}

interface StudentDocument extends mongoose.Document {
  fullname: string;
  email: string;
  password: string;
  grades: number;
}

interface StudentModelInterface extends mongoose.Model<StudentDocument> {
  build(attr: IStudentModel): StudentDocument;
}

const Schema = mongoose.Schema;
const studentSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  grades: {
    type: Number,
    default: 0,
  },
});

const StudentModel = mongoose.model<StudentDocument, StudentModelInterface>(
  "StudentModel",
  studentSchema
);
export {StudentModel};
