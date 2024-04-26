const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = `uploads`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: function (req, file, cb) {
        if (file) console.log(`File Up!!!`)
        let mainpath = Date.now()+ '_' + file.originalname.replace(/ /g, ' ').substring(file.originalname.length - 14);
        let name = file.fieldname;
        req.body[name] = mainpath;
        cb(null, mainpath)
    }
})

const upload = multer({ storage: storage })
module.exports = upload;