import express from "express";

let FAKEDB = [
  {
    id: 1,
    name: "Street Tacos",
    description: "3 Delicious Street Tacos",
    price: "$2.50",
  },
  {
    id: 2,
    name: "Tostadas",
    description: "2 Crunchy Tostadas",
    price: "$4.50",
  },
  {
    id: 3,
    name: "Burritos",
    description: "2 Massive Burritos",
    price: "$5.50",
  },
];

export default class TacoController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:tacoId", this.getOne)
      .post("", this.create)
      .delete("/:tacoId", this.delete)
      .use(this.defaultError);
  }
  getAll(req, res, next) {
    res.send(FAKEDB);
  }
  getOne(req, res, next) {
    let foundTaco = FAKEDB.find((taco) => taco.id == req.params.tacoId);
    if (!foundTaco) {
      return res.status(400).send("Invalid ID");
    }
    res.send(foundTaco);
  }
  create(req, res, next) {
    let newTaco = {
      id: FAKEDB.length + 1,
      name: req.body.name || "Unknown Taco",
      description: req.body.description || "No description",
    };
    // @ts-ignore
    FAKEDB.push(newTaco);
    res.send({ message: "Sucessfully created data!", newTaco });
  }
  delete(req, res, next) {
    let index = FAKEDB.findIndex((taco) => taco.id == req.params.tacoId);
    if (index == -1) {
      return res.status(400).send("Invalid ID");
    }
    FAKEDB.splice(index, 1);
    res.send("Deleted");
  }
  defaultError(req, res, next) {
    res.status(404).send("Route not found in Taco Controller");
  }
}
