const conn = require("../connection");

// constructor
const Data = function (user) {
  (this.jumlah = user.jumlah)
};

Data.getKas = (result) => {
  let query = "SELECT * FROM data_kas WHERE id=1";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("kas: ", res);
    result(null, res);
  });
};

Data.getDenda = (result) => {
    let query = "SELECT * FROM data_kas WHERE id=2";
  
    conn.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("denda: ", res);
      result(null, res);
    });
  };
  

Data.updateKas = (user, result) => {
  conn.query(
    "UPDATE data_kas SET jumlah = ? WHERE id = 1",
    [
      user.jumlah
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated kas: ", { id: 1, ...user });
      result(null, { id: 1, ...user });
    }
  );
};

Data.updateDenda = (user, result) => {
    conn.query(
      "UPDATE data_kas SET jumlah = ? WHERE id = 2",
      [
        user.jumlah
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated denda: ", { id: 2, ...user });
        result(null, { id: 2, ...user });
      }
    );
  };

module.exports = Data;
