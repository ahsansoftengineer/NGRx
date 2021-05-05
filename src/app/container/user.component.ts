import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { YoutubeRepository } from '../services/youtube-repository';

@Component({
  selector: 'app-user',
  template: `
    <p>User Works</p>
    <div>
      <youtube-user-list *ngIf="!loading && !error" [users]="users"></youtube-user-list>
        <mat-spinner *ngIf="loading && !error"></mat-spinner>
        <div *ngIf="error && !loading" fxLayout="column" fxLayoutAlign="center center" >
          <mat-icon>info_outline</mat-icon>
          <span>Error Occured</span>
          <button mat-raised-button color="warn" (click)="fetchData()" type="button" >Retry</button>
        </div>
    </div>
  `,
  styles: [],
})
export class UserComponent implements OnInit {
  users: IUser[];
  loading = false;
  error = false
  // Dependency Injection Principal
  // You should not depend on something directly
  // Component -> youtube repo -> apiService -> HttpService -> HttpClient -> API
  constructor(private youtubeRepository: YoutubeRepository) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    const observer$ = this.youtubeRepository.getUserList();
    const loading$ = observer$[0];
    const userData$ = observer$[1];
    const error$ = observer$[2];
    loading$.subscribe((data) => {
      this.loading = data;
    });
    userData$.subscribe((data) => {
      this.users = data;
    });
    error$.subscribe((data) => {
      this.error = data;
    });
  }
}
