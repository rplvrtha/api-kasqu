module.exports = (app) => {
    const routes = require("express").Router();
    const data = require("../controllers/data_kas.controllers");

    routes.get("/find/kas", data.findKas);
    routes.get("/find/denda", data.findDenda);
    routes.put("/update/kas", data.updateKas);
    routes.put("/update/denda", data.updateDenda);
    app.use("/data", routes);
  };
  