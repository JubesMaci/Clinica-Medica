import express from "express";
import mongoose from "mongoose";
import pkg from "body-parser";
import router from "./routes/router.js";

const app = express();
const { json, urlencoded } = pkg;

app.use(json());
app.use(urlencoded({ extended: true }));

async function start() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/mediapp", {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB conectado com sucesso!");

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
