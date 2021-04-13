import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

//cb - call back
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

//This will validate the type of image or extension
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extName = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  )
  const mimetype = filetypes.test(file.mimetype)
  if (extName && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

//will return back the path to front end
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
