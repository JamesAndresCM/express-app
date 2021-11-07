const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect( process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Db connect successfully');
  }catch(error) {
    throw new Error('failed to connect database', error);
  }
}

module.exports = {
  dbConnection
}
