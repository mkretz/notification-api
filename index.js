var restify = require('restify');
var bodyParser = require('restify-plugins').bodyParser;
var server = restify.createServer();
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv()
var packageJson = require('./package.json');
var mongoose = require('mongoose');
var Notification = require('./notification/model.js').Notification;

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
            return res.send(204,savedNotification);
        })
})

server.del('/notification/:notificationid', function (req,res,next) {
    Notification.findByIdAndRemove(req.params.notificationid, function (removedNotification) {
        return res.send(204);
    })
})

mongoose.connect(appEnv.getServiceURL('notification-db'));
server.listen(appEnv.port,appEnv.bind, function () {
    console.log('server listening at %s on port %s', appEnv.bind, appEnv.port);
});
