const conn = require("../connection");

// constructor
const Riwayat = function (riwayat) {
  (this.id_riwayat = riwayat.id_riwayat),
    (this.kategori = riwayat.kategori),
    (this.tanggal = riwayat.tanggal),
    (this.nominal = riwayat.nominal),
    (this.keterangan = riwayat.keterangan);
};

Riwayat.create = (newRiwayat, result) => {
  conn.query("INSERT INTO riwayat SET ?", newRiwayat, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created riwayat: ", { id: res.insertId, ...newRiwayat });
    result(null, { id: res.insertId, ...newRiwayat });
  });
};

Riwayat.getAll = (result) => {
  let query = "SELECT * FROM riwayat";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("riwayat: ", res);
    result(null, res);
  });
};
Riwayat.pemasukan = (result) => {
  let query =
    "SELECT SUM(nominal) as total_pemasukan FROM riwayat WHERE kategori='pemasukan'";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pemasukan: ", res);
    result(null, res);
  });
};
Riwayat.findByPemasukan = (result) => {
  conn.query(
    "SELECT * FROM riwayat WHERE kategori ='pemasukan'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("users: ", res);
      result(null, res);
    }
  );
};
Riwayat.pengeluaran = (result) => {
  let query =
    "SELECT SUM(nominal) as total_pengeluaran FROM riwayat WHERE kategori='pengeluaran'";

  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pengeluaran: ", res);
    result(null, res);
  });
};
Riwayat.findByPengeluaran = (result) => {
  conn.query(
    "SELECT * FROM riwayat WHERE kategori ='pengeluaran'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("users: ", res);
      result(null, res);
    }
  );
};
Riwayat.findById = (id, result) => {
  conn.query(`SELECT * FROM riwayat WHERE id_riwayat = ?`, [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found riwayat: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Riwayat.updateById = (id, riwayat, result) => {
  conn.query(
    "UPDATE riwayat SET kategori = ?, tanggal = ?, nominal = ?, keterangan = ? WHERE id_riwayat = ?",
    [
      riwayat.kategori,
      riwayat.tanggal,
      riwayat.nominal,
      riwayat.keterangan,
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

      console.log("updated riwayat: ", { id: id, ...riwayat });
      result(null, { id: id, ...riwayat });
    }
  );
};
Riwayat.remove = (id, result) => {
  conn.query("DELETE FROM riwayat WHERE id_riwayat = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted riwayat with id: ", id);
    result(null, res);
  });
};

Riwayat.removeAll = (result) => {
  conn.query("DELETE FROM riwayat", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} riwayat`);
    result(null, res);
  });
};

module.exports = Riwayat;
