const Transaksi = require("../models/transaksi.models");

exports.create = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!",
    });
  }

  const trans = new Transaksi({
    id_trx: req.body.id_trx,
    no_induk: req.body.no_induk,
    tanggal: req.body.tanggal,
    nominal: req.body.nominal,
    keterangan: req.body.keterangan,
  });

  Transaksi.create(trans, (err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while creating the users.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Transaksi.getAll((err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};
exports.total = (req, res) => {
  Transaksi.total((err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data[0]);
  });
};
exports.saldoUser = (req, res) => {
  Transaksi.saldoUser(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.send({
          message: "Error retrieving User with id " + req.params.id,
        });
      }
    } else res.send(data[0]);
  });
};

exports.findUser = (req, res) => {
  Transaksi.findByIdUser(req.params.id_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          message: `Not found User with id ${req.params.id_user}.`,
        });
      } else {
        res.send({
          message: "Error retrieving User with id " + req.params.id_user,
        });
      }
    } else res.send(data);
  });
};
exports.findOne = (req, res) => {
  Transaksi.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.send({
          message: `Not found User with id ${req.params.id}.`,
        });
      } else {
        res.send({
          message: "Error retrieving User with id " + req.params.id,
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

  Transaksi.updateById(req.params.id, new Transaksi(req.body), (err, data) => {
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
  Transaksi.remove(req.params.id, (err, data) => {
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
  Transaksi.removeAll((err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};
