import {Router} from "express";
import studentController from "../controllers/studentController";

class StudentRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.post("/register", studentController.register);
    this.router.get("/all", studentController.allStudents);
  }
}

export default new StudentRoutes().router;
