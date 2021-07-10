import {Router, Request, Response, NextFunction} from "express";
import studentRoutes from "./studentRoutes";
import errorHandler from "../middlewares/errorHandler";

class IndexRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
    this.studentRoutes();
    this.errorHandler();
    this.errorRoutes();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res
        .status(200)
        .json({success: true, message: "Test project deployed successfully!"});
    });
  }

  public studentRoutes(): void {
    this.router.use("/students", studentRoutes);
  }

  public errorHandler(): void {
    this.router.use(errorHandler);
  }

  public errorRoutes() {
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      const ERROR = new Error("ERROR!");
      return res.status(404).json({success: false, message: "ERROR!"});
    });
  }
}

export default new IndexRoutes().router;
