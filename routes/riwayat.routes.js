module.exports = (app) => {
    const routes = require("express").Router();
    const riwayat = require("../controllers/riwayat.controllers");
  
    routes.post("/create", riwayat.create);
    routes.get("/find/:id", riwayat.findOne);
    routes.get("/find/all", riwayat.findAll);
    routes.put("/update/:id", riwayat.update);
    routes.delete("/delete/:id", riwayat.delete);
    routes.delete("/delete/all", riwayat.deleteAll);
  routes.get("/pemasukan", riwayat.pemasukan)
  routes.get("/pemasukan/all", riwayat.findPemasukan)
  routes.get("/pengeluaran", riwayat.pengeluaran);
  routes.get("/pengeluaran/all", riwayat.findPengeluaran);
    app.use("/riwayat", routes);
  };
  