"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
class App {
    constructor() {
        this.envPath = path_1.default.join(__dirname, "../env/.env");
        this.app = express_1.default();
        this.plugin();
        this.route();
    }
    plugin() {
        dotenv_1.default.config({ path: this.envPath });
        this.app.use(express_1.default.urlencoded({ extended: true }));
        dbConnect_1.default();
    }
    route() {
        this.app.use(indexRoutes_1.default);
    }
}
const app = new App().app;
const port = process.env.PORT || 3020;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
