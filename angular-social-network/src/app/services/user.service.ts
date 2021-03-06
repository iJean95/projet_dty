import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`http://localhost:4000/api/users`);
    }

    getById(id: number) {
        return this.http.get(`http://localhost:4000/api/users/` + id);
    }

    register(user: User) {
        return this.http.post<User>(`http://localhost:4000/api/register`, user);
    }

    update(user: User) {
        return this.http.put(`http://localhost:4000/api/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`http://localhost:4000/api/users/` + id);
    }

}