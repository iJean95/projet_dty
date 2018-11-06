import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Friendship } from '../friendship';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient) { }

  getFriendsById(id) {
    return this.http.get<[Friendship]>(`http://localhost:4000/api/friends/` + id);


  }

  makeFriend(invitedID, inviterID): Observable<Friendship[]> {
    return this.http.post<[Friendship]>(`http://localhost:4000/api/friends/` , {invitedID, inviterID});
  }

}
