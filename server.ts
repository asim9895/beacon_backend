import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./app/database/postgres";
import routing from "./app/routes";

dotenv.config();

connectDb();

const app = express();
const port = process.env.port || 4542;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

routing(app);

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
