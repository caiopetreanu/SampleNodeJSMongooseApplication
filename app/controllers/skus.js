'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const assign = require('object-assign');
const wrap = require('co-express');
const only = require('only');
const Sku = mongoose.model('Skus');

/**
 * Load
 */

exports.load = wrap(function* (req, res, next, id) {

	req.sku = yield Sku.load(id);

	if (!req.sku) {
		return next(new Error('Sku not found'));
	}

	next();

});

/**
 * List
 */

exports.consultar = wrap(function* (req, res) {

	const limit = 100;

	var stringifiedResponse = JSON.stringify(req.body);
	var parsedResponse = JSON.parse(stringifiedResponse);

	var login = parsedResponse.login;
	var filtro = typeof parsedResponse.filtro != "unidefined" ? parsedResponse.filtro : "";

	const options = {
		criteria: filtro,
		limit:    limit,
		server:   {
			socketOptions: {
				keepAlive:        1,
				connectTimeoutMS: 30000
			}
		},
		replset:  {
			socketOptions: {
				keepAlive:        1,
				connectTimeoutMS: 30000
			}
		}
	};

	const result = yield Sku.list(options);

	res.setHeader('Cache-Control', 'public, max-age=0');
	res.header('X-XSS-Protection', 1);
	res.header('Access-Control-Allow-Origin', "*");
	res.status(200);
	res.type('json')

	res.json(
		{
			erro: null,
			      result
		}
	);

	res.end();

});