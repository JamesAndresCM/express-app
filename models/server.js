const express = require('express');
const cors = require('cors');
var morgan = require('morgan')
const { dbConnection } = require('../config/database');
const expressConfig = require('../config/express');

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = '/api/v1/users'
    this.connDb();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.json() );
    this.app.use( express.static('public'));
    this.app.use( morgan('combined') );
  }

  routes(){
    this.app.use(this.userPath, require('../routes/user'));
  }

  async connDb() {
    await dbConnection();
  }

  listen() {
    expressConfig(this.app);
    this.app.listen(this.port, () => {
      console.log('app listening on port:', this.port);
    })
  }
}

module.exports = Server;
