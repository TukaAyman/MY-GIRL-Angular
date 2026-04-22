import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`).pipe(
      map(users => users.filter(u => u.password.toString() === password.toString()))
    );
  }

  register(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  getCurrentUser(): User | null {
    const u = localStorage.getItem('currentUser');
    return u ? JSON.parse(u) as User : null;
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}