import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import cors from "cors";

if (mongoose.connection.readyState !== 1) {
  await mongoose.connect("mongodb://127.0.0.1:27017/mediapp", {
    serverSelectionTimeoutMS: 5000,
  });
}

const app = express();

async function start() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mediapp", {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB conectado com sucesso!");

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/", router);

    app.listen(3001, () => {
      console.log("Listening to port 3001");
    });
  } catch (err) {
    console.error("Erro ao conectar no MongoDB:", err);
    process.exit(1);
  }
}
start();
