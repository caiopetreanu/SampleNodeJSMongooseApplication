'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const assign = require('object-assign');
const wrap = require('co-express');
const only = require('only');
const Demanda = mongoose.model('demandas');

/**
 * Load
 */

exports.load = wrap(function* (req, res, next, id) {

	req.demanda = yield Demanda.load(id);

	if (!req.demanda) {
		return next(new Error('Demanda not found'));
	}

	next();

});

/**
 * List
 */

exports.index = wrap(function* (req, res) {

	const limit = 30;

	const options = {
		criteria: '',
		limit: limit,
		server: {
			socketOptions: {
				keepAlive: 1,
				connectTimeoutMS: 30000
			}
		},
		replset: {
			socketOptions: {
				keepAlive: 1,
				connectTimeoutMS: 30000
			}
		}
	};

	const result = yield Demanda.list(options);

	res.setHeader('Cache-Control', 'public, max-age=31557600');

	res.render('demandas/index', {
		title: 'Demandas',
		demandas: result['demandas'],
		cds: result['cds'],
		distribuidores: result['distribuidores'],
		familias: result['familias'],
		skus: result['skus']
	});

});