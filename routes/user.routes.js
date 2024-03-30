module.exports = (app) => {
  const routes = require("express").Router();
  const user = require("../controllers/user.controllers");

  routes.post("/create", user.create);
  routes.get("/find/all", user.findAll);
  routes.get("/find/:id", user.findOne);
  routes.get("/admin/:id", user.findAdmin);
  routes.get("/only", user.findUser);
  routes.put("/update/:id", user.update);
  routes.delete("/delete/all", user.deleteAll);
  routes.delete("/delete/:id", user.delete);
routes.get("/", user.count)
  app.use("/user", routes);
};
