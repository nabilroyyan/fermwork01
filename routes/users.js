var express = require("express");
const model_akun = require("../models/model_akun");
const model_paket = require("../models/model_paket"); // Tambahkan model_paket
const model_wisata = require("../models/model_wisata");
var router = express.Router();

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.redirect("/login"); // Redirect to login page if not authenticated
  }
}

router.get("/", isAuthenticated, async function (req, res, next) {
  try {
    // Get user ID from session
    let id = req.session.userId;

    // Get user data by ID
    let userData = await model_akun.getById(id);
    if (userData.length > 0) {
      // Get all packages
      let rows = await model_paket.getAll();
      let rows2 = await model_wisata.getAll();

      // Render the main page with user data and package data
      res.render("users/", {
        title: "Users Home",
        nama_pengguna: userData[0].nama_pengguna,
        id_akun: userData[0].id_akun,
        gambar: userData[0].gambar,
        data_wisata: rows,
        data_menu: rows2,
      });
    } else {
      res.status(401).json({ error: "User tidak ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Route untuk menampilkan halaman detail paket
router.get("/detailpaket/:id", isAuthenticated, async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await model_paket.getAll();
    let rows2 = await model_wisata.getAll();
    // Ambil data paket berdasarkan ID
    let paket = await model_paket.getById(id);
    // Jika paket tidak ditemukan, kembalikan respon 404
    if (!paket) {
      return res.status(404).json({ error: "Paket tidak ditemukan" });
    }
    // Render halaman detail paket dengan data paket
    res.render("users/detailpaket", { 
      paket,
      data_wisata: rows,
      data_menu: rows2,
      id
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/create/:id", isAuthenticated, async function (req, res, next) {
  try {
    let idUser = req.session.userId;
    let id = req.params.id;
    let rows = await model_paket.getAll();
    let rows2 = await model_wisata.getAll();
    let rows3 = await model_paket.getAll();
    // Ambil data paket berdasarkan ID
    let paket = await model_paket.getById(id);
    // Jika paket tidak ditemukan, kembalikan respon 404
    if (!paket) {
      return res.status(404).json({ error: "Paket tidak ditemukan" });
    }
    // Render halaman detail paket dengan data paket
    res.render("users/create", { 
      paket,
      data: rows,
      data_menu: rows2,
      data_paket: rows3,
      id: idUser
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
