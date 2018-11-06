import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Invite } from '../invitation';
import { Friendship } from '../friendship';
import { Router } from '@angular/router';

import { SocialUserService } from '../services/social-user.service';
import { InviteService } from '../services/invite.service';
import { first } from 'rxjs/operators';
import { FriendService } from '../services/friend.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})

export class InviteComponent implements OnInit {

  users: User[];
  usersInvited: User[];

  invites: Invite[];
  friendships: Friendship[];
  friends: String[];
  dude: User;
  inviterUsers: String[];
  invitesSent: Invite[];
  user = '';
  currentUser;

  constructor(private userService: SocialUserService,
    private inviteService: InviteService,
    private router: Router,
    private friendService: FriendService
  ) { }

  ngOnInit() {
    this.friends = [];
    this.inviterUsers = [];
    this.invites = [];
    this.usersInvited = [];
    this.update();
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.user = this.currentUser.username;
    }
    else {
      this.user = '';
    }
  


  }
  update(){
    this.getInvitesISent();
    this.getUsers();
    this.getInvites();
    this.getFriends();

  }

  getFriendName(): void {
    console.log('getfriendNames');
    for (var i in this.friendships) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log('hello ' + i)
      if (currentUser.id == this.friendships[i].invitedID) {
        this.userService.getUserById(this.friendships[i].inviterID).pipe(first()).subscribe(friend => {
          console.log(friend.username);
          this.dude = friend;

          this.friends.push(this.dude.username);
            
          //permet de virer les amis de la liste des gens à inviter
          this.users = this.users.filter(person=>person.id != this.dude.id )
        });
      }
      else {
        this.userService.getUserById(this.friendships[i].invitedID).pipe(first()).subscribe(friend => {
          console.log(friend.username);
          this.dude = friend;

          this.friends.push(this.dude.username);

          
          //permet de virer les amis de la liste des gens à inviter
          this.users = this.users.filter(person=>person.id != this.dude.id )


        });
      }
    }


  }
  getFriends(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.friendService.getFriendsById(currentUser.id).pipe(first()).subscribe(friends => {
      this.friendships = friends;
      this.getFriendName();

    });
    //this.friendships[0].friendID1;



  }
  
  isPartOf(users : User[] , person : User ): User[] {
    for (var u in users)
    {
      if(person.id == users[u].id){
        users.slice(1);
        return users;
      }
    } 
    return users;
  }

  getUserById(): void {
    this.userService
  }

  getUsers(): void {
    this.userService.getUsers().pipe(first()).subscribe(users => {
      this.users = users;
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.users.length);

      this.users = this.users.filter(person=>person.id != currentUser.id )
      console.log(this.users);
      //this.usersInvited = this.users;
      var people = [];
      var peopleInvited = [];

      for (var i in this.users)
      {
        console.log("users : "+ this.users[i].username +" number + " + i);
        //this.usersInvited.push(users[i]);

        //people.splice(Number(i),1);
       // console.log("invitedID = "+invite.invitedID)
        var array = this.invitesSent.filter(invite=>invite.invitedID == this.users[i].id);
        //var array = this.invitesSent;
        //this.usersInvited.push(this.users[i]);

        if (array.length>0) 
        {
          
          console.log("invited!")
          peopleInvited.push(this.users[i])

        }
        else 
        {
          people.push(this.users[i])

        }
      }
      this.users = people;
      this.usersInvited = peopleInvited;
      


    });


    
  }

  getInviterNames(): void {

  }
  getInvites(): void {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log("current user id : " + currentUser.id);

    this.inviteService.getInvitesByID(currentUser.id).pipe(first()).subscribe(data => {
      this.invites = data;
      // this.getInviterNames = [];
    });
  }

  getInvitesISent(): void {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log("current user id : " + currentUser.id);

    this.inviteService.getInvitesISent(currentUser.id).pipe(first()).subscribe(data => {
      //this.invitesSent = data;
      console.log("data invites sent 1/");
      console.log(data);
      this.invitesSent = data;
      // this.getInviterNames = [];
      console.log("data invites sent 2/");

    });
  }


  onInviteClick(invite): void {
    console.log("invite accepted !!");
    this.friendService.makeFriend(invite.invitedID, invite.inviterID).pipe(first()).subscribe(data => {
      this.update();

    });      
    this.inviteService.removeInvite(invite._id).pipe(first()).subscribe(data => {
      this.update();

    });

    //this.router.navigate(['/invite']);


  }


  onSendInviteClick(id): void {

    console.log('sending invite');

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.inviteService.createInvite({invitedID : id, inviterID : currentUser.id}).pipe(first()).subscribe(data => { 
    //   console.log('hello callback');
    // });

    this.inviteService.goCreate(id, currentUser.id, currentUser.username).pipe(first()).subscribe(data => {
      this.update();

    });



  }





}







