import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../models/user';
import {YoutubeRepository} from '../services/youtube-repository';
import {takeWhile} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {UpdateUserComponent} from '../components/update-user.component';

@Component({
  selector: 'youtube-users',
  template: `
    <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="30px">
      <youtube-user-list *ngIf="!this.loading && !this.error" [users]="this.users"></youtube-user-list>
      <mat-spinner *ngIf="this.loading"></mat-spinner>
      <youtube-error (reload)="this.tryAgain()" *ngIf="this.error && !loading"></youtube-error>
      <button *ngIf="!this.loading && !this.error" (click)="addUser()" mat-raised-button color="primary">Add User</button>
    </div>
  `,
  styles: [``]
})

export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error = false;
  isAlive = true;

  constructor(private youtubeRepository: YoutubeRepository, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  fetchData() {
    const observer$ = this.youtubeRepository.getUserList();
    const userData$ = observer$[1];
    const loading$ = observer$[0];
    const error$ = observer$[2];
    userData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.users = data;
    });
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.loading = data;
    });
    error$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.error = data;
    });
  }

  tryAgain() {
    this.youtubeRepository.getUserList(true);
  }

  addUser() {
    this.dialog.open(UpdateUserComponent, {
      width: '256px'
    });
  }
}


// reducer -> it contain a state (global state)
// it will take an action -> it will return a new state

// action -> it will contain a payload and a type

// Dependency Injection Principle
// you should not depend on something directly
// component -> youtube repo -> apiService -> http Service -> http client
