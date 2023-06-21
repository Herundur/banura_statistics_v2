const sqlite3 = require('sqlite3').verbose();

let db = null;

function connectDatabase() {
  if (!db) {
    db = new sqlite3.Database('../database/statistics.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
    });
  }
  return db;
}

function closeDatabase() {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Database connection closed.');
        }
      });
      db = null
    }
  }

module.exports = { connectDatabase, closeDatabase };