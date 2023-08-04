const { validationResult } = require("express-validator");
const fs = require("fs");

const checksValidation = async (req, res, next) => {
  try {
    const err = validationResult(req);
    if (err.isEmpty()) {
      next();
    } else {
      if (req.files[0]) {
        const { path, filename } = req.files[0];
        fs.unlinkSync(path, filename);
      }
      res.status(501).json(err);
    }
  } catch (error) {
    res.status(501).json(error);
  }
};

module.exports = { checksValidation };
