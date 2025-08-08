import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from "./routes/auth.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "UPDATE", "DELETE"],
  })
);

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("Connection failed:", err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Blog");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`listening at the port ${port}.`);
});
