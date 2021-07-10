"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const StudentModel_1 = require("../models/StudentModel");
class StudentController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqFullname = req.body.fullname;
            const reqEmail = req.body.email;
            const reqPassword = req.body.password;
            try {
                if (!reqFullname || !reqEmail || !reqPassword) {
                    throw { name: "REQUIRED" };
                }
                const emailExist = yield StudentModel_1.StudentModel.findOne({ email: reqEmail });
                if (emailExist) {
                    throw { name: "DUPLICATE_EMAIL" };
                }
                const register = yield StudentModel_1.StudentModel.create({
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
                }
                else {
                    throw { name: "FAILED_REGISTER" };
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static allStudents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allStudents = yield StudentModel_1.StudentModel.find();
                if (allStudents.length < 0) {
                    throw { name: "NOT_FOUND" };
                }
                if (allStudents) {
                    res.status(200).json({
                        success: true,
                        message: "All students found successfully!",
                        data: allStudents,
                    });
                }
                else {
                    throw { name: "NOT_FOUND" };
                }
            }
            catch (err) {
                console.log(err);
                next(err);
            }
        });
    }
}
exports.default = StudentController;
