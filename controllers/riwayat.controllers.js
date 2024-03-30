const Riwayat = require("../models/riwayat.models")

exports.create = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!",
    });
  }

  const trans = new Riwayat({
    id_riwayat: req.body.id_riwayat,
    kategori: req.body.kategori,
    tanggal: req.body.tanggal,
    nominal: req.body.nominal,
    keterangan: req.body.keterangan,
  });

  Riwayat.create(trans, (err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while creating the users.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Riwayat.getAll((err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};
exports.pemasukan = (req, res) => {
  Riwayat.pemasukan((err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data[0]);
  });
};
exports.findPemasukan = (req, res) => {
  Riwayat.findByPemasukan((err, data) => {
    if (err) {
      res.send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    } else res.send(data);
  });
};
exports.pengeluaran = (req, res) => {
    Riwayat.pengeluaran((err, data) => {
      if (err)
        res.send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      else res.send(data[0]);
    });
  };
  exports.findPengeluaran = (req, res) => {
    Riwayat.findByPengeluaran((err, data) => {
      if (err) {
        res.send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      } else res.send(data);
    });
  };

exports.findOne = (req, res) => {
  Riwayat.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          message: `Not found Riwayat with id ${req.params.id}.`,
        });
      } else {
        res.send({
          message: "Error retrieving Riwayat with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Riwayat.updateById(req.params.id, new Riwayat(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.send({
          message: "Error updating User with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Riwayat.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.send({
          message: "Could not delete User with id " + req.params.id,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Riwayat.removeAll((err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
