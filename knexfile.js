require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: __dirname + "src/db/migrations",
    },
    seeds: {
      directory: __dirname + "src/db/seeds",
    },
  },
};
