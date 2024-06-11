var express = require('express');
var router = express.Router();
const model_paket = require('../models/model_paket');
const model_wisata = require('../models/model_wisata');

// Route untuk menampilkan semua paket
router.get('/', async function(req, res, next) {
    try {
        let rows = await model_paket.getAll();
        // Mengambil data wisata untuk setiap paket
        let data_wisata = [];
        for (let i = 0; i < rows.length; i++) {
            let paketId = rows[i].id_paket;
            let wisata = await model_wisata.getByPaketId(paketId);
            data_wisata.push(wisata);
        }
        res.render('./users/index', {
            data: rows,
            data_wisata: data_wisata,
        });
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal memuat data paket');
        res.redirect('./users/index');
    }
});

router.post("/store", upload.single("bukti"), async function (req, res, next) {
    try {
      let { id_paket, tanggal, status } = req.body;
      let data = {
        id_paket,
        tanggal,
        status,
        bukti: req.file.filename,
      };
      await model_boking.create(data);
      req.flash("success", "Berhasil menyimpan data");
      res.redirect("/boking");
    } catch (error) {
      console.error("Error:", error);
      req.flash("error", "Gagal menyimpan data");
      res.redirect("/boking");
    }
  });
