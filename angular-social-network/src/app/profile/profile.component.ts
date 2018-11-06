import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialUserService } from '../services/social-user.service';
import { User } from '../user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id: string;
  private sub: any;
  dude: User;
  
  constructor(private route: ActivatedRoute,    
    private userService: SocialUserService
    ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.userService.getUserById(this.id).pipe(first()).subscribe(friend => {
        console.log(friend.username);
        this.dude = friend;

          
      });

      // In a real app: dispatch action to load the details here.
   });
  }

}
