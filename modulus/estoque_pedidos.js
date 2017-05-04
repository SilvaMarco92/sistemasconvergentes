var PromiseFtp = require('promise-ftp');
var fs = require('fs');
var ftp = new PromiseFtp();
var http = require('http');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var soap = require('soap-server');

const PEDIDOS = [
    null,
    {id: 1, cliente: 'Marco Silva', produtos: [{id:1, nome: 'Notebook Gamer Dell AlienWare 15x', preco: 4105.00},{id:2, nome: 'Mouse gamer Razor Deathadder', preco: 205.00}], valor: 4310.00},
    {id: 2, cliente: 'Joãozinho', produtos: [{id:3, nome: 'Notebook Gamer Dell AlienWare 19x', preco: 10000.00},{id:4, nome: 'Fone gamer SteelSeries Orca', preco: 455.00}], valor: 10455.00}
];


app.get('/api/pedidos', function (req, res) {
    res.send(JSON.stringify({ id: 1, cliente: 'Marco Silva', valor_total: 4999.00, icms: '12%', produtos: [{ id: 1, modelo: 'Titanium G1513 Iron', marca: 'Avell', preco: 4999.00, descricao: 'Notebook Gamer Avell Titanium G1513 Iron' }] }));
});

app.get('/api/estoque', function (req, res) {
    res.send([{ id: 1, nome: 'Placa mãe Asus', custo: 499.58, cod: 15, fornec_id: 1 }, { id: 2, nome: 'HD SSD Sansumg 500gb', custo: 378.50, cod: 19, fornec_id: 1 }, { id: 3, nome: 'Leitor/Gravador DVD Sansumg', custo: 159.00, cod: 25, fornec_id: 1 }]);
});

app.post('/api/nova-venda', function (req, res) {

    console.log(JSON.stringify(req.body));

    if (req.body.clienteid && req.body.produtoid && req.body.transacaoid && req.body.data && req.body.valor && req.body.nfes_id && req.body.status_id && req.body.forma_pagamento && req.body.filial_id && req.body.quantidade_produto) {

        ftp.connect({ host: '127.0.0.1', user: 'marco', password: 'abc123' })
            .then(function (serverMessage) {
                return ftp.put('nfes/' + req.body.nfes_id + '.png', 'public/NFE_' + req.body.nfes_id + '.png');
            }).then(function () {
                return ftp.end();
            });

        console.log('Nova venda efetivada. NFE ' + req.body.nfes_id);

        res.send({ status: 'OK', message: 'Compra efetivada.' });

        return;
    }

    res.sendStatus(400);

});

app.get('/teste', function(req, res){

    var db = database();
    db.connect();

    var keyValues = {

        keys : [
            'id'
        ],

        values : [
            1
        ]

    }

    var results = db.query('pedidos', keyValues);

});

/*
app.listen(80);

console.log('Digite "comprar" para comprar..');

var stdin = process.openStdin();

stdin.addListener("data", function (d) {

    if (d.toString().trim() == "comprar") {

        console.log("Efetuando compra...");
        var postData = JSON.stringify({ 'msg': 'Hello World!' });
        var options = {
            host: 'localhost',
            port: 80,
            path: '/api/nova-venda',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var post = http.request(options, function (resp) {
            resp.on('data', function (chunk) {
                console.log("RESPONSE FROM '/api/nova-venda' -> " + chunk)
            });
        }).on("error", function (e) {
            console.log("Got error: " + e.message);
        }).on("end", function () {
            console.log("Compra finalizada com sucesso.")
        });

        console.log(JSON.stringify({ id: 1, clienteid: 1, produtoid: 1, transacaoid: 1, valor: 4999.9, data: '2017-04-12', nfes_id: 1, status_id: 1, forma_pagamento: 'credito', filial_id: 1, quantidade_produto: 1 }));
        post.write(JSON.stringify({ id: 1, clienteid: 1, produtoid: 1, transacaoid: 1, valor: 4999.9, data: '2017-04-12', nfes_id: 1, status_id: 1, forma_pagamento: 'credito', filial_id: 1, quantidade_produto: 1 }));
        post.end();

    }
});
*/

function database() {

    var connection = {
        start: function(){
            var mysql = require('mysql');
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'me',
                password: 'secret',
                database: 'my_db'
            });

            connection.connect();

            connection.end();
        },
        query: function(table, keyValues){

            return connection.query("SELECT * FROM `books` WHERE `author` = ?'", ['David'], function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results[0].solution);
                return results;
            });

        }
    }

    return connection;
}


function MyTestService(){
}

MyTestService.prototype.test2 = function(myArg1, myArg2){
	return myArg1 + myArg2;
};

var soapServer = new soap.SoapServer();
var soapService = soapServer.addService('testService', new MyTestService());

var test2operation = soapService.getOperation('test2');
test2operation.setOutputType('number');
test2operation.setInputType('myArg1', {type: 'number'});
test2operation.setInputType('myArg2', {type: 'number'});

soapServer.listen(1337, '127.0.0.1');

/*
function PedidosService(){
    
    this.getPedido = function(id){
        return pedidos[id];
    };
    
}

PedidosService.prototype.getPedido = function(id){
    return id;
};

var soapServer = new soap.SoapServer();
var soapService = soapServer.addService('pedidosService', new PedidosService());

var getPedidoOperation = soapService.getOperation('getPedido');
getPedidoOperation.setOutputType('number');
getPedidoOperation.setInputType('id', {type: 'number'});

soapServer.listen(80, '127.0.0.1');
*/