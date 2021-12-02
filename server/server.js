const express = require('express')
const path = require('path');
const app = express()
var cors = require('cors');
app.use(cors())
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // cb(null, file.fieldname + '-' + uniqueSuffix+'.'+/[^.]+$/.exec(file.originalname))
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage }).fields([
  { name: 'imageUrls', maxCount: 8 },
  { name: 'name', maxCount: 8 }
])
// app.use(upload);
app.post('/upload',upload, function (req, res) {
  console.log(req.files.imageUrls);
  console.log(req.body.imageUrls);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    console.log(req)
    return res.status(200).send(req.file)
  })
})
app.listen(8080, function() {
    console.log('App running on port 8080');
});