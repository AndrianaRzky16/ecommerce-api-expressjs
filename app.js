import express from "express";
import router from "./app/routers/Router.js";
import { errorHandler } from "./app/middleware/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

export default app;
