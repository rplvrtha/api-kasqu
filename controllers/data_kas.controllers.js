const Data = require("../models/data_kas.models");

exports.findKas = (req, res) => {
    Data.getKas((err, data) => {
      if (err)
        res.send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      else res.send(data[0]);
    });
  };

  exports.findDenda = (req, res) => {
    Data.getDenda((err, data) => {
      if (err)
        res.send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      else res.send(data[0]);
    });
  };

  exports.updateKas = (req, res) => {
    if (!req.body) {
      res.send({
        message: "Content can not be empty!",
      });
    }
  
    console.log(req.body)
  
    Data.updateKas(new Data(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.send({
            message: `Not found User with id 1.`,
          });
        } else {
          res.send({
            message: "Error updating User with id 1.",
          });
        }
      } else res.send(data);
    });
  };
  exports.updateDenda = (req, res) => {
    if (!req.body) {
      res.send({
        message: "Content can not be empty!",
      });
    }
  
    console.log(req.body)
  
    Data.updateDenda(new Data(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.send({
            message: `Not found User with id 2.`,
          });
        } else {
          res.send({
            message: "Error updating User with id 2.",
          });
        }
      } else res.send(data);
    });
  };