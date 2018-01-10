var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    text            : {type: String, required: true},
}, {
    timestamps: true
});

mongoose.model('Notification', NotificationSchema);
var Notification = mongoose.model('Notification');

module.exports = {
    Notification : Notification,
    NotificationSchema : NotificationSchema
};
