module.exports = (app) => {
    const routes = require("express").Router();
    const transaksi = require("../controllers/transakasi.controllers");
  
    routes.post("/create", transaksi.create);
    routes.get("/find/all", transaksi.findAll);
    routes.get("/find/:id", transaksi.findOne);
    routes.get("/find/user/:id_user", transaksi.findUser);
    routes.put("/update/:id", transaksi.update);
    routes.delete("/delete/:id", transaksi.delete);
    routes.delete("/delete/all", transaksi.deleteAll);
  routes.get("/", transaksi.total)
  routes.get("/saldo/:id", transaksi.saldoUser);
    app.use("/transaksi", routes);
  };
  