var PromiseFtp = require('promise-ftp');
var fs = require('fs');
var ftp = new PromiseFtp();
var http = require('http');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.get('/api/pedidos', function (req, res) {
  res.send(JSON.stringify({id: 1, cliente: 'Marco Silva', valor_total: 4999.00, icms: '12%', produtos: [{id:1, modelo: 'Titanium G1513 Iron', marca: 'Avell', preco: 4999.00, descricao: 'Notebook Gamer Avell Titanium G1513 Iron'}]}));
});

app.get('/api/estoque', function (req, res) {
  res.send([{id: 1, nome: 'Placa mãe Asus', custo: 499.58, cod: 15, fornec_id: 1},{id: 2, nome: 'HD SSD Sansumg 500gb', custo: 378.50, cod: 19, fornec_id: 1},{id: 3, nome: 'Leitor/Gravador DVD Sansumg', custo: 159.00, cod: 25, fornec_id: 1}]);
});

app.post('/api/nova-venda', function(req, res){
    
    console.log(JSON.stringify(req.body));

    if(req.body.clienteid && req.body.produtoid && req.body.transacaoid && req.body.data && req.body.valor && req.body.nfes_id && req.body.status_id && req.body.forma_pagamento && req.body.filial_id && req.body.quantidade_produto){
        
        ftp.connect({ host: '127.0.0.1', user: 'marco', password: 'abc123' })
        .then(function (serverMessage) {
            return ftp.put('nfes/'+req.body.nfes_id+'.png', 'public/NFE_'+req.body.nfes_id+'.png');
        }).then(function () {
            return ftp.end();
        });

        console.log('Nova venda efetivada. NFE '+req.body.nfes_id);

        res.send({status: 'OK', message: 'Compra efetivada.'});

        return;
    }

    res.sendStatus(400);

});

app.listen(80);

console.log('Digite "comprar" para comprar..');

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    /*console.log("you entered: [" + 
        d.toString().trim() + "]");
    */

    /*console.log("you entered: [" + 
        d.toString().trim() + "]");*/


    if(d.toString().trim() == "comprar"){

        console.log("Efetuando compra...");
        var postData = JSON.stringify({'msg': 'Hello World!'});
        var options = {
            host: 'localhost',
            port: 80,
            path: '/api/nova-venda',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var post = http.request(options, function(resp){
            resp.on('data', function(chunk){
                console.log("RESPONSE FROM '/api/nova-venda' -> "+chunk)
            });
        }).on("error", function(e){
            console.log("Got error: " + e.message);
        }).on("end", function(){
            console.log("Compra finalizada com sucesso.")
        });
        
        console.log(JSON.stringify({id:1,clienteid:1,produtoid: 1,transacaoid: 1,valor: 4999.9, data: '2017-04-12', nfes_id: 1, status_id: 1, forma_pagamento: 'credito', filial_id: 1, quantidade_produto: 1}));        
        post.write(JSON.stringify({id:1,clienteid:1,produtoid: 1,transacaoid: 1,valor: 4999.9, data: '2017-04-12', nfes_id: 1, status_id: 1, forma_pagamento: 'credito', filial_id: 1, quantidade_produto: 1}));
        post.end();

    }
  });

