import * as fromUser from './user-reducer';
import * as fromPost from './post-reducer';
import {ActionReducerMap, createSelector} from '@ngrx/store';


export interface RootReducerState {
  users: fromUser.UserReducerState;
  post: fromPost.PostReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: fromUser.UserReducer,
  post: fromPost.PostReducer
};

export const getUserState = (state: RootReducerState) => state.users;

// User Selectors for Root
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getLoading);
export const getUserEntities = createSelector(getUserState, fromUser.getEntities);
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUserError = createSelector(getUserState, fromUser.getError);

export const getUserById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
};

export const getPostState = (state: RootReducerState) => state.post;

// Post Selector For Root
export const getPostLoaded = createSelector(getPostState, fromPost.getLoaded);
export const getPostLoading = createSelector(getPostState, fromPost.getLoading);
export const getPostEntities = createSelector(getPostState, fromPost.getEntities);
export const getPosts = createSelector(getPostState, fromPost.getPosts);
export const getPostError = createSelector(getPostState, fromPost.getError);

export const getPostById = (state: RootReducerState, id: number) => {
  const entities = getUserEntities(state);
  return entities[id];
};

