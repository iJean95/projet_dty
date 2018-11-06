var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
var bluebird = require('bluebird')


// var userSchema = new mongoose.Schema({
//     id: String,
//     name: String
// })

const inviteSchema = new Schema({
    invitedID : {type : String, required : true},
    inviterID : {type : String, required : true}, 
    inviterName : {type : String, required : true}, 
});

//userSchema.plugin(mongoosePaginate)

inviteSchema.set('toJSON', { virtuals: true });

const invite = mongoose.model('Invites', inviteSchema)
module.exports = invite;
