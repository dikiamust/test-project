import {Request, Response, NextFunction} from "express";
import {StudentModel} from "../models/StudentModel";

class StudentController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const reqFullname = req.body.fullname;
    const reqEmail = req.body.email;
    const reqPassword = req.body.password;

    try {
      if (!reqFullname || !reqEmail || !reqPassword) {
        throw {name: "REQUIRED"};
      }
      const emailExist: any = await StudentModel.findOne({email: reqEmail});
      if (emailExist) {
        throw {name: "DUPLICATE_EMAIL"};
      }

      const register = await StudentModel.create({
        fullname: reqFullname,
        email: reqEmail,
        password: reqPassword,
      });

      if (register) {
        res.status(201).json({
          success: true,
          message: "Student registered successfully!",
          data: register,
        });
      } else {
        throw {name: "FAILED_REGISTER"};
      }
    } catch (err) {
      next(err);
    }
  }

  static async allStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const allStudents = await StudentModel.find();
      if (allStudents.length < 0) {
        throw {name: "NOT_FOUND"};
      }
      if (allStudents) {
        res.status(200).json({
          success: true,
          message: "All students found successfully!",
          data: allStudents,
        });
      } else {
        throw {name: "NOT_FOUND"};
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export default StudentController;
