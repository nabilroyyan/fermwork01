const connection = require('../config/database');

class ModelPaket {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM paket 
        JOIN wisata ON paket.id_wisata = wisata.id_wisata
        JOIN menu ON wisata.id_menu = menu.id_menu
      `;
      connection.query(query, (err, rows) => {
        if (err) {
          reject(new Error("Failed to fetch all packages"));
        } else {
          resolve(rows);
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM paket 
        JOIN wisata ON paket.id_wisata = wisata.id_wisata
        JOIN menu ON wisata.id_menu = menu.id_menu
        WHERE paket.id_paket = ?
      `;
      connection.query(query, [id], (err, rows) => {
        if (err) {
          reject(new Error("Failed to fetch package by ID"));
        } else {
          resolve(rows.length > 0 ? rows[0] : null);
        }
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO paket SET ?', data, (err, result) => {
        if (err) {
          reject(new Error("Failed to create package"));
        } else {
          resolve(result.insertId);
        }
      });
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE paket SET ? WHERE id_paket = ?', [data, id], (err, result) => {
        if (err) {
          reject(new Error("Failed to update package"));
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  }

  static remove(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM paket WHERE id_paket = ?', [id], (err, result) => {
        if (err) {
          reject(new Error("Failed to delete package"));
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  }
}

module.exports = ModelPaket;
