'use strict';

var qs = require('querystring');
var myParser = require("body-parser");

/*!
 * Module dependencies.
 */

// Note: We can require users, demandas and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

const demandas = require('../app/controllers/demandas');
const usuarios = require('../app/controllers/usuarios');
const familias = require('../app/controllers/familias');
const clientes = require('../app/controllers/clientes');
const skus = require('../app/controllers/skus');
const demandasEstoques = require('../app/controllers/demandasEstoques');

/**
 * Route middlewares
 */

/**
 * Expose routes
 */

module.exports = function (app, passport) {

	/*
	 * Demanda routes
	 */

	app.use(myParser.json({extended : true}));

	//app.get('/demandas', demandas.index);

	app.post('/kam/login', usuarios.index);

	app.post('/kam/painelgerencial/familias/consultar', familias.consultar);
	app.post('/kam/painelgerencial/clientes/consultar', clientes.consultar);
	app.post('/kam/painelgerencial/skus/consultar', skus.consultar);
	app.post('/kam/painelgerencial/demandaestoque/consultar', demandasEstoques.consultar);

	/*app.post('/login', function (req, res) {

	 var data = {};
	 data = eval(data);
	 data = JSON.stringify(req.body);
	 data = JSON.parse(data);

	 var login = data.login;
	 var senha = data.senha;

	 res.header('X-XSS-Protection', 1);
	 res.header('Access-Control-Allow-Origin', "*");
	 res.status(200);
	 res.type('json')

	 res.json(
	 {
	 erro:     null,
	 mensagem: "Usuario " + data.login + " logado com sucesso!"
	 }
	 );

	 res.end();

	 });*/

	/**
	 * Error handling
	 */

	app.use(function (err, req, res, next) {

		// treat as 404
		if (err.message
			&& (~err.message.indexOf('not found')
			|| (~err.message.indexOf('Cast to ObjectId failed')))) {
			return next();
		}

		console.error(err.stack);

		if (err.stack.includes('ValidationError')) {
			res.status(422).render('422', {error: err.stack});
			return;
		}

		// error page
		res.status(500).render('500', {error: err.stack});

	});

	// assume 404 since no middleware responded
	app.use(function (req, res) {
		res.status(404).render('404', {
			url:   req.originalUrl,
			error: 'Not found'
		});
	});

};