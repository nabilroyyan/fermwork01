var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    let rows = await m;
    console.log(rows);
    res.render("/kategori", {
      data: rows,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat data boking");
    res.redirect("/nota");
  }
});

router.get("/invois/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let menu = await model_boking.getById(id);
    function formatDate(dateString) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1); // Adjust for timezone offset
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    res.render("nota/invois", {
      menu: menu,
      formatDate,
    });
  } catch (error) {
    console.error("Error:", error);
    req.flash("error", "Gagal memuat halaman edit menu");
    res.redirect("nota/");
  }
});
module.exports = router;
