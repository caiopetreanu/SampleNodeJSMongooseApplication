'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
	_id:    { type : String, default : '', trim : true, unique: true },
	login:  { type : String, default : '', trim : true, unique: true },
	senha:  { type : String, default : '', trim : true },
});

/*
* Validations
*/

UsuarioSchema.path('login').required(true, 'LOGIN do usuário não pode ser vazio');
UsuarioSchema.path('senha').required(true, 'SENHA do usuário não pode ser vazio');

/**
 * Pre-remove hook
 */

UsuarioSchema.pre('remove', function (next) {
	next();
});

/**
 * Methods
 */

UsuarioSchema.methods = {
	uploadAndSave: function (images) {
		const err = this.validateSync();
		if (err && err.toString()) throw new Error(err.toString());
		return this.save();
	}
};

UsuarioSchema.statics  = {

	load: function (_id) {
		return this.findOne({'_id' : _id})
			.populate('usuario', '_id login senha')
			.exec();
	},

	list: function (options) {

		var result = {};

		var usuarios = this.find({})
			.populate('usuarios', '_id login senha')
			.exec();

		var usuario = this.find({})
			.distinct('login')
			.populate('usuarios', '_id login senha')
			.exec();

		result['usuario'] = usuario;
		result['usuarios'] = usuarios;

		return result;

	}
};

mongoose.model('usuarios', UsuarioSchema);