import express from "express";
import cors from "cors";
import connection from "./connection.js";
import env from "dotenv";
import router from "./router.js";
import bodyParser from "body-parser";

env.config();

const app = express();

// ✅ Essential middleware for JSON body parsing
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // in case of form-data
app.use(express.json({ limit: "100mb" }));

// ✅ Optional debug logger
app.use((req, res, next) => {
  console.log("Incoming Content-Type:", req.headers["content-type"]);
  console.log("Incoming body:", req.body);
  next();
});

app.use("/api", router);

// ✅ Start server
connection().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
  });
});
