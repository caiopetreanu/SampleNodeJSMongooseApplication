'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FamiliasSchema = new Schema({
	_id:  {type: String, default: '', trim: true, unique: true},
	familia: {type: String, default: '', trim: true, unique: true}
});

/*
 * Validations
 */

FamiliasSchema.path('familia').required(true, 'FAMILIA não pode ser vazio');

/**
 * Pre-remove hook
 */

FamiliasSchema.pre('remove', function (next) {
	next();
});

/**
 * Methods
 */

FamiliasSchema.methods = {
	uploadAndSave: function (images) {
		const err = this.validateSync();
		if (err && err.toString()) throw new Error(err.toString());
		return this.save();
	}
};

FamiliasSchema.statics = {

	load: function (_id) {
		return this.findOne({'_id': _id})
			.populate('familia', '_id nome')
			.exec();
	},

	list: function (options) {

		var result = {};

		/*		if (typeof options.criteria != "undefined") {

		 var filter = "";

		 for (var i = 0; i < options.criteria; i++) {

		 if (i == 0) {
		 filter = "{ $or : [ ";
		 }

		 filter += '{ '+ criteria[i] + ' : "' + criteria[i] + '" }';

		 if(i < familias.length - 1) {
		 filter += ",";
		 }

		 else {
		 filter += "] }"
		 }

		 }
		 }*/

		var familias = this.find(options.criteria)
			.distinct('familia')
			.populate('familia', 'familia')
			.exec();

		result['familia'] = familias;

		return result;

	}
};

mongoose.model('Familias', FamiliasSchema, 'controle_lupin_ean');