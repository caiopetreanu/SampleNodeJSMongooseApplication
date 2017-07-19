'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const assign = require('object-assign');
const wrap = require('co-express');
const only = require('only');
const Usuario = mongoose.model('usuarios');

/**
 * Load
 */

exports.load = wrap(function* (req, res, next, id) {

	req.usuario = yield Usuario.load(id);

	if (!req.usuario) {
		return next(new Error('Usuario not found'));
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

	const result = yield Usuario.list(options);

	res.setHeader('Cache-Control', 'public, max-age=31557600');

	res.render('usuarios/index', {
		title: 'Usuarios',
		usuarios: result['usuarios'],
		usuario: result['usuario'],
	});

});