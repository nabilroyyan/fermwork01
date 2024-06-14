var express = require('express');
var router = express.Router();
const model_fasilitas = require('../models/model_fasilitas');
const ModelPaket = require('../models/model_paket');

// Route untuk menampilkan semua fasilitas
router.get('/', async function(req, res, next) {
    try {
        let rows = await model_fasilitas.getAll();
        res.render('./fasilitas', {
            data_fasilitas: rows
        });
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal memuat data fasilitas');
        res.redirect('/fasilitas/');
    }
});

router.get('/create', async function(req, res, next) {
    try {
        let data_fasilitas = await model_fasilitas.getAll();
        res.render('./fasilitas/create', {
            data_fasilitas: data_fasilitas,
            data_paket: data_paket,
        });
    } catch (error) {
        console.error('Error saat mendapatkan data fasilitas:', error);
        req.flash('error', 'Gagal memuat halaman pembuatan fasilitas');
        res.redirect('/fasilitas');
    }
});
// Route untuk menambahkan fasilitas baru
router.post('/store', async function(req, res, next) {
    try {
        let { nama,harga_fasilitas,id_paket } = req.body;
        let data = {
            nama,harga_fasilitas,id_paket
        };
        await model_fasilitas.create(data);
        req.flash('success', 'Berhasil menyimpan data fasilitas');
        res.redirect('/fasilitas');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data fasilitas');
        res.redirect('/fasilitas/create');
    }
});

// Route untuk menampilkan form edit fasilitas
router.get('/edit/:id', async function(req, res, next) {
  try {
      let id = req.params.id;
      let fasilitas = await model_fasilitas.getById(id);
      res.render('fasilitas/edit', {
          fasilitas: fasilitas,
      });
  } catch (error) {
      console.error('Error:', error);
      req.flash('error', 'Gagal memuat halaman edit fasilitas');
      res.redirect('fasilitas/edit');
  }
});

// Route untuk menyimpan perubahan pada fasilitas yang diedit
router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama, harga_fasilitas,id_paket} = req.body;
        let data = {
            nama,harga_fasilitas,id_paket
        };
        await model_fasilitas.update(id, data);
        req.flash('success', 'Berhasil update data fasilitas');
        res.redirect('/fasilitas');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data fasilitas');
        res.redirect('/fasilitas');
    }
});

// Route untuk menghapus fasilitas
router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        await model_fasilitas.remove(id);
        req.flash('success', 'Berhasil menghapus data fasilitas');
        res.redirect('/fasilitas');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menghapus data fasilitas');
        res.redirect('/fasilitas');
    }
});

module.exports = router;
