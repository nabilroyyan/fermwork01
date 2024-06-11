const connection = require('../config/database');

class model_wisata {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(' SELECT * FROM wisata JOIN menu ON wisata.id_menu = menu.id_menu', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getByPaketId(id_paket) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM wisata
        WHERE id_wisata = ?  -- or adjust this query according to your table structure
      `;
      connection.query(query, [id_paket], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });
  }


  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM wisata WHERE id_wisata = ?', id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows); // Ambil data pertama karena id_wisata adalah primary key
        }
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO wisata SET ?', data, (err, result) => {
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
      connection.query('UPDATE wisata SET ? WHERE id_wisata = ?', [data, id], (err, result) => {
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
      connection.query('DELETE FROM wisata WHERE id_wisata = ?', id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah DELETE
        }
      });
    });
  }
}

module.exports = model_wisata;
