const express = require('express');
const cors = require('cors');
var morgan = require('morgan')
const { dbConnection } = require('../config/database');
const expressConfig = require('../config/express');
const routes = require('../routes');
const fileUpload = require('express-fileupload');

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      users: '/api/v1/users',
      categories: '/api/v1/categories',
      products: '/api/v1/products',
      search:   '/api/v1/search',
      auth: '/login',
      upload: '/api/v1/upload'
    }
    this.connDb();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use( cors() );
    this.app.use( express.json() );
    this.app.use( express.static('public'));
    this.app.use( morgan('combined') );
    this.app.use( fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/'
    }));
  }

  routes(){
    this.app.use(this.paths.auth, routes.authRouter);
    this.app.use(this.paths.users, routes.usersRouter);
    this.app.use(this.paths.categories, routes.categoriesRouter);
    this.app.use(this.paths.products, routes.productsRouter);
    this.app.use(this.paths.search, routes.searchRouter);
    this.app.use(this.paths.upload, routes.uploadRoutes);
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
