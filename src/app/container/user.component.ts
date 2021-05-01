import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  template: `
    <div fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="center start">
        <youtube-user-list [users]="users"></youtube-user-list>
    </div>
  `,
  styles: [],
})
export class UserComponent implements OnInit {
  users: IUser[];
  constructor(private apiSerice: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.apiSerice.getAllPost().subscribe((data) => {
      this.users = data;
    });
    console.log(this.users);
  }
}
