const connection = require('../config/database');

class ModelCustom {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM custom', (err, rows) => {
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
      connection.query('SELECT * FROM custom WHERE id_custom = ?', id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]); // Ambil data pertama karena id_custom adalah primary key
        }
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO custom SET ?', data, (err, result) => {
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
      connection.query('UPDATE custom SET ? WHERE id_custom = ?', [data, id], (err, result) => {
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
      connection.query('DELETE FROM custom WHERE id_custom = ?', id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah DELETE
        }
      });
    });
  }
}

module.exports = ModelCustom;
