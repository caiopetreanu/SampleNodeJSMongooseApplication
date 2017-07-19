'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const assign = require('object-assign');
const wrap = require('co-express');
const only = require('only');
const DemandaEstoque = mongoose.model('DemandasEstoques');

var $ = require('jquery');
var redis = require('redis');
var client = redis.createClient(6379, "localhost");

client.on('connect', function() {
	console.log('Connected to redis');
});

/**
 * Load
 */

exports.load = wrap(function* (req, res, next, id) {

	req.apresentacao = yield Apresentacao.load(id);

	if (!req.apresentacao) {
		return next(new Error('Apresentacao not found'));
	}

	next();

});

/**
 * List
 */

exports.consultar = wrap(function* (req, res) {

	const limit = 10000;

	var stringifiedResponse = JSON.stringify(req.body);
	var parsedResponse = JSON.parse(stringifiedResponse);

	var login = parsedResponse.login;
	var filtro;

	if (typeof parsedResponse.filtro != 'undefined') {
		filtro = parsedResponse.filtro;
	}

	else {

		filtro = {};

		/* client.get('demandasEstoques', function (err, obj) {

			if (obj !== null) {

				const result = JSON.parse(obj);
				return response(res, result);

			}

		});*/

	}

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

	const result = yield DemandaEstoque.list(options);

	client.set('demandasEstoques', JSON.stringify(result), redis.print);
	client.expire('demandasEstoques', 5*60);
	return response(res, result);

});

var response = function(res, result) {

	if(!res.headersSent) {
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

		return res.end();
	}

}
