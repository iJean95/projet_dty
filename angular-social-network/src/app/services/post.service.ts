import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  goCreate(posterID : String, content : String) {
    console.log('gocreate called');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.http.post<any>(`http://localhost:4000/api/post`, { posterID: posterID, content: content, username : currentUser.username})
      .pipe(map(user => {
        console.log(user);
      }));

  }

  getPostsFromID(posterID : String):Observable<Post[]>{
    
    return this.http.get<Post[]>(`http://localhost:4000/api/post/`+posterID);
    

  }
  getTimeLineFromID(posterID : String):Observable<Post[]>{
    
    return this.http.get<Post[]>(`http://localhost:4000/api/post/gettl/`+posterID);
  }

}
