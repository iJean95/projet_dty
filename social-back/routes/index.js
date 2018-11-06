var express = require('express');
var router = express.Router();
var upload = require('./api/uploadFile.route');
var Photo = require('../models/photo.model.js')
const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var find = require('find');

/* GET home page. */
router.post('/upload', (req, res) => {
    console.log("/////////////////hello there");
    var form = new IncomingForm();
    let readStream;

    form.parse(req);
    var jsonPath = path.join(__dirname, '..', 'public', 'files');
    var dir = path.join(__dirname, '..', 'public', 'files');
    form.on('fileBegin', function (name, file) {
        var extn = file.name.split(".").pop();
        var nam = file.name.split(".")[0];
        console.log(file.name);
        console.log(extn);

        file.path = jsonPath + '/' + nam + '/' + file.name;
        dir = dir + '/' + nam
        console.log(dir);

        shell.mkdir('-p', dir);
        console.log(dir);

    });

    console.log(jsonPath);




    form.on('file', (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path

        console.log('file', file.path);

        readStream = fs.createReadStream(file.path);
    });
    form.on('end', () => {
        res.json();
    });



    res.json({ 'message': 'File uploaded' });

});



router.get('/download/:id', (req, res) => {

    var jsonPath = path.join(__dirname, '..', 'public', 'files');
    var direc = jsonPath + '/' + req.params.id;
    console.log("direc = " + direc);
    if (fs.existsSync(direc)) {

        console.log("exists")
        find.file(direc, function (files) {


            var img = fs.readFileSync(files[0]);
            console.log("path = " + files[0].path);

            res.writeHead(200, { 'Content-Type': 'image' });
            res.end(img, 'binary');
            // res.json({ 'message': 'File uploaded' });


        })
    }
    else {
        console.log("doesnt exists")

        jsonPath = jsonPath + '/default.png'

        fs.readFile(jsonPath, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(data); // Send the file data to the browser.
        });


    }


});


//router.use('/upload/', upload);


// router.get('/', function (req, res, next) {
//   console.log("try11")

//     Photo.find({}, ['path','caption'], {sort:{ _id: -1} }, function(err, photos) {

//       console.log("try222")
//       //if(err) throw err;
//       res.render('index', { title: 'NodeJS file upload tutorial', msg:"", photolist : photos });
//       console.log("photolist : length = "+ photos);

//   });
//   //const photos = getById();
//   //res.render('index', { title: 'NodeJS file upload tutorial', msg: "", photolist: photos });
// });

module.exports = router;
