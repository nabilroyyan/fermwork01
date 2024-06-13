var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const model_boking = require("../models/model_boking");
const model_paket = require("../models/model_paket");
const Model_Akun = require("../models/model_akun");

router.get("/", async function (req, res, next) {
    try {
      let rows = await model_boking.getAll();
      res.render("./perizinan", {
        data: rows,
      });
    } catch (error) {
      console.error("Error:", error);
      req.flash("error", "Gagal memuat data boking");
      res.redirect("./perizinan");
    }
  });
  
  router.get("/edit/:id", async function (req, res, next) {
    try {
      let id = req.params.id;
      let boking = await model_boking.getById(id);
      let data_akun = await Model_Akun.getAll();      
      res.render("perizinan/edit", {
        boking: boking,
        data_akun: data_akun,
        id,
      });
    } catch (error) {
      console.error("Error:", error);
      req.flash("error", "Gagal memuat halaman edit boking");
      res.redirect("/perizinan");
    }
  });


  router.post('/status/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { status } = req.body;
        let data = {
            status,
        };
        await model_boking.update(id, data);
        req.flash('success', 'Berhasil update data menu');
        res.redirect('/perizinan');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data menu');
        res.redirect('/perizinan');
        console.log(error)
    }
});

  router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { id_paket, id_akun, tanggal, bukti, status } = req.body;
        let data = {
            id_paket,
            id_akun,
            tanggal,
            bukti,
            status,
        };
        await model_boking.update(id, data);
        req.flash('success', 'Berhasil update data menu');
        res.redirect('/perizinan');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data menu');
        res.redirect('/perizinan');
        console.log(error)
    }
});

router.get('/invois/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let menu = await model_boking.getById(id);
        function formatDate(dateString) {
            const date = new Date(dateString);
            date.setDate(date.getDate() + 1); // Adjust for timezone offset
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        res.render('nota/invois', {
            menu: menu,
            formatDate
        });
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal memuat halaman edit menu');
        res.redirect('nota/');
    }
  });

module.exports = router