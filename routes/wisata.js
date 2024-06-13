var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const model_wisata = require("../models/model_wisata.js");
const model_menu = require("../models/model_menu.js");

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

router.get("/", async function (req, res, next) {
  let rows = await model_wisata.getAll();
  res.render("wisata/index", {
    data: rows,
  });
});

router.get("/create", async function (req, res, next) {
  let rows = await model_wisata.getAll();
  let rows2 = await model_menu.getAll();
  res.render("wisata/create", {
    wisata: rows,
    menu: rows2,
  });
});

router.post("/store", upload.single("gambar"), async function (req, res, next) {
  try {
    let { id_menu, nama, alamat, deskripsi } = req.body;
    let Data = {
      id_menu,
      nama,
      alamat,
      deskripsi,
      gambar: req.file.filename,
    };
    await model_wisata.create(Data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/wisata");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/wisata/create");
  }
});

router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows2 = await model_menu.getAll();
    let rows = await model_wisata.getById(id);
    if (!rows || rows.length === 0) {
      req.flash("error", "Data tidak ditemukan");
      return res.redirect("/wisata");
    }
    res.render("wisata/edit", {
      wisata: rows[0], // Ensure 'wisata' is the correct key to access the data in EJS
      menu: rows2, // Sending all menus data
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal mengambil data");
    res.redirect("/wisata");
  }
});


router.post(
  "/update/:id",
  upload.single("gambar"),
  async function (req, res, next) {
    let id = req.params.id;
    let filebaru = req.file ? req.file.filename : null;
    let rows2 = await model_menu.getAll();
    let rows = await model_wisata.getById(id);
    const namaFileLama = rows[0].gambar;
    if (filebaru && namaFileLama) {
      const pathFileLama = path.join(
        __dirname,
        "../public/images/upload",
        namaFileLama
      );
      fs.unlinkSync(pathFileLama);
    }
    let { id_menu, nama, alamat, deskripsi } = req.body;
    let gambar = filebaru || namaFileLama;
    let Data = {
      id_menu,
      nama,
      alamat,
      deskripsi,
      gambar,
    };
    await model_wisata.update(id, Data);
    req.flash("success", "Berhasil update data");
    res.redirect("/wisata");
  }
);

router.get("/delete/:id", async function (req, res, next) {
  let id = req.params.id;
  let rows = await model_wisata.getById(id);
  const namaFileLama = rows[0].gambar;
  if (namaFileLama) {
    const pathFileLama = path.join(
      __dirname,
      "../public/images/upload",
      namaFileLama
    );
    fs.unlinkSync(pathFileLama);
  }
  await model_wisata.remove(id);
  req.flash("success", "Berhasil menghapus data");
  res.redirect("/wisata");
});

module.exports = router;
