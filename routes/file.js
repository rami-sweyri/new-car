const { Router } = require('express');
const randomize = require('randomatic');
const checkPermissions = require('../middleware/checkPermissions');
const multer = require('multer');
const fileController = require('../controllers/file');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      randomize('0', 16) +
        '-' +
        new Date().toISOString().split(':').join('-') +
        '-' +
        randomize('a0', 8) +
        file.mimetype.split('image/').join('.')
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 125 },
  fileFilter: fileFilter,
});

router.post(
  '/',
  isAuthenticated,
  checkPermissions(['create File']),
  upload.single('file'),
  fileController.create
);
router.get(
  '/',
  // isAuthenticated,
  checkPermissions(['findFiles']),
  fileController.find
);
router.get(
  '/all',
  // isAuthenticated,
  checkPermissions(['findAllFiles']),
  fileController.findAll
);
router.get(
  '/:id',
  // isAuthenticated,
  checkPermissions(['findOneFile']),
  fileController.findOne
);
// router.patch('/:id',  isAuthenticated, checkPermissions(['updateFile']), fileController.update);
router.delete(
  '/:id',
  isAuthenticated,
  checkPermissions(['deleteFile']),
  fileController.delete
);

module.exports = router;
