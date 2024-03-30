const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ author: "rplvrtha", message: "Welcome to my application." });
});
require("./routes/user.routes")(app);
require("./routes/transaksi.routes")(app);
require("./routes/riwayat.routes")(app);
require("./routes/data_kas.routes")(app);

app.listen(port, () => {
  console.log(
    "App running on https://localhost:" + port
  );
});
