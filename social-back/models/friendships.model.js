var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
var bluebird = require('bluebird')


// var userSchema = new mongoose.Schema({
//     id: String,
//     name: String
// })

const friendshipSchema = new Schema({
    invitedID : {type : String, required : true},
    inviterID : {type : String, required : true}, 
});

//userSchema.plugin(mongoosePaginate)

friendshipSchema.set('toJSON', { virtuals: true });

const friends = mongoose.model('Friends', friendshipSchema)
module.exports = friends;
