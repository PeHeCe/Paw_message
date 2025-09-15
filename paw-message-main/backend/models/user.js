const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    gender: {type: String, required: true},
    accountType: {type: String, required: true},
    notification: {type: Boolean, required: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
})

module.exports = mongoose.model('User', schema)