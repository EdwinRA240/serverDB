const express = require("express");
const app = express();
const cors = require("cors");
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const PORT = 5000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("HELLO, WELCOME... SERVER ONLINE!!!");
});

app.get("/EMPLEADO", (req, res) => {
  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const result = await connection.execute(
        `SELECT CLAVE, NOMBRE, APELLIDO_PAT, APELLIDO_MAT, CORREO, CARGO_EPL_ID, SUCURSAL_CLAVE, DIRECCION_ID FROM EMPLEADO`
      );
      // console.log(result);
      return res.send(result);
    } catch (error) {
      return error;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  })();
});
