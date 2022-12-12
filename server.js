const express = require("express");
const app = express();
const cors = require("cors");
const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const PORT = 5000;

////////FIX UNDEFINED BODY
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
/////////// parse application/json
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

////////////////////////////////////////////////////////ROUTES
app.get("/", (req, res) => {});

////////////////////////////////////////////////////////EMPLEADO
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
        `SELECT EMPLEADO.CLAVE, EMPLEADO.NOMBRE, APELLIDO_PAT, APELLIDO_MAT, CORREO, CARGO, SUCURSAL.NOMBRE AS NOMBRE_S, 
        ESTADO.ESTADO FROM EMPLEADO
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

app.post("/empleado", (req, res) => {
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

///////////////////////////////////////////////////////////////DIRECCION
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

app.put("/direccion", (req, res) => {
  console.log(req.body.ID + "->PUT");
  const DATA = req.body;

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `UPDATE DIRECCION SET ESTADO_ID = :b , ALCAL_MUN = :c, CODIGO_POSTAL = :d, 
                  CALLE = :e, NUMERO_EXT = :f, NUMERO_INT = :g WHERE ID = :a`;

      const binds = [
        {
          a: DATA.ID,
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
      console.log("No. Put: " + result.rowsAffected);
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

//////////////////////////////////////////MODELOS

app.get("/modelos", (req, res) => {
  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const result = await connection.execute(`SELECT ID, MODELO FROM MODELO`);
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

app.post("/modelo", (req, res) => {
  console.log(req.body.ID + "->POST");
  // const DATA = req.body;

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `INSERT INTO MODELO VALUES(:a, :b)`;

      const binds = [
        {
          a: req.body.ID,
          b: req.body.MODELO,
        },
      ];

      const options = {
        autoCommit: true,
        bindDefs: {
          a: { type: oracledb.NUMBER },
          b: { type: oracledb.STRING, maxSize: 30 },
        },
      };

      const result = await connection.executeMany(sql, binds, options);
      console.log("No. Insert: " + result.rowsAffected);
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

app.delete("/modelo", (req, res) => {
  console.log(req.body.ID + "->PUT");

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `DELETE FROM MODELO WHERE ID = :id`;

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

app.put("/modelo", (req, res) => {
  console.log(req.body.ID + "->POST");
  // const DATA = req.body;

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `UPDATE MODELO SET MODELO = :b WHERE ID = :a`;

      const binds = [
        {
          a: req.body.ID,
          b: req.body.MODELO,
        },
      ];

      const options = {
        autoCommit: true,
        bindDefs: {
          a: { type: oracledb.NUMBER },
          b: { type: oracledb.STRING, maxSize: 30 },
        },
      };

      const result = await connection.executeMany(sql, binds, options);
      console.log("No. Put: " + result.rowsAffected);
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

//////////////////////////////////////////Marca

app.get("/marca", (req, res) => {
  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const result = await connection.execute(`SELECT ID, MARCA FROM MARCA`);
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

app.post("/Marca", (req, res) => {
  console.log(req.body.ID + "->POST");
  // const DATA = req.body;

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `INSERT INTO MARCA VALUES(:a, :b)`;

      const binds = [
        {
          a: req.body.ID,
          b: req.body.MARCA,
        },
      ];

      const options = {
        autoCommit: true,
        bindDefs: {
          a: { type: oracledb.NUMBER },
          b: { type: oracledb.STRING, maxSize: 30 },
        },
      };

      const result = await connection.executeMany(sql, binds, options);
      console.log("No. Insert: " + result.rowsAffected);
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

app.delete("/marca", (req, res) => {
  console.log(req.body.ID + "->PUT");

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `DELETE FROM MARCA WHERE ID = :id`;

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

app.put("/Marca", (req, res) => {
  console.log(req.body.ID + "->POST");
  // const DATA = req.body;

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `UPDATE MARCA SET MARCA = :b WHERE ID = :a`;

      const binds = [
        {
          a: req.body.ID,
          b: req.body.MARCA,
        },
      ];

      const options = {
        autoCommit: true,
        bindDefs: {
          a: { type: oracledb.NUMBER },
          b: { type: oracledb.STRING, maxSize: 30 },
        },
      };

      const result = await connection.executeMany(sql, binds, options);
      console.log("No. Put: " + result.rowsAffected);
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

//////////////////////////////////////////Cliente

app.get("/Cliente", (req, res) => {
  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const result =
        await connection.execute(`SELECT CLAVE, NOMBRE, APELLIDO_PAT, APELLIDO_MAT, CORREO, CODIGO_POSTAL
      FROM CLIENTE JOIN DIRECCION ON DIRECCION_ID = ID`);
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

app.post("/Cliente", (req, res) => {
  console.log(req.body.CLAVE + "->POST");
  // const DATA = req.body;

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `INSERT INTO CLIENTE VALUES (:a, :b, :C, :d, :e, :f)`;

      const binds = [
        {
          a: "CL",
          b: req.body.NOMBRE,
          c: req.body.APELLIDO_PAT,
          d: req.body.APELLIDO_MAT,
          e: req.body.CORREO,
          f: req.body.ID_DIR,
        },
      ];

      const options = {
        autoCommit: true,
        bindDefs: {
          a: { type: oracledb.STRING, maxSize: 5 },
          b: { type: oracledb.STRING, maxSize: 15 },
          c: { type: oracledb.STRING, maxSize: 15 },
          d: { type: oracledb.STRING, maxSize: 15 },
          e: { type: oracledb.STRING, maxSize: 30 },
          f: { type: oracledb.STRING, maxSize: 6 },
        },
      };

      const result = await connection.executeMany(sql, binds, options);
      console.log("No. Insert: " + result.rowsAffected);
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

app.delete("/Cliente", (req, res) => {
  console.log(req.body.ID + "->PUT");

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `DELETE FROM Cliente WHERE CLAVE = :a`;

      const binds = [
        {
          a: req.body.CLAVE,
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

app.put("/Cliente", (req, res) => {
  console.log(req.body.CLAVE + "->POST");

  (async () => {
    let connection;

    try {
      const connection = await oracledb.getConnection({
        user: "userSK",
        password: "PassUser",
        connectString: "localhost/XEPDB1",
      });

      const sql = `UPDATE Cliente SET NOMBRE = :b, APELLIDO_PAT = :c, APELLIDO_MAT = :d, CORREO = :e, 
      DIRECCION_ID = :f WHERE CLAVE = :a`;

      const binds = [
        {
          a: req.body.CLAVE,
          b: req.body.NOMBRE,
          c: req.body.APELLIDO_PAT,
          d: req.body.APELLIDO_MAT,
          e: req.body.CORREO,
          f: req.body.ID_DIR,
        },
      ];

      const options = {
        autoCommit: true,
        bindDefs: {
          a: { type: oracledb.STRING, maxSize: 5 },
          b: { type: oracledb.STRING, maxSize: 15 },
          c: { type: oracledb.STRING, maxSize: 15 },
          d: { type: oracledb.STRING, maxSize: 15 },
          e: { type: oracledb.STRING, maxSize: 30 },
          f: { type: oracledb.STRING, maxSize: 6 },
        },
      };

      const result = await connection.executeMany(sql, binds, options);
      console.log("No. Put: " + result.rowsAffected);
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
