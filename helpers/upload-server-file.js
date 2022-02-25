const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadServerFile = ( files, validExtensions = ['png','jpg','jpeg','gif'], folder = '' ) => {
    return new Promise( (resolve, reject) => {
        const { file_upload } = files;
        const splitName = file_upload.name.split('.');
        const extension = splitName[ splitName.length - 1 ];
        if ( !validExtensions.includes( extension ) ) {
            return reject(`this extiension ${ extension } is not permitted - ${ validExtensions }`);
        }
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folder, tempName );

        file_upload.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( tempName );
        });

    });

}

module.exports = {
  uploadServerFile
}