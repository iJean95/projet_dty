var Friends = require('../models/friendships.model')
var UserService = require('../services/social.service')

exports.getFriends = async function (id) {
    console.log('getFriends function called');

    const friends1 = await Friends.find({ invitedID: id });
    const friends2 = await Friends.find({inviterID : id});
    const friends = [...friends1, ...friends2];
    return friends;
}
// exports.getFriends = async function (id) {

//     console.log('getFriends function called');

//     var friends = [];
//     const friends1 = await Friends.find({ invitedID: id });
//     for (var i in friends1) {
//         newFriend = await UserService.getUserById(this.friendships[i].inviterID);
//         friends = [...friends, newFriend];
//         //console.log(this.friendships[i].username);
//     }

    
//     const friends2 = await Friends.find({inviterID : id});
//     for (var i in friends2) {
//         newFriend = await UserService.getUserById(this.friendships[i].invitedID);
//         friends = [...friends, newFriend];
//         //console.log(this.friendships[i].username);

//     }

    
//     return friends;
// }

exports.createFriendship = async function ({inviterID, invitedID}){
    const friendship = new Friends({ invitedID, inviterID });
    friendship.save();
    return friendship;

}