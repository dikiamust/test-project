"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentRoutes_1 = __importDefault(require("./studentRoutes"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
        this.studentRoutes();
        this.errorHandler();
        this.errorRoutes();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res
                .status(200)
                .json({ success: true, message: "Test project deployed successfully!" });
        });
    }
    studentRoutes() {
        this.router.use("/students", studentRoutes_1.default);
    }
    errorHandler() {
        this.router.use(errorHandler_1.default);
    }
    errorRoutes() {
        this.router.use((req, res, next) => {
            const ERROR = new Error("ERROR!");
            return res.status(404).json({ success: false, message: "ERROR!" });
        });
    }
}
exports.default = new IndexRoutes().router;
