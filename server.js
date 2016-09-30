/**
 * Main express server init module
 *
 * @author      Holly Springsteen
 * @version     1.0.0
 */

'use strict';

// Packages
const express = require('express');
const session = require('express-session');
const path = require('path');
const ejs = require('ejs-locals');
const cluster = require('cluster');
const os = require('os');
const fs = require('fs');
const compression = require('compression');
const http = require('http');
const colors = require('colors');
const uuid = require('uuid');

// Globals
global.app = express();
global.hotlinks = {};

// Constants
const numCPUs = 1 || process.env.WORKERS || os.cpus().length;
const port = process.env.PORT || 3000;
const hostname = process.env.HOST || '0.0.0.0';
// Times in ms
const oneHour = 3600000;
const oneDay = oneHour * 24;
const oneYear = oneDay * 365;

// Adding httpServer to Skeleton
const httpServer = http.createServer(app);

// Application settings
app.engine('ejs', ejs);

// Load views
fs.readdirSync("./views").forEach(function(file) {
  if(file.slice(-3) == "ejs"){
    file = file.split(".")[0];
    hotlinks[file] = '/'+file;
  }
});



cluster.on('exit', (worker, code, signal) => {
  console.warn(`(code: ${code})`.magenta + ` Worker ${worker.id} ${worker.state} | pid: ${worker.process.pid}`.red);

  // Replace the dead worker, we're not sentimental.
  cluster.fork();
});

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  console.log('\nWorker '.cyan, colors.magenta(cluster.worker.id), ' running '.cyan);

  app.set('view engine', 'ejs');
  app.set('views', `${__dirname}/views/`);

  // Static Files
  app.use('/views', express.static(`${__dirname}/views`, {
    maxAge: 1
  }));
  app.use('/public', express.static(`${__dirname}/public`, {
    maxAge: 1
  }));
  app.use(compression({
    chunkSize: 16384,
    level: 9
  }));

  // Express session
  const sessionId = uuid.v4().replace(/\-/g, '');
  app.use(session({
    secret: process.env.SESSION || sessionId,
    name: 'node-template',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    maxAge: oneYear,
    cookie: {
      secure: true
    }
  }));

  // Static Files
  app.use('/public', express.static(path.join(__dirname, '/api/public'), { maxAge: 1 }));

  // Load the controllers
  fs.readdirSync("./controllers").forEach((file) => {
    if (file.slice(-2) == "js") {
      require(`./controllers/${file}`)();
    }
  });

  // starts server on specified port
  httpServer.listen(port, () => {
    console.log(`\n------------------------------------------------------------\n|   Server Listening on port ${port}                          |\n------------------------------------------------------------`);
  });
}