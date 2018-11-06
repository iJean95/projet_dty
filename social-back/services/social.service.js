// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/users.model')

// Saving the context of this module inside the _the variable
_this = this

exports.getUserById = async function (id){
    userr =  await User.find({id : id});
    return userr[0];
}
// Async function to get the To do List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        // var user = await User.paginate(query, options)
        var user = await User.find().select('-hash');

        // Return the todod list that was retured by the mongoose promise
        return user;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Todos')

    }
}


// exports.getBySearch = async function (userName) {

//     const user = await User.find().select('-hash');

//     const user = await User.findOne({ username }).select('-hash');
//     return user;

// }

// exports.getById = async function (id) {
//     return await User.findById(id).select('-hash');
// }
