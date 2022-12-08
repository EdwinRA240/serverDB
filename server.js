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

const execute = async (query) => {
  let connection;

  try {
    const connection = await oracledb.getConnection({
      user: "userSK",
      password: "PassUser",
      connectString: "localhost/XEPDB1",
    });

    const result = await connection.execute(`${query}`);
    console.log(result);
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
};

//ROUTES
app.get("/", (req, res) => {});

//EMPLEADO
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

app.put("/empleados", (req, res) => {
  console.log(req.body.CLAVE + "->PUT");
});

app.delete("/empleados", (req, res) => {
  console.log(req.body.CLAVE + "->DELETE");

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `DELETE FROM DIRECCION WHERE ID = :id`;

      const binds = [
        {
          id: "DIR71",
        },
      ];

      const options = { autoCommit: true };

      const result = await connection.executeMany(sql, binds, options);

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

//DIRECCION
app.delete("/direccion", (req, res) => {
  console.log(req.body.ID + "->PUT");

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `DELETE FROM DIRECCION WHERE ID = :id`;

      const binds = [
        {
          id: req.body.ID,
        },
      ];

      const options = { autoCommit: true };

      const result = await connection.executeMany(sql, binds, options);

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

app.post("/direccion", (req, res) => {
  console.log(req.body.ID + "->POST");
  const DATA = req.body;

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `INSERT INTO DIRECCION (ID, ESTADO_ID, ALCAL_MUN, CODIGO_POSTAL, CALLE, NUMERO_EXT, NUMERO_INT)
         VALUES (:a, :b, :c, :d, :e, :f, :g)`;

      const binds = [
        {
          // a: DATA.ID,
          a: "DIR",
          b: DATA.ESTADO_ID,
          c: DATA.ALCAL_MUN,
          d: DATA.CODIGO_POSTAL,
          e: DATA.CALLE,
          f: DATA.NUMERO_EXT,
          g: DATA.NUMERO_INT,
        },
      ];

      const options = {
        autoCommit: true,
        bindDefs: {
          a: { type: oracledb.STRING, maxSize: 6 },
          b: { type: oracledb.NUMBER },
          c: { type: oracledb.STRING, maxSize: 30 },
          d: { type: oracledb.NUMBER },
          e: { type: oracledb.STRING, maxSize: 30 },
          f: { type: oracledb.NUMBER },
          g: { type: oracledb.NUMBER },
        },
      };

      const result = await connection.executeMany(sql, binds, options);
      console.log("No. Insert: " + result.rowsAffected);
      return res.send("No. Insert: " + result.rowsAffected);
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

app.get("/direccion", (req, res) => {
  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const result = await connection.execute(
        `SELECT DIRECCION.ID, ESTADO AS ESTADO_ID, ALCAL_MUN, CODIGO_POSTAL, CALLE, NUMERO_EXT, NUMERO_INT 
        FROM DIRECCION
        JOIN ESTADO ON DIRECCION.ESTADO_ID = ESTADO.ID`
      );
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

//ESTADO
app.get("/estados", (req, res) => {
  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const result = await connection.execute(`SELECT ID, ESTADO FROM ESTADO`);
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
