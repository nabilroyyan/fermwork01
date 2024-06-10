var express = require("express");
const model_akun = require("../models/model_akun");
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
    // Mendapatkan ID pengguna dari sesi
    let id = req.session.userId;

    // Mendapatkan data pengguna berdasarkan ID
    let userData = await model_akun.getById(id);

    if (userData.length > 0) {
      // Render halaman utama dengan data pengguna
      res.render("users/", {
        title: "Users Home",
        nama_pengguna: userData[0].nama_pengguna,
        id_users: userData[0].id_users,
        foto: userData[0].foto,
      });
    } else {
      res.status(401).json({ error: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(501).json("Butuh akses login");
  }
});

router.get("/detailpaket", function (req, res, next) {
  res.render("users/detailpaket");
});

module.exports = router;
