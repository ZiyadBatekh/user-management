import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, shareReplay, map } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private cachedUsers$: Observable<any>;
  private cachedUserMap: { [key: number]: Observable<any> } = {};
  private refreshUsersSubject = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpService) {
    this.cachedUsers$ = this.refreshUsersSubject.pipe(
      switchMap(() => this.http.get('users').pipe(shareReplay(1)))
    );
  }

  // Get all users with optional page parameter
  getUsers(page?: number): Observable<any> {
    if (page) {
      // Modify URL to include page number
      return this.http.get(`users?page=${page}`);
    } else {
      return this.getCachedUsers();
    }
  }

  // Get user by ID with caching
  getUserById(id: number): Observable<any> {
    // Check if user is already cached
    if (!this.cachedUserMap[id]) {
      // If not cached, fetch user and cache the result
      this.cachedUserMap[id] = this.http.get(`users/${id}`).pipe(
        // Share the result to avoid multiple HTTP requests
        shareReplay(1)
      );
    }
    return this.cachedUserMap[id];
  }

  // Public method to access cached users data
  getCachedUsers(): Observable<any> {
    return this.cachedUsers$;
  }
}
