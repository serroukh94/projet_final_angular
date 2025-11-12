import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface User {
  id?: number;
  fullName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = '/api'; // via proxy vers http://localhost:3000

  constructor(private http: HttpClient) {}

  signup(payload: User): Observable<User> {
    return this.http.post<User>(`${this.base}/users`, payload);
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http
      .get<User[]>(`${this.base}/users`, { params: { email, password } })
      .pipe(map(list => list.length ? list[0] : null));
  }
}
