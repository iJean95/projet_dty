
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;


// var userSchema = new mongoose.Schema({
//     id: String,
//     name: String
// })

const photoSchema = new Schema({

  path:  { type: String },

  caption: { type: String }
  });

//userSchema.plugin(mongoosePaginate)

photoSchema.set('toJSON', { virtuals: true });

const photo = mongoose.model('Photos', photoSchema)
module.exports = photo;
