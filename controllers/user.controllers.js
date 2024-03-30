const md5 = require("md5");
const User = require("../models/user.models");

exports.create = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!",
    });
  }
  const passHash = req.body.password;
  const user = new User({
    no_induk: req.body.no_induk,
    username: req.body.username,
    password: md5(passHash),
    nama: req.body.nama,
    email: req.body.email,
    telp: req.body.telp,
    status: req.body.status,
    level: req.body.level,
  });

  User.create(user, (err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while creating the users.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  User.getAll(req.query.username, (err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
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
exports.findAdmin = (req, res) => {
  User.findAdmin(req.params.id, (err, data) => {
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
    } else {res.send(data);console.log(data);}
  });
};
exports.findUser = (req, res) => {
  User.findUser((err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  User.updateById(req.params.id, new User(req.body), (err, data) => {
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
  User.remove(req.params.id, (err, data) => {
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
  User.removeAll((err, data) => {
    if (err)
      res.send({
        message: err.message || "Some error occurred while removing all users.",
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};

exports.count = (req,
  res) => {
    User.countUser((err, data) => {
      if (err)
      res.send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
    });
  };
exports.login =(req,res)=>{

}