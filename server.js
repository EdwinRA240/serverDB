const express = require("express");
const app = express();
const cors = require("cors");
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const PORT = 5000;

//FIX UNDEFINED BODY
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

//ROUTES
app.get("/", (req, res) => {
  res.send("HELLO, WELCOME... SERVER ONLINE!!!");
});

app.get("/empleados", (req, res) => {
  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const result = await connection.execute(
        `SELECT EMPLEADO.CLAVE, EMPLEADO.NOMBRE, APELLIDO_PAT, APELLIDO_MAT, CORREO, CARGO, SUCURSAL.NOMBRE AS NOMBRE_S, ESTADO.ESTADO
        FROM EMPLEADO
        JOIN CARGO_EPL ON EMPLEADO.CARGO_EPL_ID = CARGO_EPL.ID
        JOIN SUCURSAL ON EMPLEADO.SUCURSAL_CLAVE = SUCURSAL.CLAVE
        JOIN DIRECCION ON EMPLEADO.DIRECCION_ID = DIRECCION.ID
        JOIN ESTADO ON DIRECCION.ESTADO_ID = ESTADO.ID
        ORDER BY EMPLEADO.NOMBRE`
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

app.get("/estados", (req, res) => {
  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const result = await connection.execute(
        `SELECT ID, ESTADO FROM ESTADO`
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

app.put("/empleados", (req, res) => {
  console.log(req.body.CLAVE+"->PUT");
  res.send("POST request to homepage");
});

app.delete("/empleados", (req, res) => {
  console.log(req.body.CLAVE+"->DELETE");

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const result = await connection.execute(
        `DELETE FROM EMPLEADO WHERE CLAVE = "${req.body.CLAVE}"`
      );
      console.log(result);
      return res.send(result);
    } catch (error) {
      console.log(error);
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
