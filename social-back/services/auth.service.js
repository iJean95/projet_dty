const bcrypt = require('bcryptjs');
//const config = require('config.json');
const jwt = require('jsonwebtoken');

var User = require('../models/users.model')
var Invite = require('../models/invites.model')
exports.authentication = async function ({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, 'jean');
        return {
            ...userWithoutHash,
            token
        };
    }
}

exports.createUser = async function (userParam) {
    params = userParam;
    params.file = null;
    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId();



    params.id = id;

    
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '"is already taken ';
    }
    console.log('register new user');
   
    const user = new User(userParam);
 
 
    console.log('try');

   // const invite = new Invite({id : userParam.id, inviteFrom : [] });

    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    

    await user.save();
    //await invite.save();
    return id;
}
   