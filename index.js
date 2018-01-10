var restify = require('restify');
var bodyParser = require('restify-plugins').bodyParser;
var server = restify.createServer();
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv()
var packageJson = require('./package.json');

server.use(bodyParser());

server.get('/', function (req,res,next) {
    var apiInfo = {
        name : packageJson.name,
        version : packageJson.version
    };
    return res.send(apiInfo);
})

server.listen(appEnv.port,appEnv.bind, function () {
    console.log('server listening at %s on port %s', appEnv.bind, appEnv.port);
});
