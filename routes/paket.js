var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const model_paket = require("../models/model_paket");
const model_wisata = require("../models/model_wisata");

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

// Route untuk menampilkan semua paket
router.get("/", async function (req, res, next) {
  try {
    let rows = await model_paket.getAll();
    res.render("./paket", {
      data: rows,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat data paket");
    res.redirect("./paket");
  }
});

// Route untuk menampilkan halaman pembuatan paket
router.get("/create", async function (req, res, next) {
  try {
    let data_wisata = await model_wisata.getAll();
    res.render("./paket/create", {
      id_wisata: "",
      nama_paket: "",
      deskripsi: "",
      harga: "",
      norek: "",
      data_wisata: data_wisata,
    });
  } catch (error) {
    console.error("Error saat mendapatkan data wisata:", error);
    req.flash("error", "Gagal memuat halaman pembuatan paket");
    res.redirect("/paket/");
  }
});

// Route untuk menyimpan paket baru
router.post("/store", upload.single("gambar_paket"), async function (req, res, next) {
  try {
    let { id_wisata, nama_paket, deskripsi, harga, norek } = req.body;
    let data = {
      id_wisata,
      nama_paket,
      deskripsi,
      harga,
      norek,
      gambar_paket: req.file.filename,
    };
    await model_paket.create(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/paket");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/paket");
  }
});

// Route untuk menampilkan halaman edit paket
router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let paket = await model_paket.getById(id);
    let data_wisata = await model_wisata.getAll();
    res.render("paket/edit", {
      paket: paket,
      data_wisata: data_wisata,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat halaman edit paket");
    res.redirect("/paket");
  }
});

// Route untuk memperbarui data paket
router.post(
  "/update/:id",
  upload.single("gambar_paket"),
  async function (req, res, next) {
    let id = req.params.id;
    let filebaru = req.file ? req.file.filename : null;
    let rows2 = await model_wisata.getAll();
    let rows = await model_paket.getById(id);
    const namaFileLama = rows[0].gambar_paket;
    if (filebaru && namaFileLama) {
      const pathFileLama = path.join(
        __dirname,
        "../public/images/upload",
        namaFileLama
      );
      fs.unlinkSync(pathFileLama);
    }
    let { id_wisata, nama_paket, deskripsi, harga, norek } =
      req.body;
    let gambar_paket = filebaru || namaFileLama;
    let data = {
      id_wisata,
      nama_paket,
      deskripsi,
      harga,
      norek,
      gambar_paket,
    };
    await model_wisata.update(id, data);
    req.flash("success", "Berhasil update data");
    res.redirect("/wisata");
  }
);

// Route untuk menghapus paket
router.get("/delete/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    await model_paket.remove(id);
    req.flash("success", "Berhasil menghapus data");
    res.redirect("/paket");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal menghapus data");
    res.redirect("/paket");
  }
});

module.exports = router;
