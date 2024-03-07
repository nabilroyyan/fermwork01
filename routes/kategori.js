var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const e = require("method-override");
const model_kategori = require("./model_katagori.js");


router.get("/",async function (req, res, next) {
  let rows = await model_kategori.getALL();
  res.render("kategori/index", {
    data: rows,
  });
});

router.get("/create", function (req, res, next) {
  res.render("kategori/create", {
    nama_kategori: "",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_kategori } = req.body;
    let Data = {
      nama_kategori
      }
   await model_kategori.Store(Data);
          req.flash("success", "Berhasil memperbarui data!");
          res.redirect("/kategori");
    }catch{
          req.flash("error", "Gagal memperbarui data");
          res.redirect("/kategori");
    } 
});

router.get("/edit/(:id)", async function (req, res, next) {
  let id = req.params.id;
  let rows = await model_kategori.getId(id);
  res.render('kategori/edit',{
    id:            rows[0].id_kategori,
    nama_kategori: rows[0].nama_kategori,
  })
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_kategori } = req.body;
    let Data = {
      nama_kategor,
    }
    await model_kategori.update(id,Data);
    req.flash("success", "Berhasil memperbarui data!");
    res.redirect("/kategori");
      }catch{
        req.flash("error", "Gagal memperbarui data");
        res.redirect("/kategori");
      } 
});


router.get("/delete/:id", async function (req, res) {  
    let id = req.params.id;
    await model_kategori.delete(id);
    req.flash("success", "Berhasil menghapus data!");
    res.redirect("/kategori");
  });
module.exports = router;