import { User } from 'src/app/features/users/models/user.interface';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/features/users/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  searchText: string = '';
  loading: boolean = false;
  currentPage: number = 1;
  totalPages: number = 0; // Change this to a single number
  showNoUsersMessage: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const page = +params['page'] || 1; // default to page 1 if not provided
      this.loadUsers(page);
    });
  }

  loadUsers(page: number): void {
    this.loading = true;
    // Fetch users from the server
    this.userService.getUsers(page).subscribe((response) => {
      this.users = response.data;
      this.currentPage = page;
      this.totalPages = response.total_pages;
      this.updateRouterLink(page);
      this.loading = false;
    });
  }

  updateRouterLink(page: number): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    });
  }

  navigateToUserDetail(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  handleSearchResults(searchResults: any[]): void {
    if (searchResults.length > 0 || this.searchText === '') {
      // Show user cards if search results are not empty or search text is empty
      this.users = searchResults;
      this.totalPages = 0; // Reset total pages for search results
      this.showNoUsersMessage = false; // Hide "No users found" message
    } else {
      // Hide user cards and show "No users found" message
      this.users = [];
      this.showNoUsersMessage = true;
    }
  }
}
