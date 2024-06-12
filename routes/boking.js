var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const model_boking = require("../models/model_boking");
const model_paket = require("../models/model_paket");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/upload");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Route untuk menampilkan semua boking
router.get("/", async function (req, res, next) {
  try {
    let rows = await model_boking.getAll();
    res.render("./boking", {
      data: rows,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat data boking");
    res.redirect("./boking");
  }
});

// Route untuk menampilkan halaman pembuatan boking
router.get("/create", async function (req, res, next) {
  try {
    let data_wisata = await model_paket.getAll();
    let data_boking = await model_boking.getAll();
    res.render("./boking/create", {
      data_wisata: data_wisata,
      data_boking: data_boking,
    });
  } catch (error) {
    console.error("Error saat mendapatkan data wisata:", error);
    req.flash("error", "Gagal memuat halaman pembuatan boking");
    res.redirect("/boking/");
  }
});

// Route untuk menyimpan boking baru
router.post("/store", upload.single("bukti"), async function (req, res, next) {
    try {
      let { id_paket, tanggal, status, id_akun } = req.body;
      let getbokingbyid = await model_boking.getbokingbyid(id_akun);
      let data = {
        id_paket,
        tanggal,
        status,
        bukti: req.file.filename,
        id_akun: id_akun
      };
      await model_boking.create(data);
      req.flash("success", "Berhasil menyimpan data");
      res.redirect("/users");
    } catch (error) {
      console.error("Error saat menyimpan data:", error);
      req.flash("error", "Gagal menyimpan data");
      res.redirect("/users");
    }
  });
  

module.exports = router