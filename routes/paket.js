var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const model_paket = require("../models/model_paket");
const model_wisata = require("../models/model_wisata");
const model_kategori = require("../models/model_kategori");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Route to display all packages
router.get("/", async function (req, res, next) {
  try {
    let rows = await model_paket.getAll();
    res.render("paket/index", { data: rows });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Failed to load package data");
    res.redirect("/paket");
  }
});

// Route to display the create package page
router.get("/create", async function (req, res, next) {
  try {
    let data_wisata = await model_wisata.getAll();
    let data_kategori = await model_kategori.getAll();
    res.render("paket/create", {
      id_wisata: "",
      nama_paket: "",
      deskripsi: "",
      harga: "",
      kegiatan: "",
      fasilitas: "",
      kapasitas: "",
      data_wisata: data_wisata,
      data_kategori: data_kategori,
    });
  } catch (error) {
    console.error("Error while getting tourism data:", error);
    req.flash("error", "Failed to load the create package page");
    res.redirect("/paket");
  }
});

// Route to save a new package
router.post(
  "/store",
  upload.single("gambar_paket"),
  async function (req, res, next) {
    try {
      let {
        id_wisata,
        id_kategori,
        nama_paket,
        deskripsi,
        harga,
        kegiatan,
        fasilitas,
        kapasitas,
      } = req.body;
      let data = {
        id_wisata,
        id_kategori,
        nama_paket,
        deskripsi,
        harga,
        kegiatan,
        fasilitas,
        kapasitas,
        gambar_paket: req.file.filename,
      };
      await model_paket.create(data);
      req.flash("success", "Successfully saved data");
      res.redirect("/paket");
    } catch (error) {
      console.error("Error:", error);
      req.flash("error", "Failed to save data");
      res.redirect("/paket/create");
    }
  }
);

// Route to display the edit package page
router.get("/edit/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let paket = await model_paket.getById(id);
    let data_wisata = await model_wisata.getAll();

    if (!paket) {
      req.flash("error", "Data not found");
      return res.redirect("/paket");
    }

    res.render("paket/edit", {
      paket: paket,
      data_wisata: data_wisata,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Failed to load the edit package page");
    res.redirect("/paket");
  }
});

// Route to update package data
router.post(
  "/update/:id",
  upload.single("gambar_paket"),
  async function (req, res, next) {
    try {
      let id = req.params.id;
      let filebaru = req.file ? req.file.filename : null;
      let paket = await model_paket.getById(id);

      if (!paket) {
        req.flash("error", "Data not found");
        return res.redirect("/paket");
      }

      const namaFileLama = paket.gambar_paket;
      if (filebaru && namaFileLama) {
        const pathFileLama = path.join(
          __dirname,
          "../public/images/upload",
          namaFileLama
        );
        fs.unlinkSync(pathFileLama);
      }

      let {
        id_wisata,
        id_kategori,
        nama_paket,
        deskripsi,
        harga,
        kegiatan,
        fasilitas,
        kapasitas,
      } = req.body;
      let gambar_paket = filebaru || namaFileLama;

      let data = {
        id_wisata,
        id_kategori,
        nama_paket,
        deskripsi,
        harga,
        kegiatan,
        fasilitas,
        kapasitas,
        gambar_paket,
      };

      await model_paket.update(id, data);
      req.flash("success", "Successfully updated data");
      res.redirect("/paket");
    } catch (error) {
      console.error("Error:", error);
      req.flash("error", "Failed to update data");
      res.redirect("/paket");
    }
  }
);

// Route to delete a package
router.get("/delete/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let paket = await model_paket.getById(id);

    if (!paket) {
      req.flash("error", "Data not found");
      return res.redirect("/paket");
    }

    const namaFileLama = paket.gambar_paket;
    if (namaFileLama) {
      const pathFileLama = path.join(
        __dirname,
        "../public/images/upload",
        namaFileLama
      );
      fs.unlinkSync(pathFileLama);
    }

    await model_paket.remove(id);
    req.flash("success", "Successfully deleted data");
    res.redirect("/paket");
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Failed to delete data");
    res.redirect("/paket");
  }
});

module.exports = router;
