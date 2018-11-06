import { Injectable } from '@angular/core';
import { User } from '../user';
//import { USERS } from '../mock-users';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

class Response {
  data: any;
  status: Number;
  message: String;
}


@Injectable({
  providedIn: 'root'
})


export class SocialUserService {


  private usersUrl = 'http://localhost:4000/api/users';  // URL to web api


  constructor(
    private http: HttpClient) { }




  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(`http://localhost:4000/api/users`);
  }


  getUserById(id): Observable<User> {
    return this.http.get<User>('http://localhost:4000/api/users/user/' + id);
  }

}

