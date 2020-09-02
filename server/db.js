const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "0000",
  host: "localhost",
  port: 5432,
  database: "currencyExchangeRates"
});

module.exports = pool;