import { createSelector } from '@ngrx/store';
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
import { StoreUtility } from '../utils/store-utility';

export interface UserReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: number]: any };
  ids: number[];
}

const initialState: UserReducerState = {
  loaded: false,
  loading: false,
  error: false,
  entities: {},
  ids: [],
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
      const user: IUser = action.payload.data;
      const entity = { [user.id]: user };
      const newEntities = { ...state.entities, ...entity };
      const newIds = StoreUtility.filterDuplicate([...state.ids, user.id]);
      return { ...state, ...{ entities: newEntities, ids: newIds } };
    }
    case USER_UPDATE: {
      const user: IUser = action.payload.data;
      const entity = { [user.id]: user };
      const updatedEntities = { ...state.entities, ...entity };
      return { ...state, ...{ entities: updatedEntities } };
    }
    case USER_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter((elem) => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return { ...state, ...{ entities: newEntities, ids: newIds } };
    }
    case USER_LIST_ERROR: {
      return { ...state, error: true, loading: false };
    }
    case USER_LIST_SUCCESS: {
      const users: IUser[] = action.payload.data;
      const obj = StoreUtility.normalize(users);
      const newEntities = { ...state.entities, ...obj };
      const ids = users.map((user) => user.id);
      const newIds = StoreUtility.filterDuplicate([...state.ids, ...ids]);
      const userReducerState: UserReducerState = {
        loaded: true,
        loading: false,
        error: false,
        entities: newEntities,
        ids: newIds,
      };
      return { ...state, ...userReducerState };
    }
    default: {
      return state;
    }
  }
}

// Selectors for Reducers
export const getLoading = (state: UserReducerState) => state.loading;
export const getLoaded = (state: UserReducerState) => state.loaded;
const getEntities = (state: UserReducerState) => state.entities;
export const getUsers = createSelector(getEntities, 
  (entities) => StoreUtility.unNormalized(entities));
  export const getUserError = (state: UserReducerState) => state.error;