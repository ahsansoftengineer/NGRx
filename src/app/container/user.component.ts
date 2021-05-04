import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  UserListRequestAction,
  UserListSuccessAction,
} from '../actions/user-action';
import { IUser } from '../models/user';
import { getUserLoaded, getUserloading, getUsers } from '../reducers';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  template: `
    <p>User Works</p>
    <div>
      <youtube-user-list [users]="users"></youtube-user-list>
    </div>
  `,
  styles: [],
})
export class UserComponent implements OnInit {
  users: IUser[];
  constructor(private apiSerice: ApiService, private store: Store) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    // Always use $ sign with Observables
    const loading$ = this.store.select(getUserloading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData = this.store.select(getUsers);

    combineLatest([loaded$, loading$]).subscribe((data) => {
      if (!data[0] && !data[1]) {
        // Store Helps to Dispatch different Actions
        this.store.dispatch(new UserListRequestAction());
        this.apiSerice.getAllPost().subscribe((res) => {
          this.store.dispatch(new UserListSuccessAction({ data: res }));
        });
      }
    });
    // getUsers is Comming from Index File Master File of Users
    getUserData.subscribe((data) => {
      console.log(data);
      this.users = data;
    });
  }
}
