import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';

@Component({
  selector: 'youtube-user-list',
  template: `
    <div class="row">
      <youtube-user-card
        class="col-2"
        [user]="user"
        *ngFor="let user of users"
      ></youtube-user-card>
    </div>
  `,
  styles: [``],
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[];
  constructor() {}
  ngOnInit(): void {}
}
