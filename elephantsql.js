const { Pool } = require('pg');

const conString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: conString,
});

pool.connect((err, client, done) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }

  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    done(); // release the client back to the pool

    if (err) {
      return console.error('error running query', err);
    }

    console.log(result.rows[0].theTime);
    console.log("Postgres SQL server is connected");
  });
});

// Initializing the query function
const querying = async (text, values) => {
  try {
    const result = await pool.query(text, values);
    console.log("success", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

module.exports = { querying };