var analisaLeite = require('./analiseLeiteRotas');
var vacinas = require('./vacinasRotas');
var insumos = require('./insumosRotas');
var financas = require('./financeiroRotas');
var gado = require('./gadoRotas');
var usuarios = require('./usuariosRotas');
var index = require('./paginaInicialRotas');

module.exports = [].concat(analisaLeite, vacinas, insumos, financas, gado, usuarios, index);