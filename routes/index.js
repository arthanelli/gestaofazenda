var analisaLeite = require('./analiseLeiteRotas');
var vacinas = require('./vacinasRotas');
var insumos = require('./insumosRotas');
var financas = require('./financeiroRotas');
var gado = require('./gadoRotas');

module.exports = [].concat(analisaLeite, vacinas, insumos, financas, gado);