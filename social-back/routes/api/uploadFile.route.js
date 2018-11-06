var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Photo = require('../../models/photo.model.js')
var upload = require('../upload');
/* GET home page. */

router.post('/', function (req, res) {
  console.log("hello from /routes/api/uploadFile router.post")
  console.log(req)
  console.log("hello from /routes/api/uploadFile router.post")

  upload(req, res, (error) => {
    if (error) {
      res.redirect('/?msg=3');
    } else {
      if (req.file == undefined) {

        res.redirect('/?msg=2');

      } else {

        /**
         * Create new record in mongoDB
         */
        var fullPath = "files/" + req.file.filename;
        console.log(fullPath);

        var document = {
          path: fullPath,
          caption: req.body.caption
        };

        var photo = new Photo(document);
        photo.save(function (error) {
          if (error) {
            throw error;
          }
          res.redirect('/?msg=1');
        });
      }
    }
  });
});

router.get('/', function (req, res, next) {
  console.log("try")

  Photo.find({}, ['path', 'caption'], { sort: { _id: -1 } }, function (err, photos) {

    console.log("try2")
    //if(err) throw err;
    res.render('index', { title: 'NodeJS file upload tutorial', msg: req.query.msg, photolist: photos });
    console.log("photolist : length = " + photos);

  });
  //const photos = getById();
  //res.render('index', { title: 'NodeJS file upload tutorial', msg: "", photolist: photos });
});
async function getById() {
  await Photo.find({}, ['path', 'caption'], { sort: { _id: -1 } }, function (err, photos) {
    console.log("fetching photos")
    console.log(photos.length);
    return photos
  });
}
module.exports = router;
