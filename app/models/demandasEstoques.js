'use strict';

var mongoose = require('mongoose');

/*var cachegoose = require('cachegoose');
cachegoose(mongoose, {
	engine: 'redis',
	port: 6379,
	host: 'localhost'
});*/

const Schema = mongoose.Schema;

const DemandasEstoquesSchema = new Schema({

	"_id":              {type: String, default: '', trim: true, unique: true},
	"nome-cliente":     {type: String, default: '', trim: true, unique: false},
	"codigo-cliente":   {type: String, default: '', trim: true, unique: false},
	"codigo-descricao": {type: String, default: '', trim: true, unique: false},
	"vendas-mes-3":     {type: Number, default: 0, trim: true, unique: false},
	"vendas-mes-2":     {type: Number, default: 0, trim: true, unique: false},
	"vendas-mes-1":     {type: Number, default: 0, trim: true, unique: false},
	"estoque-total":    {type: Number, default: 0, trim: true, unique: false}

});

/*
 * Validations
 */

DemandasEstoquesSchema.path('_id').required(true, '[id] não pode ser vazio');
DemandasEstoquesSchema.path('nome-cliente').required(true, '[nome-cliente] não pode ser vazio');
DemandasEstoquesSchema.path('codigo-cliente').required(true, '[codigo-cliente] não pode ser vazio');
DemandasEstoquesSchema.path('codigo-descricao').required(true, '[codigo-descricao] não pode ser vazio');
DemandasEstoquesSchema.path('vendas-mes-3').required(true, '[vendas-mes-3] não pode ser vazio');
DemandasEstoquesSchema.path('vendas-mes-2').required(true, '[vendas-mes-2] não pode ser vazio');
DemandasEstoquesSchema.path('vendas-mes-1').required(true, '[vendas-mes-1] não pode ser vazio');
DemandasEstoquesSchema.path('estoque-total').required(true, '[estoque-total] não pode ser vazio');

/**
 * Pre-remove hook
 */

DemandasEstoquesSchema.pre('remove', function (next) {
	next();
});

/**
 * Methods
 */

DemandasEstoquesSchema.methods = {
	uploadAndSave: function (images) {
		const err = this.validateSync();
		if (err && err.toString()) throw new Error(err.toString());
		return this.save();
	}
};

DemandasEstoquesSchema.statics = {

	load: function (_id) {
		return this.findOne({'_id': _id})
			.populate('demandaEstoque', '_id produto qt_cx_master estoque pendencia venda_mesatual qtvendmes1 qtvendmes2 qtvendmes3 precofab vlultent ean')
			.exec();
	},

	list: function (options) {

		var result = {};

		/*if (typeof options.criteria != "undefined" && typeof options.criteria.demandaEstoque != "undefined") {

			var demandaEstoque = options.criteria.demandaEstoque;
			var filter = "";

			for (var i = 0; i < demandaEstoque.length; i++) {

				if (i == 0) {
					filter = "{ $or : [ ";
				}

				filter += '{ "demandaEstoque" : "' + demandaEstoque[i] + '" }';

				if (i < demandaEstoque.length - 1) {
					filter += ",";
				}

				else {
					filter += "] }"
				}

			}

		}*/

		/*var demandasEstoques = this.find(options.criteria)
			.select('_id nome-cliente codigo-cliente codigo-descricao vendas-mes-3 vendas-mes-2 vendas-mes-1 estoque-total')
			.populate('demandasEstoques', '_id nome-cliente codigo-cliente codigo-descricao vendas-mes-3 vendas-mes-2 vendas-mes-1 estoque-total')
			.exec();*/

/*		var demandasEstoques = this.aggregate([
			{"$match": options.criteria},
			{"$limit": options.limit},
			{
				"$lookup": {
					"from":         "demanda_estoque_de_para",
					"localField":   "codigo-cliente",
					"foreignField": "codigo-cliente",
					"as":           "dePara1"
				}
			}
		])
			.exec();

		demandasEstoques = demandasEstoques.aggregate([
			{"$match": options.criteria},
			{"$limit": options.limit},
			{
				"$lookup": {
					"from":         "demanda_estoque_de_para",
					"localField":   "codigo-descricao",
					"foreignField": "codigo-descricao",
					"as":           "dePara2"
				}
			}
		])
			.exec();*/

		var demandasEstoques = this.aggregate([
			{"$limit": options.limit},
			{
				"$lookup": {
					"from":         "demanda_estoque_de_para",
					"localField":   "codigo-cliente",
					"foreignField": "codigo-cliente",
					"as":           "dePara1"
				}
			},
			{"$unwind": "$dePara1"},
			{
				"$lookup": {
					"from":         "demanda_estoque_de_para",
					"localField":   "codigo-descricao",
					"foreignField": "codigo-descricao",
					"as":           "dePara2"
				}
			},
			{"$unwind": "$dePara2"},
			{
				"$redact": {
					"$cond": [
						{"$eq": ["$dePara1.codigo-descricao", "$dePara2.codigo-descricao"]},
						"$$KEEP",
						"$$PRUNE"
					]
				}
			},
			{
				"$lookup": {
					"from":         "controle_lupin_ean",
					"localField":   "dePara2.ean",
					"foreignField": "ean",
					"as":           "dePara3"
				}
			},
			{"$unwind": "$dePara3"},
			{
				"$project": {
					"_id": 0,
					"nome-cliente": "$dePara1.nome-cliente",
					//"codigo-cliente": "$dePara2.codigo-cliente",
					//"codigo-descricao": "$dePara2.codigo-descricao",
					//"descricao-lupin": "$dePara2.descricao-lupin",
					"ean": "$dePara2.ean",
					"vendas-mes-3": "$vendas-mes-3",
					"vendas-mes-2": "$vendas-mes-2",
					"vendas-mes-1": "$vendas-mes-1",
					"estoque-total": "$estoque-total",
					//"produto": "$dePara3.produto",
					//"apresentacao": "$dePara3.apresentacao",
					//"status": "$dePara3.status",
					"unidade-negocio": "$dePara3.unidade-negocio",
					"familia": "$dePara3.familia",
					//"descricao": "$dePara3.descricao"
					"sku": "$dePara3.sku",
					"preco-venda": "$dePara3.preco-venda"
				}
			},
			{"$match": options.criteria}
			/*,{ "$group": {
				"_id": "$dePara1.nome-cliente",
				"count": { "$sum": 1 }
			}}*/

		])
			//.cache(5*60, "demandasEstoques")
			.exec();

		result['demandasEstoques'] = demandasEstoques;

		return result;

	}

};

mongoose.model('DemandasEstoques', DemandasEstoquesSchema, 'demanda_estoque');