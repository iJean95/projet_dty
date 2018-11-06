var Post = require('../models/post.model')
const friendService = require('./friend.service');
var Friends = require('../models/friendships.model')

exports.getPostsByID = async function (id) {
    console.log('getPostsByID function called');

    const posts = await Post.find({ posterID: id });
    //const posts = await Post.find();
    var reversed = posts.reverse(); 
    return reversed;
}


exports.createPost = async function ({ posterID, content, username }) {
    console.log("createPost function called");

    var mongoose = require('mongoose');
    var id = mongoose.Types.ObjectId();

    const post = new Post({ posterID : posterID, content: content, id : id, username : username });
    post.save();
    return post;
}


async function generator(req){
    console.log("")
    console.log('gen timeline function');
    var allFriends =[]; 
    userID = req.params.id;
    console.log(userID)




    const friends1 = await Friends.find({ invitedID: req.params.id });
    const friends2 = await Friends.find({inviterID : req.params.id});
    const friends = [...friends1, ...friends2];




    console.log("found friends");
    var allPosts = [];
    var ids = [];
    for (var i in friends) {
        console.log("hello there");
        var friendID = 0;
        if (userID == friends[i].inviterID)
        {
            friendID = friends[i].invitedID
        }
        else 
        {
            friendID = friends[i].inviterID
        }
        ids.push(friendID);
    }
    ids.push(req.params.id)
    for (var j in friendID)
    {
        const posts = await Post.find({ posterID: ids[j] })
        //console.log('id = '+ids[j])
        allPosts.push(...posts)
    }
    allPosts.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdDate) - new Date(a.createdDate);
      });
      
    console.log("///// seperator /////")
    console.log(allPosts)
    return allPosts;



            
    
    console.log("first try")


    
}
exports.generateTimeline = async function(req){
    const timeline = await generator(req);
    console.log("coup dur")
    console.log(timeline);
    return timeline;
}