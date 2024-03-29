import { User } from 'src/app/features/users/models/user.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/features/users/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.loadUserDetail();
    }
  }

  loadUserDetail(): void {
    this.loading = true;
    if (this.userId) {
      this.userService
        .getUserById(Number(this.userId))
        .subscribe((response) => {
          this.user = response.data;
          this.loading = false;
        });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
