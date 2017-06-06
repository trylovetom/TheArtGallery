var express = require('express');
var router = express.Router();

function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}

router.get('/create', function(req, res, next) {
  return res.render('customerCreate')
});

router.post('/', function(req, res, next) {
  var sql = {
    CustomerId: uid(32),
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Phone: req.body.Phone,
    Address: req.body.Address,
    AmountBoughtLastYear: req.body.AmountBoughtLastYear,
    AmountBoughtYearToDate: req.body.AmountBoughtYearToDate
  };

  req.db.query('INSERT INTO CUSTOMER SET ?', sql, function(err, rows) {
    if (err) {
      throw err
    }

    return res.redirect('/customer');
  });
});

router.get('/', function(req, res, next) {
  req.db.query('SELECT * FROM CUSTOMER ORDER BY FirstName ASC, LastName ASC', function(err, rows) {
    if (err) {
      throw err
    }

    return res.render('customer', { data: rows });
  })
});

router.get('/:id', function(req, res, next) {
  req.db.query('SELECT * FROM CUSTOMER WHERE CustomerId = ?', req.params.id, function(err, rows) {
    if (err) {
      throw err
    }

    return res.render('customerDetail', {
      data: rows[0]
    });
  })
});

router.put('/:id', function(req, res, next) {
  console.log('test')
  console.log(req.body)
  var sql = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Phone: req.body.Phone,
    Address: req.body.Address,
    AmountBoughtLastYear: req.body.AmountBoughtLastYear,
    AmountBoughtYearToDate: req.body.AmountBoughtYearToDate
  };

  req.db.query('UPDATE CUSTOMER SET ? WHERE CustomerId = ?', [sql, req.params.id], function(err, rows) {
    if (err) {
      throw err
    }

    return res.send({
      CustomerId: req.params.id
    });
  });
});

router.delete('/:id', function(req, res, next) {
  req.db.query('DELETE FROM CUSTOMER WHERE CustomerId = ?', req.params.id, function(err, rows) {
    if (err) {
      throw err
    }

    return res.send({
      msg: 'success'
    });
  })
})

module.exports = router;
