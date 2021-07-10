"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class DataBaseConnection {
    dataBaseConnect() {
        const pathURI = process.env.DB_HOST;
        const connectOption = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        };
        mongoose_1.default.connect(pathURI, connectOption);
        const DB = mongoose_1.default.connection;
        DB.on("error", console.error.bind(console, "Connection error!"));
        DB.once("open", () => {
            console.log("Database connected!");
        });
    }
}
exports.default = new DataBaseConnection().dataBaseConnect;
