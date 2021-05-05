import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {
  UserListErrorAction,
  UserListRequestAction,
  UserListSuccessAction,
} from '../actions/user-action';
import { IUser } from '../models/user';
import {
  getUserLoaded,
  getUserloading,
  getUsers,
  RootReducerState,
  getUserError
} from '../reducers';
import { ApiService } from './api.service';

// This file is created under rule Single Responsibility Principal Comming for (SOAP)
@Injectable()
export class YoutubeRepository {
  constructor(
    private store: Store<RootReducerState>,
    private apiService: ApiService
  ) {}
  // using force for Pull to Referesh Functionality.
  getUserList(force = false): [Observable<boolean>, Observable<IUser[]>, Observable<boolean>] {
    // Always use $ sign with Observables
    const loading$ = this.store.select(getUserloading);
    const loaded$ = this.store.select(getUserLoaded);
    const getUserData$ = this.store.select(getUsers);
    const getError$ = this.store.select(getUserError);

    // If data Availaible then Reuse it Other wise Fetch it from API
    combineLatest([loaded$, loading$]).pipe(take(1)).subscribe((data) => {
      // !data[0] & !data[1] means if not Loading and Loaded then do the following Action
      if ((!data[0] && !data[1]) || force) {
        // Store Helps to Dispatch different Actions
        this.store.dispatch(new UserListRequestAction());
        this.apiService.getAllPost().subscribe(
          (res) => {
            this.store.dispatch(new UserListSuccessAction({ data: res }));
          },
          (error) => {
            this.store.dispatch(new UserListErrorAction());
          }
        );
      }
    });
    return [loading$, getUserData$, getError$];
  }
}

// reducer -> it contains a state (global state)
// it will take an action -> it will return a new state
// action -> it will contain a payload and a type
