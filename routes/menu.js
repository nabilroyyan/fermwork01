var express = require('express');
var router = express.Router();
const model_menu = require('../models/model_menu');

// Route untuk menampilkan semua menu
router.get('/', async function(req, res, next) {
    try {
        let rows = await model_menu.getAll();
        res.render('./menu', {
            data_menu: rows
        });
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal memuat data menu');
        res.redirect('/menu/');
    }
});

router.get('/create', async function(req, res, next) {
    try {
        let data_menu = await model_menu.getAll();
        res.render('./menu/create', {
            nama_menu: '',
            keterangan: '',
            makan: '',
            minum: '',
            data_menu: data_menu
        });
    } catch (error) {
        console.error('Error saat mendapatkan data menu:', error);
        req.flash('error', 'Gagal memuat halaman pembuatan menu');
        res.redirect('/menu');
    }
});
// Route untuk menambahkan menu baru
router.post('/store', async function(req, res, next) {
    try {
        let { nama_menu, keterangan, makan, minum } = req.body;
        let data = {
            nama_menu,
            keterangan,
            makan,
            minum,
        };
        await model_menu.create(data);
        req.flash('success', 'Berhasil menyimpan data menu');
        res.redirect('/menu');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data menu');
        res.redirect('/menu/create');
    }
});

// Route untuk menampilkan form edit menu
router.get('/edit/:id', async function(req, res, next) {
  try {
      let id = req.params.id;
      let menu = await model_menu.getById(id);
      res.render('admin/editmenu', {
          menu: menu,
      });
  } catch (error) {
      console.error('Error:', error);
      req.flash('error', 'Gagal memuat halaman edit menu');
      res.redirect('admin/menu');
  }
});

// Route untuk menyimpan perubahan pada menu yang diedit
router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_menu, keterangan, makan, minum } = req.body;
        let data = {
            nama_menu,
            keterangan,
            makan,
            minum,
        };
        await model_menu.update(id, data);
        req.flash('success', 'Berhasil update data menu');
        res.redirect('/menu');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data menu');
        res.redirect('/menu');
    }
});

// Route untuk menghapus menu
router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        await model_menu.remove(id);
        req.flash('success', 'Berhasil menghapus data menu');
        res.redirect('/menu');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menghapus data menu');
        res.redirect('/menu');
    }
});

module.exports = router;
