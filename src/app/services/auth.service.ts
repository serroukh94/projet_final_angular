import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

export interface User {
  id?: number;
  fullName: string;
  email: string;
  password: string;
}

export type UserProfile = Omit<User, 'password'>;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = '/api'; // via proxy vers http://localhost:3000
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  signup(payload: User): Observable<User> {
    return this.http.post<User>(`${this.base}/users`, payload);
  }

  login(email: string, password: string): Observable<UserProfile | null> {
    return this.http
      .get<User[]>(`${this.base}/users`, { params: { email } })
      .pipe(
        map(list => list.find(u => this.sameEmail(u.email, email) && u.password === password) ?? null),
        map(user => (user ? this.stripSensitive(user) : null)),
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

  getCurrentUser(): UserProfile | null {
    const stored = localStorage.getItem(this.currentUserKey);
    return stored ? JSON.parse(stored) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  private sameEmail(a: string, b: string): boolean {
    return a.trim().toLowerCase() === b.trim().toLowerCase();
  }

  private stripSensitive(user: User): UserProfile {
    const { password, ...rest } = user;
    return rest;
  }
}
