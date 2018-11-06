import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
//import { POSTS } from '../mock-posts';
import { PostService } from '../services/post.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {


  posts: Post[];
  user = '';
  currentUser;
  profilepic = '';
  constructor(private postService: PostService,
    private router: Router) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.postService.getTimeLineFromID(currentUser.id).pipe(first()).subscribe(data => {
      if (data.length) {
        this.posts = data

      }
      console.log('data');
    });
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.user = this.currentUser.username;

    }
    else {
      this.user = '';
    }
    this.profilepic = 'http://localhost:4000/download/' + currentUser.id;

  }

  submit() {
    this.router.navigate(['/login']);
  }



}
