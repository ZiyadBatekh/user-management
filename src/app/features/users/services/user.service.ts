import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  // Get all users with optional page parameter
  getUsers(page?: number): Observable<any> {
    const url = page ? `users?page=${page}` : 'users';
    return this.http.getWithCache(url);
  }

  // Get user by ID
  getUserById(userId: number): Observable<any> {
    const url = `users/${userId}`;
    return this.http.getWithCache(url);
  }
}
