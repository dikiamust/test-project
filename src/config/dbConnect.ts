import mongoose from "mongoose";

class DataBaseConnection {
  public dataBaseConnect(): void {
    const pathURI = process.env.DB_HOST as string;
    const connectOption = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    mongoose.connect(pathURI, connectOption);

    const DB = mongoose.connection;
    DB.on("error", console.error.bind(console, "Connection error!"));
    DB.once("open", () => {
      console.log("Database connected!");
    });
  }
}

export default new DataBaseConnection().dataBaseConnect;
