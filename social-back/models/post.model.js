var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;


// var userSchema = new mongoose.Schema({
//     id: String,
//     name: String
// })

const postSchema = new Schema({
    id : {type : String, unique : true},
    posterID : {type : String, required: true}, 
    content : {type : String, required : true},
    username: {type : String},
    createdDate : {type : Date, default: Date.now},
    image: {type : String},

});

//userSchema.plugin(mongoosePaginate)

postSchema.set('toJSON', { virtuals: true });

const post = mongoose.model('Post', postSchema)
module.exports = post;
