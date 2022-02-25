const { response } = require("express")
const validateFileUpload = (req, res = response, next ) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file_upload ) {
        return res.status(400).json({
          message: 'No files were uploaded.'
        });
    }
    next();
}

module.exports = {
    validateFileUpload
}