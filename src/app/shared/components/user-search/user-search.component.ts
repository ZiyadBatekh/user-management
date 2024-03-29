import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/features/users/services/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent {
  searchText: string = '';
  @Output() searchResults = new EventEmitter<any[]>();

  constructor(private userService: UserService) {}

  searchUser(): void {
    const userId = parseInt(this.searchText?.toString());
    if (!userId) {
      // No search text, emit all users
      this.userService
        .getUsers() // Fetch all users
        .pipe(
          catchError((error) => {
            console.error('Error fetching users:', error);
            return of({ data: [] }); // Return a dummy response with empty data
          })
        )
        .subscribe((response) => {
          this.searchResults.emit(response.data);
        });
      return;
    }

    this.userService
      .getUserById(userId)
      .pipe(
        catchError((error) => {
          console.error('Error fetching user:', error);
          return of({ data: null }); // Return a dummy response with null data
        })
      )
      .subscribe((response) => {
        const searchResults = response.data ? [response.data] : [];
        this.searchResults.emit(searchResults);
      });
  }
}
