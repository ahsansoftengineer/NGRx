import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { takeWhile } from 'rxjs/operators';
import { UpdateUserComponent } from '../components/update-user.component';
import { IUser } from '../models/user';
import { YoutubeRepository } from '../services/youtube-repository';

@Component({
  selector: 'app-user',
  template: `
    <p>User Works</p>
    <div>
      <youtube-user-list
        *ngIf="!loading && !error"
        [users]="users"
      ></youtube-user-list>
      <mat-spinner *ngIf="loading && !error"></mat-spinner>
      <div
        *ngIf="error && !loading"
        fxLayout="column"
        fxLayoutAlign="center center"
      >
        <mat-icon>info_outline</mat-icon>
        <span>Error Occured</span>
        <button
          mat-raised-button
          color="warn"
          (click)="fetchData()"
          type="button"
        >
          Retry
        </button>
      </div>
      <button
        mat-raised-button
        color="primary"
        (click)="addUser()"
        type="button"
      >
        Add User
      </button>
    </div>
  `,
  styles: [],
})
export class UserComponent implements OnInit, OnDestroy {
  users: IUser[];
  loading = false;
  error = false;
  isAlive: boolean = true;
  // Dependency Injection Principal
  // You should not depend on something directly
  // Component -> youtube repo -> apiService -> HttpService -> HttpClient -> API
  constructor(
    private youtubeRepository: YoutubeRepository,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    const observer$ = this.youtubeRepository.getUserList();
    const loading$ = observer$[0];
    const userData$ = observer$[1];
    const error$ = observer$[2];
    // Required to Stop Subscription
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.loading = data;
    });
    userData$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.users = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe((data) => {
      this.error = data;
    });
  }
  ngOnDestroy() {
    this.isAlive = false;
  }
  addUser() {
    this.dialog.open(UpdateUserComponent, {
      width: '256px',
    });
  }
}
