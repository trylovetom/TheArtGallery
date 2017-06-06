var express = require('express');
var router = express.Router();

function uid(len) {
  len = len || 7;
  return Math.random().toString(35).substr(2, len);
}

router.get('/create', function(req, res, next) {
  return res.render('workCreate');
})

router.post('/', function(req, res, next) {
  var sql = {
    WorkId: uid(32),
    Title: req.body.Title,
    Style: req.body.Style,
    Size: req.body.Size,
    Type: req.body.Type,
    AskingPrice: req.body.AskingPrice,
    Medium: req.body.Medium,
    DateOfShow: req.body.DateOfShow,
    ArtistId: req.body.ArtistId
  };

  req.db.query('SELECT * FROM ARTIST WHERE ArtistId = ?', req.body.ArtistId, function(err, rows) {
    if (err) {
      throw err
    }

    if (rows.length > 0) {
      req.db.query('INSERT INTO WORK SET ?', sql, function(err, rows) {
        if (err) {
          throw err
        }

        return res.redirect('/work');
      });
    } else {
      return res.render('error', {
        message: "ArtistIdNotFound"
      });
    }
  });
});

router.get('/', function(req, res, next) {
  req.db.query('SELECT WORK.*, ARTIST.FirstName, ARTIST.LastName FROM WORK, ARTIST WHERE WORK.ArtistId = ARTIST.ArtistId', function(err, rows) {
    if (err) {
      throw err
    }

    return res.render('work', { data: rows });
  })
});

router.get('/:id', function(req, res, next) {
  req.db.query('SELECT WORK.*, ARTIST.FirstName, ARTIST.LastName FROM WORK, ARTIST WHERE WorkId = ? AND WORK.ArtistId = ARTIST.ArtistId', req.params.id, function(err, rows) {
    if (err) {
      throw err
    }
    return res.render('workDetail', { data: rows[0] });
  })
});

router.put('/:id', function(req, res, next) {
  var sql = {
    Title: req.body.Title,
    Style: req.body.Style,
    Size: req.body.Size,
    Type: req.body.Type,
    AskingPrice: req.body.AskingPrice,
    Medium: req.body.Medium,
    DateOfShow: req.body.DateOfShow,
    ArtistId: req.body.ArtistId
  };

  req.db.query('SELECT * FROM ARTIST WHERE ArtistId = ?', req.body.ArtistId, function(err, rows) {
    if (err) {
      throw err
    }

    if (rows.length > 0) {
      req.db.query('UPDATE WORK SET ? WHERE WorkId = ?', [sql, req.params.id], function(err, rows) {
        if (err) {
          throw err
        }

        return res.send({
          WorkId: req.params.id
        });
      });
    } else {
      return res.send({
        msg: "ArtistIdNotFound"
      }).status(400);
    }
  });
});

router.delete('/:id', function(req, res, next) {
  req.db.query('DELETE FROM WORK WHERE WorkId = ?', req.params.id, function(err, rows) {
    if (err) {
      throw err
    }

    return res.send({
      msg: 'success'
    });
  })
})

module.exports = router;
