var express = require('express');
var router = express.Router();
const model_pesan = require('../models/model_pesan');
const model_paket = require('../models/model_wisata');

// Route untuk menampilkan semua pesan
router.get('/', async function(req, res, next) {
    try {
        let rows = await model_pesan.getAll();
        res.render('/pesan/', {
            data: rows
        });
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal memuat data pesan');
        res.redirect('/pesan/');
    }
});

// Route untuk menampilkan form tambah pesan
// Route untuk menampilkan halaman pembuatan paket
router.get('/create', async function(req, res, next) {
    try {
        let data_pesan = await model_pesan.getAll();
        res.render('pesan/create', {
            nama: '',
            id_paket: '',
            data_pesan: data_pesan
        });
    } catch (error) {
        console.error('Error saat mendapatkan data wisata:', error);
        req.flash('error', 'Gagal memuat halaman pembuatan paket');
        res.redirect('/paket');
    }
});
// Route untuk menambahkan pesan baru
router.post('/store', async function(req, res, next) {
    try {
        let { nama, id_paket } = req.body;
        let data = {
            nama,
            id_paket,
        };
        await model_pesan.create(data);
        req.flash('success', 'Berhasil menyimpan data pesan');
        res.redirect('/pesan');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data pesan');
        res.redirect('/pesan');
    }
});

// Route untuk menampilkan form edit pesan
router.get('/edit/:id', async function(req, res, next) {
  try {
      let id = req.params.id;
      let pesan = await model_pesan.getById(id);
      let data_paket = await model_paket.getAll(id);
      res.render('admin/editpesan', {
          pesan: pesan,
          data_paket: data_paket,
      });
  } catch (error) {
      console.error('Error:', error);
      req.flash('error', 'Gagal memuat halaman edit pesan');
      res.redirect('admin/pesan');
  }
});

// Route untuk menyimpan perubahan pada pesan yang diedit
router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama, id_paket } = req.body;
        let data = {
            nama,
            id_paket,
        };
        await model_pesan.update(id, data);
        req.flash('success', 'Berhasil update data pesan');
        res.redirect('/pesan');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data pesan');
        res.redirect('/pesan');
    }
});

// Route untuk menghapus pesan
router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        await model_pesan.remove(id);
        req.flash('success', 'Berhasil menghapus data pesan');
        res.redirect('/pesan');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menghapus data pesan');
        res.redirect('/pesan');
    }
});

module.exports = router;
