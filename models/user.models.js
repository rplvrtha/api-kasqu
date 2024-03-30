const Transaksi = require("./transaksi.models");
const md5 = require("md5");
const conn = require("../connection");

// constructor
const User = function (user) {
  (this.no_induk = user.no_induk),
    (this.username = user.username),
    (this.password = user.password),
    (this.nama = user.nama),
    (this.email = user.email),
    (this.telp = user.telp),
    (this.level = user.level);
};

User.create = (newUser, result) => {
  conn.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.getAll = (usrnm, result) => {
  let query = "SELECT * FROM users";

  if (usrnm) {
    query += `WHERE username LIKE '%${usrnm}%'`;
  }
  conn.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.findById = (id, result) => {
  conn.query(
    `SELECT * FROM users WHERE no_induk ='${id}' OR username='${id}' OR email='${id}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found users: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    }
  );
};
User.findAdmin = (id, result) => {
  conn.query(
    `SELECT * FROM users WHERE (no_induk ='${id}' OR username='${id}' OR email='${id}') AND level != 'siswa'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found users: ", res[0]);
        result(null, res[0]);
        return;
      }
    }
  );
};
User.findUser = (result) => {
  conn.query(`SELECT * FROM users WHERE level != 'admin'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  conn.query(
    "UPDATE users SET username = ?, password = ?, nama = ?, email = ?, telp = ?, level = ? WHERE no_induk = ?",
    [
      user.username,
      md5(user.password),
      user.nama,
      user.email,
      user.telp,
      user.level,
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

      console.log("updated tutorial: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};
User.remove = (id, result) => {
  conn.query(
    "SELECT COUNT(*) AS total_trx FROM transaksi WHERE no_induk = ?",
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } else if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      } else if (res[0].total_trx > 0) {
        conn.query(
          "DELETE FROM transaksi WHERE no_induk = ?",
          [id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            } else {
              conn.query(
                "DELETE FROM users WHERE no_induk = ?",
                [id],
                (err, res) => {
                  if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                  } else {
                    console.log("deleted user with id: ", id);
                    result(null, res);
                  }
                }
              );
            }
          }
        );
      } else {
        conn.query("DELETE FROM users WHERE no_induk = ?", [id], (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          } else {
            console.log("deleted user with id: ", id);
            result(null, res);
          }
        });
      }
    }
  );
};

User.removeAll = (result) => {
  conn.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};
User.countUser = (result) => {
  conn.query(
    "SELECT COUNT(*) AS total_user FROM users WHERE level != 'admin'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("count users: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = User;
