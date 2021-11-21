const jwt = require('jsonwebtoken');

const createJWT = ( uid = '' ) => {
  return new Promise( (resolve, reject) => {
    const payload = { uid };
    jwt.sign(payload, process.env.JWTPRIVATEKEY, {
        expiresIn: '24h'
    }, (err, token) => {
        if (err) {
          console.log(err);
          reject('not create token')
        } else {
          resolve(token);
        }
    })
  })
}

module.exports = {
  createJWT
}
