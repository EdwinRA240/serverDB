import oracleDB from "oracledb";
import config from "./config";

const connection = oracledb.getConnection({
    user: config.user,
    password: config.password,
    connectString: config.connectString
  });

export default connection;