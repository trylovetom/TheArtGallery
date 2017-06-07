var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.db.query('SELECT CUSTOMER.FirstName AS CustomerFirstName, CUSTOMER.LastName AS CustomerLastName, CUSTOMER.Address, ARTIST.FirstName AS ArtistFirstName, ARTIST.LastName AS ArtistLastName, WORK.Title, WORK.Type, WORK.Medium, WORK.Style, WORK.Size, SALE.Salesperson, SALE.SellingPrice, SALE.SellingPrice * 0.1 AS AmountRemitted FROM SALE, CUSTOMER, WORK, ARTIST WHERE SALE.WorkId = WORK.WorkId AND ARTIST.ArtistId = WORK.ArtistId AND SALE.CustomerID = CUSTOMER.CustomerId', function(err, rows) {
    if (err) {
      throw err
    }
    console.log(rows)
    res.render('payment', { data: rows })
  });
});

module.exports = router;
