var restify = require('restify');
var bodyParser = require('restify-plugins').bodyParser;
var server = restify.createServer();
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv()
var packageJson = require('./package.json');
var mongoose = require('mongoose');
var Notification = require('./notification/model.js').Notification;
var corsMiddleware = require('restify-cors-middleware')
var amqp = require('amqplib');

function sendJsonMessage (message) {
    return amqp.connect(appEnv.getServiceURL('notification-mq'))
        .then(function (conn) {
            return conn.createChannel()
                .then(function (ch) {
                    return ch.assertQueue("notifications", {durable: false})
                        .then(function () {
                            ch.sendToQueue("notifications", Buffer.from(JSON.stringify(message)));
                            return ch.close();
                        })
                        .catch(console.warn);
                })
                .finally(function () {
                    return conn.close();
                })

        })
        .catch(console.warn)
}

var cors = corsMiddleware({
  origins: ['*'],
  allowHeaders: [],
  exposeHeaders: []
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(bodyParser());

server.get('/', function (req,res,next) {
    var apiInfo = {
        name : packageJson.name,
        version : packageJson.version
    };
    return res.send(apiInfo);
})

server.get('/notification', function (req,res,next) {
    Notification
        .find()
        .exec()
        .then(function (notifications) {
            return res.send(notifications);
        })
})

server.post('/notification', function (req,res,next) {
    var notification = new Notification();
    notification.text = req.body.text;
    notification.save()
        .then(function (savedNotification) {
            sendJsonMessage(savedNotification);
            return res.send(204,savedNotification);
        })
})

server.del('/notification/:notificationid', function (req,res,next) {
    Notification.findByIdAndRemove(req.params.notificationid, function (removedNotification) {
        return res.send(204);
    })
})

if (process.env.LOADER_IO_KEY) {
    server.get('/' + process.env.LOADER_IO_KEY, function (req,res,next) {
        res.setHeader('content-type', 'text/plain');
        return res.send(process.env.LOADER_IO_KEY);
    })
}

mongoose.connect(appEnv.getServiceURL('notification-db'));
server.listen(appEnv.port,appEnv.bind, function () {
    console.log('server listening at %s on port %s', appEnv.bind, appEnv.port);
});
