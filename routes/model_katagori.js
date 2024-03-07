var connection = require("../config/database.js");

class model_kategori{

    static async getALL(){
        return new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM kategori ORDER BY id_kategori DESC",
                function (err, rows) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(rows);
                  }
                }
              );
        });
    }
    
    static async Store(Data){
        return new Promise((resolve, reject) => {
            connection.query('insert into kategori set ?', Data, function(err, result){
                if (err){
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    static async getId(id){
        return new Promise((resolve, reject) => {
            connection.query('select * from kategori where id_kategori = ' + id , (err, rows) => {
                if (err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

      static async update(id, data){
          return new Promise((resolve, reject) => {
              connection.query('update kategori set ? where id_kategori =' + id, data, function(err, result){
                  if (err){
                      reject(err);
                  } else {
                      resolve(result);
                  }
              });
          });
      }
      
      static async delete(id, data){
          return new Promise((resolve, reject) => {
              connection.query('delete from kategori where id_kategori =' + id, function(err, result){
                  if (err){
                      reject(err);
                  } else {
                      resolve(result);
                  }
              });
          });
      }
    
    




}



module.exports = model_kategori;