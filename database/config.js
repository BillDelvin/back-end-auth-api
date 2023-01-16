require("dotenv/config");
const { createPool } = require("mysql2/promise");

const pool = createPool({
  host: `${process.env.DBHOST}`,
  user: `${process.env.DBUSER}`,
  database: `${process.env.DB}`,
  password: `${process.env.DBPASSWORD}`,
});

// connection to db
module.exports = {
  query: async (query) => {
    const [value] = await pool.query(query); // return value in array
    return value;
  },
};
