const path = require('path');
const fs   = require('fs');
const { response } = require('express');
const { uploadServerFile } = require('../helpers/upload-server-file');
const { validateImgModel } = require('../helpers/db-validators');


const uploadFile = async (req, res = response) => {
  try {
    const pathFile = await uploadServerFile(req.files, undefined, 'imgs');
    res.json({
      message: `file upload successfully ${pathFile}`
    })
  } catch (error) {
    res.json({
      message: error
    })
  }
}

const updateImg = async (req, res = response) => {
  const { id, collection } = req.params;
  const model = await validateImgModel(id, collection);
  if ( model.img ) {
    const pathImg = path.join( __dirname, '../uploads', collection, model.img );
    if ( fs.existsSync( pathImg ) ) {
        fs.unlinkSync( pathImg );
    }
  }
  const nameFile = await uploadServerFile(req.files, undefined, collection);
  model[0].img = nameFile;
  await model[0].save();
  res.json( model );
}

module.exports = {
  uploadFile,
  updateImg
}