var express = require('express');
var users = require('./api/users.route');
var post = require('./api/post.route');
var upload = require('./api/uploadFile.route');

var router = express.Router()
const userService = require('../services/auth.service');
const inviteService = require('../services/invite.service');
const friendService = require('../services/friend.service');
const postService = require('../services/post.service');

console.log('hello from console');

router.use('/users', users);
router.use('/post', post);
router.use('/upload', upload);

router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/invite', getInvites);
router.post('/createInvite', createInvite);
router.get('/create', goCreate);

router.get('/invites/:id', getInvitesByID);

router.get('/invitesSent/:id', getInvitesISentByID );

router.delete('/invites/:id', removeInviteById);

router.get('/friends/:id', getFriends);
router.post('/friends', createFriendship);


module.exports = router;

function authenticate(req, res, next) {
    console.log('hello from console - trying to authenticate');
    userService.authentication(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

function register(req, res, next) {
    console.log('hello from console - trying to register');

    userService.createUser(req.body)
        .then(id => res.json({id : id}))
        .catch(err => next(err));
}


function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCurrent(req, res, next){
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));

}

function getInvites(req, res, next){
    console.log('hi there');

    inviteService.getInvites()
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));

}

function createInvite(req, res, next){
    console.log('createInvite');

    inviteService.createInvite(req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));

}

function getInvitesByID(req, res, next){
    console.log('get by ids');

    inviteService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));

}
function getInvitesISentByID(req, res, next){
    console.log('get by ids');

    inviteService.getInvitesISent(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));

}

function removeInviteById(req, res, next){

    inviteService.removeInvite(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));

}

function goCreate(req,res,next){
    console.log("hello");
}

function getFriends(req,res,next){
    console.log('getFriends function');

    friendService.getFriends(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));

}
function createFriendship(req,res,next){
    console.log('createFriendship function');

    friendService.createFriendship(req.body)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));

}


