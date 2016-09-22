var express = require('express');
var router = express.Router();
var data = require('../mock/data.json');
var Site = require('../models/site');
//var sitesEntry = require('../models/sitesEntry');

var dataLists = Object.keys(data).map(function(value){
	return data[value]
});

// GET home page. */
router.get('/', function(req, res, next) {	
  	res.render('index', { 
  	});
});

// GET home page with mock database. */
router.get('/mock', function(req, res, next) {  
    res.render('mock', { 
      data: dataLists, 
      dataJSON: data
    });
});

//JSON DATA
router.get('/data', function(req, res) {
	if (req.query.raw) {
		res.json(data);
	} else {
		res.json(dataLists);
	}
});

router.get('/add', function(req, res, next) {  
    res.render('create', { 
    });
});

router.get('/edit', function(req, res, next) {  
    res.render('edit', { 
    });
});

/*-------------------------------------
  API
-------------------------------------*/

//Return From Mongo
router.get('/api/sites', function(req, res) {
  Site.find({}, function(err, sites) {
    if (err) {
      return next(err);
    } else {
      return res.json({sites: sites});
    }
  });
});

//Add A Site 
router.post('/api/sites', function(req, res, next) {
    //create object with form input
    var siteData = {
      ip: req.body.ip, 
      domain: req.body.domain, 
      wp: req.body.wp, 
      host_name: req.body.host_name, 
      hosted: req.body.hosted
    };

    // use schema's 'create' method to insert doc into mongo
    Site.create(siteData, function(err, site) {
      if (err) {
        next(err);
      } else {
        return res.json(site);
      }
    });
});

//Edit A Site
router.put('/api/sites/:site_id', function(req, res) {

  var updatedSite = {};

  if(req.body.ip) updatedSite.ip = req.body.ip;
  if(req.body.domain) updatedSite.domain = req.body.domain;
  if(req.body.wp) updatedSite.wp = req.body.wp;
  if(req.body.host_name) updatedSite.host_name = req.body.host_name;
  if(req.body.hosted != undefined) updatedSite.hosted = req.body.hosted;

  var setObj = { $set: updatedSite };

  Site.findOneAndUpdate({_id: req.params.site_id}, setObj, {upsert: true, new: true }, function(err, site) {
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(site);
    res.json(site);

  });
});

// Remove A Site
router.delete('/api/sites/:site_id', function(req, res, next) {
  Site.remove({
    _id: req.params.site_id
  }, function(err, site) {
    if (err)
      res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;
