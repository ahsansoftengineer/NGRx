import { Action } from '../actions';
import {
  USER_ADD,
  USER_DELETE,
  USER_LIST_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE,
} from '../actions/user-action';
import { IUser } from '../models/user';

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  users: IUser[];
}

const initialState: UserReducerState = {
  loaded: false,
  loading: false,
  error: false,
  users: [],
};
export function UserReducer(
  state = initialState,
  action: Action
): UserReducerState {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return { ...state, loading: true };
    }
    // Collected All User Except That needs to be Modified
    case USER_ADD: {
      const newUsers: IUser[] = state.users.concat(action.payload.data);
      return { ...state, ...{ users: newUsers } };
    }
    case USER_UPDATE: {
      const users: IUser[] = state.users.filter(
        (data) => data.id !== action.payload.id
      );
      const newUsers: IUser[] = users.concat(action.payload.data);
      return { ...state, ...{ users: newUsers } };
    }
    case USER_DELETE: {
      const users: IUser[] = state.users.filter(
        (data) => data.id !== action.payload.id
      );
      return { ...state, ...{ users } };
    }

    case USER_LIST_ERROR: {
      return { ...state, error: true, loading: false };
    }
    case USER_LIST_SUCCESS: {
      const updatedUsers = state.users.concat(action.payload.data);
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        users: updatedUsers,
      };
    }
    default: {
      return state;
    }
  }
}

// Selectors for Reducers
export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
export const getUsers = (state: UserReducerState) => state.users;
export const getUserError = (state: UserReducerState) => state.error;
