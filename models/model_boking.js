const connection = require('../config/database');

class model_boking {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM boking', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM boking WHERE id_boking = ?', id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]); // Ambil data pertama karena id_boking adalah primary key
        }
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO boking SET ?', data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId); // Mengembalikan ID dari data yang baru saja dimasukkan
        }
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE boking SET ? WHERE id_boking = ?', [data, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah UPDATE
        }
      });
    });
  }

  static async remove(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM boking WHERE id_boking = ?', id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah DELETE
        }
      });
    });
  }
}

module.exports = model_boking;
