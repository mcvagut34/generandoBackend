import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import actorRoute from "./routes/actor.js";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/actors", actorRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Error interno del servidor";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

let serverReady = false;

app.listen(8800, () => {
  serverReady = true;
  console.log("Server levantado en el puerto 8800 :)");
});
