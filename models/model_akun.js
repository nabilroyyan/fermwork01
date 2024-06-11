const connection = require('../config/database');

class Model_Akun {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM akun ORDER BY id_akun DESC', (err, rows) => {
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
      connection.query('SELECT * FROM akun WHERE id_akun = ?', id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM akun WHERE email = ?', [email],function (err, rows){
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) =>{
      connection.query('INSERT INTO akun SET ?', data, (err, result) => {
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
      connection.query('UPDATE akun SET ? WHERE id_akun = ?', [data, id], (err, result) => {
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
      connection.query('DELETE FROM akun WHERE id_akun = ?', id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  }
}

module.exports = Model_Akun;
