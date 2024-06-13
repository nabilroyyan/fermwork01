const connection = require("../config/database");

class model_boking {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT * FROM boking JOIN paket ON boking.id_paket = paket.id_paket join menu on boking.id_menu = menu.id_menu
        JOIN akun ON boking.id_akun = akun.id_akun 
      `,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async getbokingbyid(id_akun) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM boking JOIN akun ON boking.id_akun = akun.id_akun WHERE boking.id_boking = ?
      `;
      connection.query(query, [id_akun], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getbyIdAkun(id_akun) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT * FROM boking join paket on boking.id_paket = paket.id_paket join menu on boking.id_menu = menu.id_menu
        JOIN akun ON boking.id_akun = akun.id_akun WHERE boking.id_akun = ? 
      `;
      connection.query(query, [id_akun], (err, rows) => {
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
      connection.query(
        "SELECT * FROM boking LEFT JOIN paket ON boking.id_paket = paket.id_paket LEFT JOIN akun ON boking.id_akun = akun.id_akun WHERE boking.id_boking = ?",
        id,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows[0]); // Ambil data pertama karena id_boking adalah primary key
          }
        }
      );
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO boking SET ?", data, (err, result) => {
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
        "UPDATE boking SET ? WHERE id_boking = ?",
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
        "DELETE FROM boking WHERE id_boking = ?",
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

module.exports = model_boking;
