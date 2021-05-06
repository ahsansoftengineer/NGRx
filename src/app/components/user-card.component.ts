import {Component, Input} from '@angular/core';
import {User} from '../models/user';
import {YoutubeRepository} from '../services/youtube-repository';
import {MatDialog} from '@angular/material/dialog';
import {UpdateUserComponent} from './update-user.component';
import {Router} from '@angular/router';

@Component({
  selector: 'youtube-user-card',
  template: `
    <mat-card (click)="open()" style="margin-bottom: 30px;" fxLayout="column" fxLayoutGap="30px" fxLayoutAlign="start stretch">
      <mat-card-title>{{this.user.name}}</mat-card-title>
      <mat-card-content>{{this.user.email}}</mat-card-content>
      <button (click)="delete()" mat-raised-button color="warn">Delete</button>
      <button (click)="update()" mat-raised-button color="primary">Update</button>
    </mat-card>
  `,
  styles: [``]
})

export class UserCardComponent {
  @Input() user: User;

  constructor(private youtubeRepo: YoutubeRepository,
              private dialog: MatDialog, private router: Router) {
  }

  delete() {
    this.youtubeRepo.deleteUser(this.user.id);
  }

  update() {
    this.dialog.open(UpdateUserComponent, {
      width: '256px', data: this.user
    });
  }

  open() {
    this.router.navigate(['user', this.user.id]);
  }
}
