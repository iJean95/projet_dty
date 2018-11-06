import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user = '';
  currentUser;

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.user = this.currentUser.username;
    }
    else {
      this.user ='';
    }
  }

}
