import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

export interface User {
  id?: number;
  fullName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = '/api'; // via proxy vers http://localhost:3000
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  signup(payload: User): Observable<User> {
    return this.http.post<User>(`${this.base}/users`, payload);
  }

  login(email: string, password: string): Observable<User | null> {
    return this.http
      .get<User[]>(`${this.base}/users`, { params: { email, password } })
      .pipe(
        map(list => list.length ? list[0] : null),
        tap(user => {
          if (user) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(user));
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    const stored = localStorage.getItem(this.currentUserKey);
    return stored ? JSON.parse(stored) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
