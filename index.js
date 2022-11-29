const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const run = async () => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: "PassHr",
      connectString: "localhost/XEPDB1",
    });

    const consulta = await connection.execute(
      `SELECT employee_id, first_name, last_name FROM employees`
    );

    console.log(consulta);

    // consulta.rows.forEach((e) => {
    //   console.log(
    //     `Su id es:${e.EMPLOYEE_ID}\nSu name es: ${e.FIRST_NAME} ${e.LAST_NAME}`
    //   );
    // });
  } catch (err) {
    console.error(err);
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

run();
