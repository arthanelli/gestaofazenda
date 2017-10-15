var analisaLeite = require('./analiseLeiteRotas');
var comprador = require('./compradorRotas');
var vacinas = require('./vacinasRotas');
var insumos = require('./insumosRotas');
var estoquevacinas = require('./insumosVacinasRotas');
var financas = require('./financeiroRotas');
var gado = require('./gadoRotas');
var usuarios = require('./usuariosRotas');
var index = require('./paginaInicialRotas');
var pedido = require('./pedidoRotas');
var transacoes = require('./transacoes');

module.exports = [].concat(analisaLeite, comprador, vacinas, insumos, estoquevacinas, financas, gado, usuarios, index, pedido, transacoes);