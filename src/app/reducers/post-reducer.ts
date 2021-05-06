import {Post} from '../models/post';
import {Action} from '../actions';
import {
  COMMENT_ADD_ACTION, COMMENT_REMOVE_ACTION, COMMENT_UPDATE_ACTION,
  POST_ADD,
  POST_DELETE,
  POST_LIST_ERROR,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
  POST_UPDATE
} from '../actions/post-action';
import {StoreUtility} from '../utils/store-utility';
import {createSelector} from '@ngrx/store';

export interface PostReducerState {
  loading: boolean;
  loaded: boolean;
  error: boolean;
  entities: { [id: number]: Post };
  ids: number[];
}

const initialState: PostReducerState = {
  loaded: false,
  loading: false,
  error: false,
  entities: {},
  ids: []
};

export function PostReducer(state = initialState, action: Action): PostReducerState {
  switch (action.type) {
    case POST_LIST_REQUEST: {
      return {...state, loading: true};
    }
    case POST_DELETE: {
      const id = action.payload.id;
      const newIds = state.ids.filter(elem => elem !== id);
      const newEntities = StoreUtility.removeKey(state.entities, id);
      return {...state, ...{entities: newEntities, ids: newIds}};
    }
    case POST_UPDATE: {
      const post = action.payload.data;
      const entity = {[post.id]: post};
      const updatedEntities = {...state.entities, ...entity};
      return {...state, ...{entities: updatedEntities}};
    }
    case POST_ADD: {
      const post = action.payload.data;
      const entity = {[post.id]: post};
      const newEntities = {...state.entities, ...entity};
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, post.id]);
      return {...state, ...{entities: newEntities, ids: newIds}};

    }
    case POST_LIST_ERROR: {
      return {...state, error: true, loading: false};
    }
    case POST_LIST_SUCCESS: {
      const posts = action.payload.data;
      const obj = StoreUtility.normalize(posts);
      const newEntities = {...state.entities, ...obj};
      const ids = posts.map(user => user.id);
      const newIds = StoreUtility.filterDuplicateIds([...state.ids, ...ids]);
      return {
        ...state, ...{
          loaded: true,
          loading: false, error: false,
          entities: newEntities, ids: newIds
        }
      };
    }
    case COMMENT_ADD_ACTION: {
      const postId = action.payload.postId;
      const comment = action.payload.data;
      const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
      oldPost.comments.push(comment);
      const obj = {[postId]: oldPost};
      const entities = {...state.entities, ...obj};
      return {...state, ...{entities}};
    }
    case COMMENT_UPDATE_ACTION: {
      const postId = action.payload.postId;
      const comment = action.payload.data;
      const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
      const oldPostWithoutComment = oldPost.comments.filter(data => data.id !== comment.id);
      oldPostWithoutComment.push(comment);
      oldPost.comments = oldPostWithoutComment;
      const obj = {[postId]: oldPost};
      const entities = {...state.entities, ...obj};
      return {...state, ...{entities}};
    }
    case COMMENT_REMOVE_ACTION: {
      const postId = action.payload.postId;
      const commentId = action.payload.id;
      const oldPost: Post = JSON.parse(JSON.stringify(state.entities[postId]));
      const oldPostWithoutComment = oldPost.comments.filter(data => data.id !== commentId);
      oldPost.comments = oldPostWithoutComment;
      const obj = {[postId]: oldPost};
      const entities = {...state.entities, ...obj};
      return {...state, ...{entities}};
    }
    default: {
      return state;
    }
  }
}

export const getLoading = (state: PostReducerState) => state.loading;
export const getLoaded = (state: PostReducerState) => state.loaded;
export const getEntities = (state: PostReducerState) => state.entities;
export const getIds = (state: PostReducerState) => state.ids;
export const getPosts = createSelector(getEntities,
  (entities) => StoreUtility.unNormalized(entities));
export const getError = (state: PostReducerState) => state.error;


