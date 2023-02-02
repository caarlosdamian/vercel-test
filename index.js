import express, { json, urlencoded } from "express";
import cors from "cors";
import storeRouter from "./routers/store.js";
import authRouter from "./routers/auth.js";

const app = express();
const port = 5002;
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api/store", storeRouter);
app.use("/api/auth", authRouter);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

module.exports = app;
