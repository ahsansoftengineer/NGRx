import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/models/user';
import { YoutubeRepository } from '../services/youtube-repository';
import { UpdateUserComponent } from './update-user.component';

@Component({
  selector: 'youtube-user-card',
  template: `
    <div class="card mb-3">
      <div class="card-header">{{ user.name }}</div>
      <div class="card-body">
        <p class="card-text">{{ user.email }}</p>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-6">
            <button
              mat-raised-button
              color="warn"
              type="button"
              (click)="delete(user.id)"
            >
              Delete
            </button>
          </div>
          <div class="col-6">
            <button
              mat-raised-button
              color="primary"
              type="button"
              (click)="update(user)"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class UserCardComponent implements OnInit {
  @Input() user: IUser;
  constructor(
    private youtubeRepo: YoutubeRepository,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {}
  delete(id: number) {
    this.youtubeRepo.deleteUser(id);
  }
  update(user: IUser) {
    this.dialog.open(UpdateUserComponent, {
      width: '256px',
      data: user,
    });
  }
}
