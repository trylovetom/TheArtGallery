var express = require('express');
var router = express.Router();

function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}

router.post('/', function(req, res, next) {
  var sql = {
    DateSold: req.body.DateSold,
    Salesperson: req.body.Salesperson,
    SellingPrice: req.body.SellingPrice,
    SaleId: uid(32),
    CustomerId: req.body.CustomerId,
    WorkId: req.body.WorkId
  };

  req.db.query('SELECT * FROM CUSTOMER WHERE CustomerId = ?', req.body.CustomerId, function(err, rows) {
    if (err) {
      throw err
    }
    if (rows.length > 0) {
      req.db.query('SELECT * FROM WORK WHERE WorkId = ?', req.body.WorkId, function(err, rows) {
        if (rows.length > 0) {
          req.db.query('INSERT INTO SALE SET ?', sql, function(err, rows) {
            if (err) {
              throw err
            }

            return res.send({
              SaleId: sql.SaleId
            });
          });
        } else {
          return res.send({
            msg: "WorkIdNotFound"
          }).status(400)
        }
      });
    } else {
      return res.send({
        msg: "CustomerIdNotFound"
      }).status(400)
    }
  });
});

router.get('/', function(req, res, next) {
  req.db.query('SELECT * FROM SALE', function(err, rows) {
    if (err) {
      throw err
    }

    return res.render('sale', { data: rows })
  })
});

router.get('/:id', function(req, res, next) {
  req.db.query('SELECT * FROM SALE WHERE SaleId = ?', req.params.id, function(err, rows) {
    if (err) {
      throw err
    }

    return res.send({
      data: rows
    });
  })
});

router.put('/:id', function(req, res, next) {
  var sql = {
    DateSold: req.body.DateSold,
    Salesperson: req.body.Salesperson,
    SellingPrice: req.body.SellingPrice,
    CustomerId: req.body.CustomerId,
    WorkId: req.body.WorkId
  };

  console.log('test')
  req.db.query('SELECT * FROM CUSTOMER WHERE CustomerId = ?', req.body.CustomerId, function(err, rows) {
    if (err) {
      throw err
    }
    console.log('success')
    if (rows.length > 0) {
      req.db.query('SELECT * FROM WORK WHERE WorkId = ?', req.body.WorkId, function(err, rows) {
        if (rows.length > 0) {
          req.db.query('INSERT INTO SALE SET ?', sql, function(err, rows) {
            if (err) {
              throw err
            }

            return res.send({
              SaleId: req.params.id
            });
          });
        } else {
          return res.send({
            msg: "WorkIdNotFound"
          })
        }
      });
    } else {
      return res.send({
        msg: "CustomerIdNotFound"
      })
    }
  });
});

router.delete('/:id', function(req, res, next) {
  req.db.query('DELETE FROM SALE WHERE SaleId = ?', req.params.id, function(err, rows) {
    if (err) {
      throw err
    }

    return res.send({
      msg: 'success'
    });
  })
})

module.exports = router;
