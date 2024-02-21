import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";

import routes from "./routes";
import { verifyAuthHeader } from "../utils/verify-auth-header";

config();

const app = express();

// Middlewares
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(verifyAuthHeader);

// Logger !TODO: Remove in production
app.use(morgan("dev"));

app.use("/api/v1/", routes);

export default app;
