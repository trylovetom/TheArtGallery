var express = require('express');
var router = express.Router();

function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}

// router.get('/report', function(req, res, next) {
//   req.db.query('SELECT ARTIST.FirstName, ARTIST.LastName, WORK.*, SALE.SellingPrice, SALE.DateSold FROM ARTIST LEFT JOINT WORK LEFT JOINT SALE ON SALE.WorkId = WORK.WorkId ON WORK.ArtistId = ARTIST.ArtistId ORDER BY FirstName ASC, LastName ASC', function(err, rows) {
//     if (err) {
//       throw err
//     }
//     console.log(rows)
//     res.render('artistReport', { data: rows});
//   });
// })

router.get('/create', function(req, res, next) {
  res.render('artistCreate');
})

router.post('/', function(req, res, next) {
  var sql = {
    ArtistId: uid(32),
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Phone: req.body.Phone,
    Address: req.body.Address,
    SocialSecurityNumber: req.body.SocialSecurityNumber,
    UsualStyle: req.body.UsualStyle,
    UsualType: req.body.UsualType,
    UsualMedium: req.body.UsualMedium,
    SalesLastYear: req.body.SalesLastYear,
    SalesYearToDate: req.body.SalesYearToDate
  };

  req.db.query('INSERT INTO ARTIST SET ?', sql, function(err, rows) {
    if (err) {
      throw err
    }

    return res.redirect('/artist')
  });
});

router.get('/', function(req, res, next) {
  req.db.query('SELECT * FROM ARTIST', function(err, rows) {
    if (err) {
      throw err
    }

    res.render('artist', { data: rows });
  });
});

router.get('/:id', function(req, res, next) {
  req.db.query('SELECT * FROM ARTIST WHERE ArtistId = ?', req.params.id, function(err, rows) {
    if (err) {
      throw err
    }

    res.render('artistDetail', { data: rows[0] });
  });
});

router.put('/:id', function(req, res, next) {
  var sql = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Phone: req.body.Phone,
    Address: req.body.Address,
    SocialSecurityNumber: req.body.SocialSecurityNumber,
    UsualStyle: req.body.UsualStyle,
    UsualType: req.body.UsualType,
    UsualMedium: req.body.UsualMedium,
    SalesLastYear: req.body.SalesLastYear,
    SalesYearToDate: req.body.SalesYearToDate
  };

  req.db.query('UPDATE ARTIST SET ? WHERE ArtistId = ?', [sql, req.params.id], function(err, rows) {
    if (err) {
      throw err
    }

    return res.send({
      ArtistId: req.params.id
    });
  });
});

router.delete('/:id', function(req, res, next) {
  req.db.query('DELETE FROM ARTIST WHERE ArtistId = ?', req.params.id, function(err, rows) {
    if (err) {
      throw err
    }

    return res.send({
      msg: 'success'
    });
  });
});

module.exports = router;
