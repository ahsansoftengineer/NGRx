import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'youtube-user-card',
  template: `
  <mat-card fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="start center">
    <mat-card-title>{{this.user.name}}</mat-card-title>
    <mat-card-content>{{this.user.email}}</mat-card-content>
</mat-card>
  `,
  styles: [`
    
  `]
})
export class UserCardComponent implements OnInit {
  @Input() user: IUser
  constructor() { }

  ngOnInit(): void { }
}
