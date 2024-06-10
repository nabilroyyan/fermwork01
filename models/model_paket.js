const connection = require('../config/database');

class model_paket {
  static async getAll() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT p.*, w.nama AS nama_wisata
        FROM paket p
        JOIN wisata w ON p.id_wisata = w.id_wisata
      `;
      connection.query(query, (err, rows) => {
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
      const query = `
        SELECT p.*, w.nama AS nama_wisata
        FROM paket p
        JOIN wisata w ON p.id_wisata = w.id_wisata
        WHERE p.id_paket = ?
      `;
      connection.query(query, [id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO paket SET ?', data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE paket SET ? WHERE id_paket = ?', [data, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  }

  static async remove(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM paket WHERE id_paket = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  }
}

module.exports = model_paket;
