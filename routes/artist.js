var express = require('express');
var router = express.Router();

function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}

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

    return res.send({
      ArtistId: sql.ArtistId
    });
  });
});

router.get('/', function(req, res, next) {
  req.db.query('SELECT * FROM ARTIST', function(err, rows) {
    if (err) {
      throw err
    }

    return res.send({
      data: rows
    });
  });
});

router.get('/:id', function(req, res, next) {
  req.db.query('SELECT * FROM ARTIST WHERE ArtistId = ?', req.params.id, function(err, rows) {
    if (err) {
      throw err
    }

    return res.send({
      data: rows
    });
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
