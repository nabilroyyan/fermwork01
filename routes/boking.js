var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const model_boking = require("../models/model_boking");
const model_paket = require("../models/model_paket");
const Model_Akun = require("../models/model_akun");
const model_menu = require("../models/model_menu");

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
    let manu = await model_menu.getAll();
    res.render("./boking", {
      data: rows,
      menu: menu,
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
    let data_menu = await model_menu.getAll();
    res.render("./boking/create", {
      data_wisata: data_wisata,
      data_menu: data_menu,
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
    let { id_paket, tanggal, status,total_harga, id_akun, id_menu } = req.body;
    let getbokingbyid = await model_boking.getbokingbyid(id_akun);
    let data = {
      id_paket,
      tanggal,
      status,
      total_harga,
      bukti: req.file.filename,
      id_akun: id_akun,
      id_menu,
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

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let boking = await model_boking.getById(id);
    let data_akun = await Model_Akun.getAll();
    res.render("boking/edit", {
      boking: boking,
      data_akun: data_akun,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat halaman edit boking");
    res.redirect("/boking");
  }
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { id_paket, id_akun, tanggal, bukti, status,total_harga, } = req.body;
    let data = {
      id_paket,
      id_akun,
      tanggal,
      bukti,
      status,
      total_harga,
    };
    await model_boking.update(id, data);
    req.flash("success", "Berhasil update data menu");
    res.redirect("/boking");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal menyimpan data menu");
    res.redirect("/boking");
  }
});

module.exports = router;
