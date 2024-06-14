const connection = require("../config/database");

class ModelfasilitasCustom {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM fasilitas_costum", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }



  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO fasilitas_costum SET ?", data, (err, result) => {
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
      connection.query(
        "UPDATE fasilitas_costum SET ? WHERE id_fasilitascostum = ?",
        [data, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah UPDATE
          }
        }
      );
    });
  }

  static async remove(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM fasilitas_costum WHERE id_fasilitascostum = ?",
        id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah DELETE
          }
        }
      );
    });
  }
}

module.exports = ModelfasilitasCustom;
