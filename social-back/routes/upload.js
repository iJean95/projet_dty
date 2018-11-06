const multer = require('multer');
const path   = require('path');

function save(req, res)
{
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

}

module.exports = save;
