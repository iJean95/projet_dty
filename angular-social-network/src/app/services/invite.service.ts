import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Invite } from '../invitation';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  private usersUrl = 'http://localhost:4000/api/invite';  // URL to web api

  constructor(private http: HttpClient) { }

  getInvites(): Observable<Invite[]> {

    // console.log('This is great CSS');

    return this.http.get<Invite[]>(`http://localhost:4000/api/invite`);

  }
  getInvitesISent(id) {

    // console.log('This is great CSS');

    return this.http.get<[Invite]>(`http://localhost:4000/api/invitesSent/`+id);

  }

  getInvitesByID(id) {
    return this.http.get<[Invite]>(`http://localhost:4000/api/invites/` + id);

  }


  goCreate(invitedID, inviterID, inviterName) {
    console.log('gocreate called');

    return this.http.post<any>(`http://localhost:4000/api/createInvite`, { invitedID: invitedID, inviterID: inviterID, inviterName: inviterName })
      .pipe(map(user => {
        console.log(user);
      }));

  }

  removeInvite(inviteID) {
    console.log('removeInvite service');
    return this.http.delete('http://localhost:4000/api/invites/' + inviteID);

  }


}
