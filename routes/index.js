
/*
 * GET home page.
 */

exports.index = function(req, res){
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  res.render('index', { title: 'The IP list', youip: ip });
};

/*
 * POST to ipsave.
 */

exports.ipsave = function(db) {
  return function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var comm = req.body.comment;
    var host = req.body.host;
    var savedip = {};
    savedip.ip = ip;
    if (comm != null && comm != "") {
      savedip.msg = comm;
    } else {
      savedip.msg = "- Empty comment -"
    }
    if (host != null) {
        savedip.host = host;
    }
    db.collection('iphits').insert(savedip, function(err, result){
      res.setHeader('Content-Type', 'application/json');
      res.send(
        (err === null) ? { status: 'saved', savedip: savedip} : { status: err }
      );
    });
    // res.end(JSON.stringify({  }));
  }
};

/*
 * GET saved ip listpage.
 *
 * The 1 will sort ascending (oldest to newest) and -1 will sort descending (newest to oldest.)
 * 
 * If you use the auto created _id field it has a date embedded in it ... so you can use that to order by ...
 * 
 * db.foo.find().sort({_id:1});
 * That will return back all your documents sorted from oldest to newest.
 * 
 * Natural Order
 * 
 * You can also use a Natural Order mentioned above ...
 * 
 * db.foo.find().sort({$natural:1});
 * Again, using 1 or -1 depending on the order you want.
 * 
 * Use .limit()
 * 
 * Lastly, it's good practice to add a limit when doing this sort of wide open query so you could do either ...
 * 
 * db.foo.find().sort({_id:1}).limit(50);
 * or
 * 
 * db.foo.find().sort({$natural:1}).limit(50);
 */
exports.iplist = function(db, limit) {
  return function(req, res) {
    db.collection('iphits').find().sort({$natural:-1}).limit(limit).toArray(function (err, items) {
      res.setHeader('Content-Type', 'application/json');
      res.json(items);
    })
  }
};

/*
 * GET saved ip listpage in JSONP format.
 */

exports.iplistp = function(db) {
  return function(req, res) {
    db.collection('iphits').find().toArray(function (err, items) {
      //res.setHeader('Content-Type', 'application/json');
      res.jsonp(items);
    })
  }
};

/*
 * DELETE to deleteallips.
 */

exports.deleteallips = function(db) {
  return function(req, res) {
    if (req.body.secpass == 'd3l3t3-em-4lL') {
      db.collection('iphits').remove(function(err, result) {
        res.send((result === 1) ? { msg: 'deleted' } : { msg:'error: ' + err });
      });
    } else {
      res.send({ msg: 'incorrect security information passed' });
    }
  }
};
