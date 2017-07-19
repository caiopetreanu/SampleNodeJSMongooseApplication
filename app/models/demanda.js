'use strict';

var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DemandaSchema = new Schema({
	_id:               { type : String, default : '', trim : true },
	cd:                { type : String, default : '', trim : true },
	sku:               { type : String, default : '', trim : true, unique: true},
	pf:                { type : Number, default : 0,  trim : true },
	mes4:              { type : Number, default : 0,  trim : true },
	mes3:              { type : Number, default : 0,  trim : true },
	mes2:              { type : Number, default : 0,  trim : true },
	mes1:              { type : Number, default : 0,  trim : true },
	mes0:              { type : Number, default : 0,  trim : true },
	vmp:               { type : Number, default : 0,  trim : true },
	estoqueLivre:      { type : Number, default : 0,  trim : true },
	estoqueQualidade:  { type : Number, default : 0,  trim : true },
	pendenciaTransito: { type : Number, default : 0,  trim : true },
	pendenciaEntrega:  { type : Number, default : 0,  trim : true },
	estoqueTotal:      { type : Number, default : 0,  trim : true },
	estoqueSegregado:  { type : Number, default : 0,  trim : true },
	familia:           { type : String, default : '', trim : true },
	unidadeMedida:     { type : String, default : '', trim : true },
	distribuidor:      { type : String, default : '', trim : true },
	/*createdAt:         { type : Date,   default : Date.now }*/
});

/*
* Validations
*/

DemandaSchema.path('cd').required(true, 'CD da demanda não pode ser vazio');
DemandaSchema.path('sku').required(true, 'SKU da demanda não pode ser vazio');
DemandaSchema.path('pf').required(true, 'PF da demanda não pode ser vazio');
DemandaSchema.path('mes0').required(true, 'Mês atual da demanda não pode ser vazio');
DemandaSchema.path('vmp').required(true, 'VMP da demanda não pode ser vazio');
DemandaSchema.path('estoqueLivre').required(true, 'Estoque livre da demanda não pode ser vazio');
DemandaSchema.path('estoqueQualidade').required(true, 'Estoque qualidade da demanda não pode ser vazio');
DemandaSchema.path('pendenciaTransito').required(true, 'Pendência trânsito da demanda não pode ser vazio');
DemandaSchema.path('pendenciaEntrega').required(true, 'Pendência entrega da demanda não pode ser vazio');
DemandaSchema.path('estoqueTotal').required(true, 'Estoque total da demanda não pode ser vazio');
DemandaSchema.path('estoqueSegregado').required(true, 'Estoque segregado da demanda não pode ser vazio');
DemandaSchema.path('familia').required(true, 'Família da demanda não pode ser vazio');
DemandaSchema.path('unidadeMedida').required(true, 'Unidade de medida da demanda não pode ser vazio');
DemandaSchema.path('distribuidor').required(true, 'Distribuidor da demanda não pode ser vazio');

/**
 * Pre-remove hook
 */

DemandaSchema.pre('remove', function (next) {
	next();
});

/**
 * Methods
 */

DemandaSchema.methods = {
	uploadAndSave: function (images) {
		const err = this.validateSync();
		if (err && err.toString()) throw new Error(err.toString());
		return this.save();
	}
};

DemandaSchema.statics  = {

	load: function (_id) {
		return this.findOne({'_id' : _id})
			.populate('demanda', '_id sku pf mes4 mes3 mes2 mes1 mes0 vmp estoqueLivre estoqueQualidade pendenciaTransito pendenciaEntrega estoqueTotal estoqueSegregado familia unidadeMedida distribuidor')
			.exec();
	},

	list: function (options) {

		var result = {};

		var demandas = this.find({})
			.populate('demandas', '_id cd sku pf mes4 mes3 mes2 mes1 mes0 vmp estoqueLivre estoqueQualidade pendenciaTransito pendenciaEntrega estoqueTotal estoqueSegregado familia unidadeMedida distribuidor')
			.exec();

		var cds = this.find({})
			.distinct('cd')
			.populate('cds', 'cd')
			.exec();

		var distribuidores = this.find({})
			.distinct('distribuidor')
			.populate('distribuidores', 'distribuidor')
			.exec();

		var familias = this.find({})
			.distinct('familia')
			.populate('familias', 'familia')
			.exec();

		var skus = this.find({})
			.distinct('sku')
			.populate('skus', 'sku')
			.exec();

		result['demandas'] = demandas;
		result['cds'] = cds;
		result['distribuidores'] = distribuidores;
		result['familias'] = familias;
		result['skus'] = skus;

		return result;

	}
};

mongoose.model('demandas', DemandaSchema);