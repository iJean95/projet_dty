var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

const postService = require('../../services/post.service');
const friendService = require('../../services/friend.service');


// Map each API to the Controller FUnctions

router.get('/:id', getPostsByID);

router.post('/', createPost);
router.get('/gettl/:id', generateTimeline);

// router.put('/', UserController.updateUser)

// router.delete('/:id',UserController.removeUser)

// router.get('/user/:id', UserController.getUserById);

// Export the Router

module.exports = router;

function getPostsByID(req,res,next){
    console.log('getPosts function');

    postService.getPostsByID(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));

}
function createPost(req,res,next){
    console.log('createPost function');
    
    postService.createPost(req.body)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));

}
var _posts = [];

async function generateTimeline(req,res,next){
//     console.log('gen timeline function');
//     var allFriends =[]; 
//     console.log(req.params.id)
//     friendService.getFriends(req.params.id)
//    // .then(users => allFriends = users )
//     .then(user =>{
//         console.log("found friends");
//         var allPosts = [];

//         for (var i in user) {
//             console.log("hello there");
//             var friendID = 0;
//             if (req.params.id == user[i].inviterID)
//             {
//                 friendID = user[i].invitedID
//             }
//             else 
//             {
//                 friendID = user[i].inviterID
//             }
//             const list = async function(){
//                 var list_arr = await postService.getPostsByID(friendID);
//                 console.log(list_arr)
//                 postsCallBack(user.length,i,list_arr,res)
//                 return list_arr          
//             }
//             var liste = list()
            
//            // var liste = list()
//            // console.log(list)
//             allPosts.push(liste)
//             }
            
        
//        // res.json(allPosts)
//     })
//     .catch(err => next(err));
    
//     console.log("first try")

//     //res.json(allPosts);
    console.log('createPost function');
    
    postService.generateTimeline(req)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));

}

function postsCallBack(max, actual, posts,res){
    _posts.push(...posts)
    if (posts.length>0)
    {
        res.json(posts)

    }
}