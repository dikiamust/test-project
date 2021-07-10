import express, {Application} from "express";
import dotenv from "dotenv";
import path from "path";
import indexRoutes from "./routes/indexRoutes";
import dataBaseConnection from "./config/dbConnect";

class App {
  public app: Application;
  private envPath = path.join(__dirname, "../env/.env");

  constructor() {
    this.app = express();
    this.plugin();
    this.route();
  }

  protected plugin(): void {
    dotenv.config({path: this.envPath});
    this.app.use(express.urlencoded({extended: true}));
    dataBaseConnection();
  }

  protected route(): void {
    this.app.use(indexRoutes);
  }
}

const app = new App().app;

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
