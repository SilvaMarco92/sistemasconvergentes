var PromiseFtp = require('promise-ftp');
var fs = require('fs');
var ftp = new PromiseFtp();



// LISTAR ARQUIVOS DO SERVIDOR FTP
/*
ftp.connect({ host: '127.0.0.1', user: 'marco', password: 'abc123' })
    .then(function (serverMessage) {
        console.log('Server message: ' + serverMessage);
        return ftp.list('/');
    }).then(function (list) {
        console.log('Directory listing:');
        console.dir(list);
        return ftp.end();
    });
*/



// BAIXAR ARQUIVOS DO SERVIDOR FTP
/* 
ftp.connect({ host: '127.0.0.1', user: 'marco', password: 'abc123' })
    .then(function (serverMessage) {
        return ftp.get('public/downloadme.txt');
    }).then(function (stream) {
        return new Promise(function (resolve, reject) {
            stream.once('close', resolve);
            stream.once('error', reject);
            stream.pipe(fs.createWriteStream('tests/downloadedfile.txt'));
        });
    }).then(function () {
        return ftp.end();
    });
*/



// ENVIAR ARQUIVOS PARA O SERVIDOR FTP (pode sobrescrever)
/*
ftp.connect({ host: '127.0.0.1', user: 'marco', password: 'abc123' })
  .then(function (serverMessage) {
    return ftp.put('tests/uploadme.txt', 'public/uploadedfile.txt');
  }).then(function () {
    return ftp.end();
  });
*/



// DELETAR ARQUIVOS DO SERVIDOR FTP
/*
ftp.connect({ host: '127.0.0.1', user: 'marco', password: 'abc123' })
  .then(function (serverMessage) {
    return ftp.delete('public/deleteme.txt');
  }).then(function () {
    return ftp.end();
  });
*/