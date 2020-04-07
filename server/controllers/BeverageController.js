import express from "express";

let FAKEDB = [
  {
    id: 1,
    name: "Coca Cola",
    price: "$2.50",
  },
  {
    id: 2,
    name: "Mountain Dew",
    price: "$2.50",
  },
  {
    id: 3,
    name: "Dr. Pepper",
    price: "$2.50",
  },
  {
    id: 4,
    name: "Dos Equis",
    price: "$5.50",
  },
  {
    id: 5,
    name: "Margarita",
    price: "$7.50",
  },
];

export default class BeverageController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:beverageId", this.getOne)
      .post("", this.create)
      .delete("/:beverageId", this.delete)
      .use(this.defaultError);
  }
  getAll(req, res, next) {
    res.send(FAKEDB);
  }
  getOne(req, res, next) {
    let foundBev = FAKEDB.find((bev) => bev.id == req.params.beverageId);
    if (!foundBev) {
      return res.status(400).send("Invalid ID");
    }
    res.send(foundBev);
  }
  create(req, res, next) {
    let newBev = {
      id: FAKEDB.length + 1,
      name: req.body.name || "Unknown Beverage",
      description: req.body.description || "No description",
    };
    // @ts-ignore
    FAKEDB.push(newBev);
    res.send({ message: "Sucessfully created data!", newBev });
  }
  delete(req, res, next) {
    let index = FAKEDB.findIndex((bev) => bev.id == req.params.beverageId);
    if (index == -1) {
      return res.status(400).send("Invalid ID");
    }
    FAKEDB.splice(index, 1);
    res.send("Deleted");
  }
  defaultError(req, res, next) {
    res.status(404).send("Route not found in Beverage Controller");
  }
}
