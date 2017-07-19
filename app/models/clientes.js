'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientesSchema = new Schema({
	_id:            {type: String, default: '', trim: true, unique: true},
	"nome-cliente": {type: String, default: '', trim: true, unique: false}
});

/*
 * Validations
 */

ClientesSchema.path('nome-cliente').required(true, 'NOME-CLIENTE não pode ser vazio');

/**
 * Pre-remove hook
 */

ClientesSchema.pre('remove', function (next) {
	next();
});

/**
 * Methods
 */

ClientesSchema.methods = {
	uploadAndSave: function (images) {
		const err = this.validateSync();
		if (err && err.toString()) throw new Error(err.toString());
		return this.save();
	}
};

ClientesSchema.statics = {

	load: function (_id) {
		return this.findOne({'_id': _id})
			.populate('nome-cliente', 'nome-cliente')
			.exec();
	},

	list: function (options) {

		var result = {};

		var clientes = this.find(options.criteria)
			.distinct('nome-cliente')
			.populate('nome-cliente', 'nome-cliente')
			.exec();

		result['nome-cliente'] = clientes;

		return result;

	}
};

mongoose.model('Clientes', ClientesSchema, 'demanda_estoque');