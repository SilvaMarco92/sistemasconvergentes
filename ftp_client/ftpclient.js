var ftpClient = require('ftp-client'),
config = {
    host: '127.0.0.1',
    port: 21,
    user: 'marco',
    password: 'abc123'
},
options = {
    logging: 'basic'
},
client = new ftpClient(config, options);
 
client.connect(function () {
 
    client.upload(['tests/**'], '/public', {
        overwrite: 'all'
    }, function (result) {
        console.log(result);
    });
 
    client.download('/public', '/', {
        overwrite: 'all'
    }, function (result) {
        console.log(result);
    });
 
});