const express = require("express");
const router = express.Router();
const ModelCustom = require("../models/model_custom");

// Route untuk menampilkan semua data custom
router.get("/", async (req, res) => {
  try {
    let rows = await ModelCustom.getAll();
    res.render("./custom", {
      data: rows,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat data custom");
    res.redirect("./custom");
  }
});

// Route untuk menampilkan halaman pembuatan data custom
router.get("/create", async (req, res) => {
  try {
    // Jika diperlukan, tambahkan logika untuk mendapatkan data yang diperlukan dari model lain
    res.render("./custom/create");
  } catch (error) {
    console.error("Error saat memuat halaman pembuatan data custom:", error);
    req.flash("error", "Gagal memuat halaman pembuatan data custom");
    res.redirect("/custom/");
  }
});

// Route untuk menyimpan data custom baru
router.post("/store", async (req, res) => {
  try {
    let { deskripsi, status_request } = req.body;
    let data = {
      deskripsi,
      status_request,
    };
    await ModelCustom.create(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/custom/");
  } catch (error) {
    console.error("Error saat menyimpan data:", error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/custom/");
  }
});

// Route untuk menampilkan halaman edit data custom
router.get("/edit/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let custom = await ModelCustom.getById(id);
    res.render("./custom/edit", {
      custom: custom,
    });
  } catch (error) {
    console.error("Error saat memuat halaman edit data custom:", error);
    req.flash("error", "Gagal memuat halaman edit data custom");
    res.redirect("/custom/");
  }
});

// Route untuk menyimpan perubahan pada data custom yang diedit
router.post("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { deskripsi, status_request } = req.body;
    let data = {
      deskripsi,
      status_request,
    };
    await ModelCustom.update(id, data);
    req.flash("success", "Berhasil update data");
    res.redirect("/custom/");
  } catch (error) {
    console.error("Error saat menyimpan perubahan data:", error);
    req.flash("error", "Gagal menyimpan perubahan data");
    res.redirect("/custom/");
  }
});

// Route untuk menghapus data custom
router.post("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await ModelCustom.remove(id);
    req.flash("success", "Berhasil menghapus data");
    res.redirect("/custom/");
  } catch (error) {
    console.error("Error saat menghapus data:", error);
    req.flash("error", "Gagal menghapus data");
    res.redirect("/custom/");
  }
});

module.exports = router;
