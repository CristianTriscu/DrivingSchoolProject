import bodyParser from "body-parser";
import express from "express";
import cors from "cors";


var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((req, res, next) => {
  console.log("Hello from middleware");
  
  next();
});

export { app, router };
