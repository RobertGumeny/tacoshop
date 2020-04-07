import express from "express";
import bp from "body-parser";

let server = express();

const port = 3000;

server.use(bp.urlencoded({ extended: true }));
server.use(bp.json());

import TacoController from "./controllers/TacoController.js";
let tacoController = new TacoController();
import BeverageController from "./controllers/BeverageController.js";
let beverageController = new BeverageController();

server.use("/api/tacos", tacoController.router);
server.use("/api/beverages", beverageController.router);

server.use((req, res, next) => {
  res.status(404).send("Route not found");
});

server.listen(port, () => {
  console.log("Server is running on port:", port);
});
