const conn = require("../connection");

// constructor
const Transaksi = function (transaksi) {
  (this.id_trx = transaksi.id_trx),
    (this.no_induk = transaksi.no_induk),
    (this.tanggal = transaksi.tanggal),
    (this.nominal = transaksi.nominal),
    (this.keterangan = transaksi.keterangan);
};

Transaksi.create = (newTransaksi, result) => {
  conn.query("INSERT INTO transaksi SET ?", newTransaksi, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transaksi: ", { id: res.insertId, ...newTransaksi });
    result(null, { id: res.insertId, ...newTransaksi });
  });
};

Transaksi.getAll = (result) => {
  let query = "SELECT * FROM transaksi";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transaksi: ", res);
    result(null, res);
  });
};
Transaksi.total = (result) => {
  let query = "SELECT SUM(nominal) as total_transaksi FROM transaksi";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transaksi: ", res);
    result(null, res);
  });
};
Transaksi.saldoUser = (id, result) => {
  let query =
    "SELECT SUM(nominal) as saldo_user FROM transaksi WHERE no_induk=" + id;

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transaksi: ", res);
    result(null, res);
  });
};
Transaksi.findByIdUser = (id, result) => {
  conn.query(`SELECT * FROM transaksi WHERE no_induk = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transaksi: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Transaksi.findById = (id, result) => {
  conn.query(`SELECT * FROM transaksi WHERE id_trx = '${id}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transaksi: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Transaksi.updateById = (id, transaksi, result) => {
  conn.query(
    "UPDATE transaksi SET no_induk = ?, tanggal = ?, nominal = ?, keterangan = ? WHERE id_trx = ?",
    [
      transaksi.no_induk,
      transaksi.tanggal,
      transaksi.nominal,
      transaksi.keterangan,
      id,
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

      console.log("updated transaksi: ", { id: id, ...transaksi });
      result(null, { id: id, ...transaksi });
    }
  );
};
Transaksi.remove = (id, result) => {
  conn.query("DELETE FROM transaksi WHERE id_trx = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};
Transaksi.removeByIdUser = (id, result) => {
  conn.query("DELETE FROM transaksi WHERE no_induk = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};
Transaksi.removeAll = (result) => {
  conn.query("DELETE FROM transaksi", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} transaksi`);
    result(null, res);
  });
};

module.exports = Transaksi;
