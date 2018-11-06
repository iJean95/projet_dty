var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;


// var userSchema = new mongoose.Schema({
//     id: String,
//     name: String
// })

const userSchema = new Schema({
    id: { type: String, unique: true },
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    file: {
        path: { type: String },
        caption: { type: String }
    }

});

//userSchema.plugin(mongoosePaginate)


userSchema.set('toJSON', { virtuals: true });

const user = mongoose.model('User', userSchema)
module.exports = user;
