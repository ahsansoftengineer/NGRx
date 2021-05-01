import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'youtube-user-list',
  template: `
  <div fxLayout="column wrap" fxLayoutGap="10px" fxLayoutAlign="center start">
    <app-youtube-layout [user]="user" *ngFor="let user of users"></app-youtube-layout>
  </div>
  `,
  styles: [`

  `]
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[]
  constructor() { }

  ngOnInit(): void { }
}
