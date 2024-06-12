var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Model_Akun = require("../models/model_akun");
const model_paket = require("../models/model_paket"); // Tambahkan model_paket
const model_wisata = require("../models/model_wisata");

// GET home page
router.get("/", async function (req, res) {
  let rows = await model_paket.getAll();
  let rows2 = await model_wisata.getAll();
  res.render("index", {
    data_wisata: rows,
    data_menu: rows2,
  });
});

// GET register page
router.get("/register", function (req, res) {
  res.render("auth/register");
});
// GET login page
router.get("/login", function (req, res) {
  res.render("auth/login");
});


// POST register user
router.post("/saveusers", async (req, res) => {
  try {
    const { email, password, level, notelp } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = {
      email,
      password: encryptedPassword,
      level,
      notelp,
    };
    await Model_Akun.create(userData);
    req.flash("success", "Berhasil register");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal register");
    res.redirect("/register");
  }
});

// POST update user
router.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { notelp, email } = req.body;
    const data = { notelp, email };
    await Model_Akun.update(id, data);
    req.flash("success", "Berhasil mengubah data");
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/users");
  }
});

// POST login user
router.post("/log", async (req, res) => {
  let { email, password } = req.body;
  try {
    let Data = await Model_Akun.getByEmail(email);
    if (Data.length > 0) {
      let enkripsi = Data[0].password;
      let cek = await bcrypt.compare(password, enkripsi);
      if (cek) {
        req.session.userId = Data[0].id_akun;
        // Tambahkan kondisi pengecekan level pada user yang login
        if (Data[0].level === "1") {
          req.flash("success", "Berhasil login");
          res.redirect("/admin");
        } else if (Data[0].level === "2") {
          req.flash("success", "Berhasil login");
          res.redirect("/users");
        } else {
          res.redirect("/login");
        }
        // Akhir kondisi
      } else {
        req.flash("error", "Email atau password salah");
        res.redirect("/login");
      }
    } else {
      // req.flash("error", "Akun tidak ditemukan");
      // res.redirect("/login");
      console.log(Data)
    }
  } catch (err) {
    req.flash("error", "Terjadi kesalahan");
    res.redirect("/login");
  }
});

// GET logout user
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.redirect("/users");
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
