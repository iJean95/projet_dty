var Invite = require('../models/invites.model')

exports.getInvites = async function () {
    console.log('getInvites function called');

    const invites = await Invite.find();
    return invites;
}

exports.getById = async function (id) {
    return await Invite.find({ invitedID: id });
}

exports.getInvitesISent = async function (id) {
    console.log('getInvitesISent function called');

    return await Invite.find({ inviterID: id });
}

exports.createInvite = async function ({ invitedID, inviterID, inviterName }) {
    console.log('createInvite function called');
    const invite = new Invite({ invitedID, inviterID, inviterName});
    invite.save();
    return invite;
}

exports.updateInvites = async function (userParam) {
    console.log('trying to update invitations');

}



exports.removeInvite = async function (id) {
    await Invite.findByIdAndRemove(id);
}
