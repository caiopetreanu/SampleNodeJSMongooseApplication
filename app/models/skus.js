'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SkusSchema = new Schema({
	_id:  {type: String, default: '', trim: true, unique: true},
	sku: {type: String, default: '', trim: true, unique: true}
});

/*
 * Validations
 */

SkusSchema.path('sku').required(true, 'SKU não ser vazio');

/**
 * Pre-remove hook
 */

SkusSchema.pre('remove', function (next) {
	next();
});

/**
 * Methods
 */

SkusSchema.methods = {
	uploadAndSave: function (images) {
		const err = this.validateSync();
		if (err && err.toString()) throw new Error(err.toString());
		return this.save();
	}
};

SkusSchema.statics = {

	load: function (_id) {
		return this.findOne({'_id': _id})
			.populate('usuario', '_id login senha')
			.exec();
	},

	list: function (options) {

		var result = {};

		/*if (typeof options.criteria != "undefined" && typeof options.criteria.apresentacao != "undefined") {

			var apresentacoes = options.criteria.apresentacao;
			var filter = "";

			for (var i = 0; i < apresentacoes.length; i++) {

				if (i == 0) {
					filter = "{ $or : [ ";
				}

				filter += '{ "apresentacao" : "' + apresentacoes[i] + '" }';

				if (i < apresentacoes.length - 1) {
					filter += ",";
				}

				else {
					filter += "] }"
				}

			}

		}*/

		var skus = this.find(options.criteria)
			.distinct('sku')
			.populate('sku', 'sku')
			.exec();

		result['sku'] = skus;

		return result;

	}
};

mongoose.model('Skus', SkusSchema, 'controle_lupin_ean');