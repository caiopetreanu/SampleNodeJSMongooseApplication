'use strict';

/**
 * Module dependencies.
 */

const express = require('express');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const multer = require('multer');
const swig = require('swig');

const flash = require('connect-flash');
const winston = require('winston');
const helpers = require('view-helpers');
const config = require('./config');
const pkg = require('../package.json');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app, passport) {

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  // Static files middleware
  app.use(express.static(config.root + '/public'));

  // Use winston on production
  let log = 'dev';
  if (env !== 'development') {
    log = {
      stream: {
        write: message => winston.info(message)
      }
    };
  }

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log));

  // Swig templating engine settings
  if (env === 'development' || env === 'test') {
    swig.setDefaults({
      cache: false
    });
  }

  // set views path, template engine and default layout
  app.engine('html', swig.renderFile);
  app.set('views', config.root + '\\app\\views');
  app.set('view engine', 'html');

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(multer().array('image', 1));
  app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // should be declared after session and flash
  app.use(helpers(pkg.name));

};
