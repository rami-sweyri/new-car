const File = require('../models/File');
const { paginatedResults } = require('../utils/paginatedResults');
const { queryString } = require('../utils/queryString');
const { emptyFileValidate } = require('../validation/file');

exports.create = async (req, res) => {
  console.log({ req: req.file });

  if (typeof req.file === 'undefined' || !req.file)
    return res.status(400).send({
      message: 'Something went wrong',
      status: 'error',
    });
  const file = new File({
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    filename: req.file.filename,
    path: req.file.path.replace(/\\/g, '/'),
    createdBy: req.user._id,
  });
  try {
    await file.save();
    res.status(201).send({
      data: file,
      message: 'File successfully created',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};

exports.findAll = async (req, res) => {
  const { error } = emptyFileValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const files = await File.find(queryString(req));
    res.status(200).send({
      data: files,
      message: 'Files successfully fetched',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
exports.find = async (req, res) => {
  const { error } = emptyFileValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const paginationQuery = await paginatedResults(req, File);
    const files = await File.find(queryString(req))
      .limit(paginationQuery.pagination.limit)
      .skip(paginationQuery.startIndex)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).send({
      pagination: { ...paginationQuery.pagination, count: files.length },

      data: files,
      message: 'Files successfully fetched',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};

exports.findOne = async (req, res) => {
  const { error } = emptyFileValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });
  try {
    const file = await File.findById(req.params.id);
    if (!file)
      return res.status(404).send({
        message: "File doesn't exist",
        status: 'error',
      });
    res.status(200).send({
      data: file,
      message: 'File successfully fetched',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};

// exports.update = async (req, res) => {
//   const { error } = updateFileValidate(req.body);
//   if (error)
//     return res.status(400).send({
//       message: error.details[0].message,
//       status: 'error',
//     });
//   try {
//     const file = await File.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//       }
//     );
//     if (!file) {
//       return res.status(404).send({
//         message: "File doesn't exist",
//         status: 'error',
//       });
//     }
//     res.status(200).send({
//       data: file,
//       message: 'File successfully updated',
//       status: 'success',
//     });
//   } catch (error) {
//     res.status(error.status || 500).send({
//       message: 'Something went wrong. please try again later',
//       status: 'error',
//     });
//   }
// };

exports.delete = async (req, res) => {
  const { error } = emptyFileValidate(req.body);
  if (error)
    return res.status(400).send({
      message: error.details[0].message,
      status: 'error',
    });

  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) {
      return res.status(404).send({
        message: "File doesn't exist",
        status: 'error',
      });
    }
    res.status(200).send({
      data: file,
      message: 'File successfully deleted',
      status: 'success',
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: 'Something went wrong. please try again later',
      status: 'error',
    });
  }
};
