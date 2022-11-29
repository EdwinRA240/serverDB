const express = require("express");
const app = express();
const cors = require("cors");
const oracledb = require("oracledb");
const { fetchAsBuffer } = require("oracledb");
// oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const PORT = 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("HELLO, WELCOME... SERVER ONLINE!!!");
});

app.get("/employees", (req, res) => {
  const fetch = async () => {
    try {
      const connection = await oracledb.getConnection({
        user: "hr",
        password: "PassHr",
        connectString: "localhost/XEPDB1",
      });

      const result = await connection.execute(
        `SELECT employee_id, first_name, last_name FROM employees`
      );
      console.log(result);
      return res.send(result);
    } catch (error) {
      return error;
    }
  };

  fetch();

  //   fetch()
  //     .then((result) => {
  //         console.log(result);
  //       res.send(result);
  //     })
  //     .catch((err) => {
  //       res.send(err);
  //     });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
